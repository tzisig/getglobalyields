#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
const recommendedModels = [
  {
    id: 'nousresearch/hermes-3-llama-3.1-405b:free',
    label: 'Best free article writing model',
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    label: 'Fast free writing alternative',
  },
  {
    id: 'deepseek/deepseek-v4-flash:free',
    label: 'Balanced free quality model',
  },
  {
    id: 'qwen/qwen3-coder:free',
    label: 'Free coding model',
  },
  {
    id: 'openai/gpt-5.5-pro',
    label: 'Best paid writing model',
  },
];

const printUsage = () => {
  console.log('OpenRouter local model selector');
  console.log('');
  console.log('Usage:');
  console.log('  node switch-openrouter-model.js');
  console.log('  node switch-openrouter-model.js list');
  console.log('  node switch-openrouter-model.js set <model-id>');
  console.log('  node switch-openrouter-model.js reset');
  console.log('');
  console.log('Recommended models:');
  for (const model of recommendedModels) {
    console.log(`  - ${model.id}`.padEnd(50) + ` ${model.label}`);
  }
  process.exit(0);
};

const getEnvFile = async () => {
  try {
    return await fs.readFile(envPath, 'utf-8');
  } catch (error) {
    console.error('Could not read .env.local:', error.message);
    process.exit(1);
  }
};

const writeEnvFile = async (content) => {
  try {
    await fs.writeFile(envPath, content, 'utf-8');
  } catch (error) {
    console.error('Could not write .env.local:', error.message);
    process.exit(1);
  }
};

const getCurrentModel = (content) => {
  const match = content.match(/^OPENROUTER_MODEL=(.*)$/m);
  return match ? match[1].trim() : null;
};

const setModel = async (modelId) => {
  const envContent = await getEnvFile();
  const currentModel = getCurrentModel(envContent);
  const newContent = envContent.replace(
    /^OPENROUTER_MODEL=.*$/m,
    `OPENROUTER_MODEL=${modelId}`
  );

  if (!newContent.includes('OPENROUTER_MODEL=')) {
    console.error('Could not find OPENROUTER_MODEL variable in .env.local.');
    process.exit(1);
  }

  await writeEnvFile(newContent);
  console.log('Model updated:');
  console.log(`  ${currentModel || '(none)'} → ${modelId}`);
};

const resetModel = async () => {
  const envContent = await getEnvFile();
  const currentModel = getCurrentModel(envContent);
  const defaultModel = 'nousresearch/hermes-3-llama-3.1-405b:free';
  await setModel(defaultModel);
  console.log('Reset model to default free article model.');
};

const listModels = async () => {
  const envContent = await getEnvFile();
  const currentModel = getCurrentModel(envContent);
  console.log('Current OPENROUTER_MODEL:', currentModel || 'not set');
  console.log('');
  console.log('Recommended models:');
  for (const model of recommendedModels) {
    const prefix = model.id === currentModel ? '*' : ' ';
    console.log(`${prefix} ${model.id}`.padEnd(48) + ` ${model.label}`);
  }
};

const args = process.argv.slice(2);

if (args.length === 0) {
  await listModels();
  process.exit(0);
}

const [command, ...rest] = args;

if (command === 'list') {
  await listModels();
  process.exit(0);
}

if (command === 'set') {
  const modelId = rest.join(' ').trim();
  if (!modelId) {
    console.error('Please provide a model ID to set.');
    printUsage();
  }
  await setModel(modelId);
  process.exit(0);
}

if (command === 'reset') {
  await resetModel();
  process.exit(0);
}

printUsage();
