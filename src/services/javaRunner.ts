import { ExecutionResult, TestCase } from '../types';

export async function runJavaCode(code: string, stdin: string = ''): Promise<ExecutionResult> {
  try {
    const response = await fetch('/api/java/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, stdin }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        compilationError: errData.error || 'Server error occurred during execution',
        stdout: '',
        stderr: errData.details || '',
        executionTimeMs: 0,
        testResults: [],
        allTestsPassed: false,
      };
    }

    const data = await response.json();
    return {
      success: data.success,
      compilationError: data.compilationError,
      runtimeError: data.runtimeError,
      stdout: data.stdout || '',
      stderr: data.stderr || '',
      executionTimeMs: data.executionTimeMs || 0,
      testResults: [],
      allTestsPassed: false,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      compilationError: `Execution service unreachable: ${message}`,
      stdout: '',
      stderr: '',
      executionTimeMs: 0,
      testResults: [],
      allTestsPassed: false,
    };
  }
}

export async function testJavaChallenge(
  code: string,
  testCases: TestCase[],
  missionId: string
): Promise<ExecutionResult> {
  try {
    const response = await fetch('/api/java/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, testCases, missionId }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        compilationError: errData.error || 'Verification server error',
        stdout: '',
        stderr: errData.details || '',
        executionTimeMs: 0,
        testResults: [],
        allTestsPassed: false,
      };
    }

    return await response.json();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      compilationError: `Unable to verify tests: ${message}`,
      stdout: '',
      stderr: '',
      executionTimeMs: 0,
      testResults: [],
      allTestsPassed: false,
    };
  }
}

export async function askAITutor(
  code: string,
  concept: string,
  question: string,
  errorLog?: string
): Promise<{ advice: string; hintTier?: number }> {
  try {
    const response = await fetch('/api/tutor/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, concept, question, errorLog }),
    });

    if (!response.ok) {
      return {
        advice: 'Focus on the required method signature and ensure all syntax matches standard Java OOP guidelines.',
      };
    }

    const data = await response.json();
    return data;
  } catch {
    return {
      advice: 'The Arcane AI Tutor recommends double-checking access modifiers and class bracket closures.',
    };
  }
}
