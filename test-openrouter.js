#!/usr/bin/env node

/**
 * Test script to verify OpenRouter integration works
 * Run with: node test-openrouter.js
 */

import { chat, chatStream, getModel, getApiKeyMasked } from './src/lib/openrouter.ts';

async function main() {
  console.log('🚀 OpenRouter Integration Test\n');
  console.log(`Model: ${getModel()}`);
  console.log(`API Key: ${getApiKeyMasked()}\n`);

  // Test 1: Simple chat
  console.log('Test 1: Simple chat message...');
  try {
    const response = await chat([
      {
        role: 'user',
        content: 'What is 2+2?',
      },
    ]);
    console.log('✓ Response:', response.substring(0, 100) + '...\n');
  } catch (error) {
    console.error('✗ Error:', error instanceof Error ? error.message : String(error), '\n');
    process.exit(1);
  }

  // Test 2: Streaming
  console.log('Test 2: Streaming response...');
  try {
    process.stdout.write('✓ Streaming: ');
    let charCount = 0;
    for await (const chunk of chatStream([
      {
        role: 'user',
        content: 'Say "Hello from OpenRouter" in a fun way',
      },
    ])) {
      process.stdout.write(chunk);
      charCount += chunk.length;
      if (charCount > 150) {
        process.stdout.write('...');
        break;
      }
    }
    console.log('\n');
  } catch (error) {
    console.error('✗ Error:', error instanceof Error ? error.message : String(error), '\n');
    process.exit(1);
  }

  // Test 3: System message
  console.log('Test 3: With system message...');
  try {
    const response = await chat(
      [
        {
          role: 'user',
          content: 'Who are you?',
        },
      ],
      {
        systemMessage: 'You are a helpful AI assistant for GetGlobalYields, a platform about global investing and options trading.',
      }
    );
    console.log('✓ Response:', response.substring(0, 100) + '...\n');
  } catch (error) {
    console.error('✗ Error:', error instanceof Error ? error.message : String(error), '\n');
    process.exit(1);
  }

  console.log('✅ All tests passed! You can now use OpenRouter with unlimited free access.\n');
  console.log('Usage examples:');
  console.log('');
  console.log('  import { chat } from "./src/lib/openrouter.ts";');
  console.log('');
  console.log('  const response = await chat([{ role: "user", content: "Your prompt here" }]);');
  console.log('  console.log(response);');
  console.log('');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
