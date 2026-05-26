/**
 * Example: Using OpenRouter with GetGlobalYields
 * 
 * This shows practical examples for your Astro blog
 */

import { chat, chatStream } from './openrouter';

/**
 * Generate a blog post title and description
 */
export async function generateBlogMetadata(topic: string): Promise<{
  title: string;
  description: string;
}> {
  const response = await chat(
    [
      {
        role: 'user',
        content: `Generate a blog post title and SEO description (max 160 chars) for this topic: "${topic}". 
        
Format as JSON:
{
  "title": "...",
  "description": "..."
}`,
      },
    ],
    {
      systemMessage: `You are an expert SEO copywriter for GetGlobalYields, a platform about global investing and options trading. Create compelling, keyword-optimized titles and descriptions.`,
      maxTokens: 500,
    }
  );

  try {
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Failed to parse metadata:', error);
  }

  return {
    title: topic,
    description: topic,
  };
}

/**
 * Improve/expand article content
 */
export async function improveArticle(content: string): Promise<string> {
  return await chat(
    [
      {
        role: 'user',
        content: `Improve this article for a financial blog. Make it more engaging, accurate, and SEO-friendly:

${content}`,
      },
    ],
    {
      systemMessage: `You are a professional financial editor for GetGlobalYields. 
      - Improve clarity and engagement
      - Add relevant financial insights
      - Maintain accuracy
      - Use professional tone
      - Keep structure and flow`,
      maxTokens: 4000,
    }
  );
}

/**
 * Generate article outline
 */
export async function generateOutline(topic: string, keywords: string[]): Promise<string> {
  return await chat(
    [
      {
        role: 'user',
        content: `Create a detailed article outline for: "${topic}"
        
Target keywords: ${keywords.join(', ')}

Format as markdown with H2 and H3 headings.`,
      },
    ],
    {
      systemMessage: `You are an expert content strategist for GetGlobalYields. Create SEO-optimized outlines that are comprehensive and well-structured.`,
      maxTokens: 2000,
    }
  );
}

/**
 * Generate FAQ section
 */
export async function generateFAQ(topic: string): Promise<string> {
  return await chat(
    [
      {
        role: 'user',
        content: `Generate 5-7 common questions and answers about: "${topic}"

Format as markdown with Q: and A: prefixes.`,
      },
    ],
    {
      systemMessage: `You are an expert at GetGlobalYields. Answer common questions about investing topics in a clear, helpful way.`,
      maxTokens: 2000,
    }
  );
}

/**
 * Summarize content
 */
export async function summarizeContent(content: string): Promise<string> {
  return await chat(
    [
      {
        role: 'user',
        content: `Summarize this content in 2-3 sentences:

${content}`,
      },
    ],
    {
      systemMessage: 'You are an expert at creating concise, accurate summaries for financial content.',
      maxTokens: 500,
    }
  );
}

/**
 * Stream a response (for real-time feedback)
 */
export async function* streamAnalysis(question: string): AsyncGenerator<string> {
  yield* chatStream(
    [
      {
        role: 'user',
        content: question,
      },
    ],
    {
      systemMessage: `You are an expert financial advisor at GetGlobalYields. Provide thorough, accurate analysis of investing topics.`,
      temperature: 0.7,
    }
  );
}

/**
 * Multi-turn conversation example
 */
export async function investmentAdvisor(userQuery: string, previousContext?: string) {
  const messages: Array<{ role: string; content: string }> = [];

  if (previousContext) {
    messages.push({ role: 'user', content: previousContext });
    messages.push({
      role: 'assistant',
      content: 'I understand. I have that context in mind.',
    });
  }

  messages.push({ role: 'user', content: userQuery });

  return await chat(messages as any, {
    systemMessage: `You are a knowledgeable investment advisor for GetGlobalYields. 
    - Provide practical, actionable advice
    - Consider risk tolerance and goals
    - Mention diversification and long-term thinking
    - Disclaimer: This is educational, not professional financial advice`,
    temperature: 0.7,
  });
}
