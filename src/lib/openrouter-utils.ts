/**
 * Batch operations and utilities for OpenRouter
 */

import { chat, Message } from './openrouter';

/**
 * Process multiple prompts in parallel
 */
export async function batchProcess(
  prompts: string[],
  systemMessage?: string
): Promise<string[]> {
  const results = await Promise.all(
    prompts.map((prompt) =>
      chat(
        [{ role: 'user', content: prompt }],
        { systemMessage }
      )
    )
  );

  return results;
}

/**
 * Process with rate limiting (to be nice to the API)
 */
export async function batchProcessThrottled(
  prompts: string[],
  systemMessage?: string,
  delayMs: number = 500
): Promise<string[]> {
  const results: string[] = [];

  for (const prompt of prompts) {
    const response = await chat(
      [{ role: 'user', content: prompt }],
      { systemMessage }
    );

    results.push(response);

    // Wait before next request
    if (prompts.indexOf(prompt) < prompts.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

/**
 * Complex multi-step reasoning
 */
export async function chainOfThought(
  question: string,
  steps: number = 3
): Promise<{
  steps: string[];
  final: string;
}> {
  const stepsResult: string[] = [];

  // Step 1: Break down the problem
  const breakdown = await chat(
    [
      {
        role: 'user',
        content: `Break down this question into ${steps} thinking steps: "${question}"`,
      },
    ],
    {
      systemMessage: 'You are a logical thinker. Break complex problems into clear steps.',
      maxTokens: 1000,
    }
  );

  stepsResult.push(breakdown);

  // Step 2: Work through each step
  const workthrough = await chat(
    [
      {
        role: 'user',
        content: `Work through these steps and provide detailed reasoning:\n${breakdown}`,
      },
    ],
    {
      systemMessage: 'Think step by step. Be thorough and logical.',
      maxTokens: 2000,
    }
  );

  stepsResult.push(workthrough);

  // Step 3: Final answer
  const final = await chat(
    [
      {
        role: 'user',
        content: `Given this analysis:\n${workthrough}\n\nProvide a clear, concise final answer to: "${question}"`,
      },
    ],
    {
      systemMessage: 'Synthesize the analysis into a clear, actionable conclusion.',
      maxTokens: 1000,
    }
  );

  stepsResult.push(final);

  return {
    steps: stepsResult,
    final,
  };
}

/**
 * Compare and contrast
 */
export async function compare(
  topic1: string,
  topic2: string,
  aspect: string
): Promise<{
  topic1Analysis: string;
  topic2Analysis: string;
  comparison: string;
}> {
  const topic1Analysis = await chat(
    [
      {
        role: 'user',
        content: `Analyze ${topic1} in terms of ${aspect}`,
      },
    ],
    { maxTokens: 1000 }
  );

  const topic2Analysis = await chat(
    [
      {
        role: 'user',
        content: `Analyze ${topic2} in terms of ${aspect}`,
      },
    ],
    { maxTokens: 1000 }
  );

  const comparison = await chat(
    [
      {
        role: 'user',
        content: `Compare these two analyses in terms of ${aspect}:\n\n${topic1}:\n${topic1Analysis}\n\n${topic2}:\n${topic2Analysis}`,
      },
    ],
    {
      systemMessage: 'Provide a clear, balanced comparison.',
      maxTokens: 1500,
    }
  );

  return {
    topic1Analysis,
    topic2Analysis,
    comparison,
  };
}

/**
 * Extract structured data from text
 */
export async function extractData(
  text: string,
  dataFormat: string
): Promise<any> {
  const response = await chat(
    [
      {
        role: 'user',
        content: `Extract data from this text and format as ${dataFormat}:\n\n${text}`,
      },
    ],
    {
      systemMessage: `You are an expert at data extraction. Return only the formatted data, no explanation.`,
      maxTokens: 2000,
    }
  );

  try {
    if (dataFormat.toLowerCase().includes('json')) {
      const jsonMatch = response.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
  } catch (error) {
    console.error('Failed to parse extracted data:', error);
  }

  return response;
}

/**
 * Debate/evaluate an argument
 */
export async function evaluateArgument(
  argument: string
): Promise<{
  strengths: string;
  weaknesses: string;
  counterarguments: string;
  overallAssessment: string;
}> {
  const strengths = await chat(
    [
      {
        role: 'user',
        content: `What are the strengths of this argument?\n\n${argument}`,
      },
    ],
    { maxTokens: 1000 }
  );

  const weaknesses = await chat(
    [
      {
        role: 'user',
        content: `What are the weaknesses or flaws in this argument?\n\n${argument}`,
      },
    ],
    { maxTokens: 1000 }
  );

  const counterarguments = await chat(
    [
      {
        role: 'user',
        content: `What are strong counterarguments to this?\n\n${argument}`,
      },
    ],
    { maxTokens: 1000 }
  );

  const overallAssessment = await chat(
    [
      {
        role: 'user',
        content: `Provide an overall assessment of this argument considering:\n\nStrengths:\n${strengths}\n\nWeaknesses:\n${weaknesses}\n\nCounterarguments:\n${counterarguments}`,
      },
    ],
    {
      systemMessage: 'Provide a balanced, objective assessment.',
      maxTokens: 1500,
    }
  );

  return {
    strengths,
    weaknesses,
    counterarguments,
    overallAssessment,
  };
}

/**
 * Generate variations (for A/B testing, etc.)
 */
export async function generateVariations(
  content: string,
  variationType: string,
  count: number = 3
): Promise<string[]> {
  const variations: string[] = [];

  for (let i = 0; i < count; i++) {
    const response = await chat(
      [
        {
          role: 'user',
          content: `Create a ${variationType} version (${i + 1} of ${count}) of this:\n\n${content}`,
        },
      ],
      {
        systemMessage: `You are creative. Each variation should be distinct and unique.`,
        temperature: 0.9, // Higher creativity
      }
    );

    variations.push(response);
  }

  return variations;
}
