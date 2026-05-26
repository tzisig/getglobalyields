# OpenRouter Integration Guide

## Overview
This project now has unlimited free access to **Hermes 3 Llama 3.1 405B** — the most powerful free AI model on OpenRouter.

## Setup ✅

Everything is already configured. Your `.env.local` file contains:
- API Key
- Model: `nousresearch/hermes-3-llama-3.1-405b:free`
- Base URL

## Usage

### Basic Chat
```typescript
import { chat } from './src/lib/openrouter';

const response = await chat([
  { role: 'user', content: 'Your question here' }
]);

console.log(response);
```

### Streaming Response
```typescript
import { chatStream } from './src/lib/openrouter';

for await (const chunk of chatStream([
  { role: 'user', content: 'Your question here' }
])) {
  process.stdout.write(chunk);
}
```

### With System Message
```typescript
const response = await chat(
  [{ role: 'user', content: 'What is investing?' }],
  { 
    systemMessage: 'You are an expert on global investing.' 
  }
);
```

### With Custom Options
```typescript
const response = await chat(
  [{ role: 'user', content: 'Write a story' }],
  {
    temperature: 0.8,      // 0-1, higher = more creative
    maxTokens: 2000,       // Max response length
    systemMessage: 'You are a creative writer'
  }
);
```

## API Reference

### `chat(messages, options?): Promise<string>`
Send a message and get a complete response.

**Parameters:**
- `messages` - Array of Message objects with `role` and `content`
- `options.temperature` - Creativity level (0-1, default: 0.7)
- `options.maxTokens` - Max response length (default: 4000)
- `options.systemMessage` - System prompt

**Returns:** Promise<string> - The AI's response

### `chatStream(messages, options?): AsyncGenerator<string>`
Stream a response token by token.

**Parameters:** Same as `chat()`

**Returns:** AsyncGenerator that yields response chunks

### `getModel(): string`
Get the currently configured model ID.

### `getApiKeyMasked(): string`
Get the API key (masked for security).

## Test It

Run the test script to verify everything works:
```bash
node test-openrouter.js
```

You should see three tests pass:
1. ✓ Simple chat message
2. ✓ Streaming response
3. ✓ System message

## Examples

### Generate Blog Content
```typescript
import { chat } from './src/lib/openrouter';

const response = await chat(
  [{ role: 'user', content: 'Write a blog post about dividend investing' }],
  { 
    systemMessage: 'You are an expert financial writer for GetGlobalYields',
    maxTokens: 3000
  }
);
```

### Multi-turn Conversation
```typescript
import { chat } from './src/lib/openrouter';

const messages = [
  { role: 'user', content: 'What is the S&P 500?' },
];

const response1 = await chat(messages);
console.log(response1);

// Continue conversation
messages.push({ role: 'assistant', content: response1 });
messages.push({ role: 'user', content: 'How can I invest in it?' });

const response2 = await chat(messages);
console.log(response2);
```

### Content Improvement
```typescript
import { chat } from './src/lib/openrouter';

const content = `Some article text here...`;

const response = await chat(
  [{ role: 'user', content: `Improve this article: ${content}` }],
  { 
    systemMessage: 'You are a professional editor for financial content. Improve clarity, accuracy, and engagement.'
  }
);
```

## Limits & Features

✅ **Unlimited requests** - No rate limits on free tier  
✅ **High quality** - 405B parameter model  
✅ **Fast responses** - Usually 1-5 seconds  
✅ **Streaming** - Real-time token-by-token responses  
✅ **Context window** - Up to 8K tokens input  
✅ **No cost** - Completely free  

## Troubleshooting

### "Environment variable not set"
Make sure `.env.local` exists in the project root with the API key.

### "API Error: Invalid API key"
The API key in `.env.local` may be expired or invalid. Contact the admin to update it.

### "No response body"
This is rare but can happen if the API is temporarily unavailable. Retry after a few seconds.

## Advanced: Using in Astro Components

```astro
---
import { chat } from '../lib/openrouter';

const response = await chat([
  { role: 'user', content: 'Generate a title for a blog post about options trading' }
]);
---

<h1>{response}</h1>
```

## Integration Ideas

- 📝 Auto-generate article titles and descriptions
- 🔍 Summarize content
- ✍️ Write blog posts
- 🎯 Generate SEO meta descriptions
- 💡 Brainstorm investment ideas
- 📊 Analyze financial data
- 🗣️ Create chatbot responses
- 🌐 Translate content

## Support

For issues or questions about the OpenRouter API:
- Docs: https://openrouter.ai/docs
- Status: https://status.openrouter.ai
