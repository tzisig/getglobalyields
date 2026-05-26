#!/usr/bin/env node

/**
 * Quick utility to interact with OpenRouter from the command line
 * Usage: node query-openrouter.js "Your question here"
 * Example: node query-openrouter.js "What is an ETF?"
 */

import { chat, getModel } from './src/lib/openrouter.js';

async function main() {
  const question = process.argv.slice(2).join(' ');

  if (!question) {
    console.log('Usage: node query-openrouter.js "Your question here"');
    console.log('');
    console.log('Examples:');
    console.log('  node query-openrouter.js "What is the S&P 500?"');
    console.log('  node query-openrouter.js "Explain covered calls trading"');
    process.exit(1);
  }

  console.log(`\n🤖 Model: ${getModel()}`);
  console.log(`❓ Question: ${question}\n`);
  console.log('⏳ Thinking...\n');

  try {
    const response = await chat([
      {
        role: 'user',
        content: question,
      },
    ]);

    console.log('💡 Response:\n');
    console.log(response);
    console.log('\n');
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
