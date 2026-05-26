/**
 * OpenRouter API Client for Hermes 3 Llama 3.1 405B
 * Usage: Unlimited free tier access to most powerful free model
 */

import { getEnv } from './env.js';

const config = {
  apiKey: getEnv('OPENROUTER_API_KEY'),
  model: getEnv('OPENROUTER_MODEL'),
  baseUrl: getEnv('OPENROUTER_BASE_URL'),
};

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: Array<{
    index: number;
    message: Message;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Send a message to OpenRouter and get a response
 * @param messages - Array of messages in conversation
 * @param options - Optional configuration
 */
export async function chat(
  messages: Message[],
  options: {
    temperature?: number;
    maxTokens?: number;
    systemMessage?: string;
  } = {}
): Promise<string> {
  const { temperature = 0.7, maxTokens = 4000, systemMessage } = options;

  const finalMessages: Message[] = [];

  if (systemMessage) {
    finalMessages.push({
      role: 'system',
      content: systemMessage,
    });
  }

  finalMessages.push(...messages);

  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://getglobalyields.com',
        'X-Title': 'GetGlobalYields',
      },
      body: JSON.stringify({
        model: config.model,
        messages: finalMessages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenRouter API Error: ${error.error?.message || response.statusText}`);
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    throw new Error(`Failed to get response from OpenRouter: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Stream a response from OpenRouter
 * @param messages - Array of messages in conversation
 * @param options - Optional configuration
 */
export async function* chatStream(
  messages: Message[],
  options: {
    temperature?: number;
    maxTokens?: number;
    systemMessage?: string;
  } = {}
): AsyncGenerator<string> {
  const { temperature = 0.7, maxTokens = 4000, systemMessage } = options;

  const finalMessages: Message[] = [];

  if (systemMessage) {
    finalMessages.push({
      role: 'system',
      content: systemMessage,
    });
  }

  finalMessages.push(...messages);

  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://getglobalyields.com',
        'X-Title': 'GetGlobalYields',
      },
      body: JSON.stringify({
        model: config.model,
        messages: finalMessages,
        temperature,
        max_tokens: maxTokens,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenRouter API Error: ${error.error?.message || response.statusText}`);
    }

    if (!response.body) {
      throw new Error('No response body from OpenRouter');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                yield content;
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    throw new Error(`Failed to stream response from OpenRouter: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Get the current model being used
 */
export function getModel(): string {
  return config.model;
}

/**
 * Get the current API key (masked)
 */
export function getApiKeyMasked(): string {
  if (!config.apiKey) return 'NOT SET';
  return config.apiKey.slice(0, 10) + '...' + config.apiKey.slice(-5);
}
