#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import http from 'http';

const envPath = path.join(process.cwd(), '.env.local');

const getEnvFile = async () => {
  try {
    return await fs.readFile(envPath, 'utf-8');
  } catch (error) {
    return null;
  }
};

const getCurrentModel = (content) => {
  if (!content) return null;
  const match = content.match(/^OPENROUTER_MODEL=(.*)$/m);
  return match ? match[1].trim() : null;
};

const getApiKey = (content) => {
  if (!content) return null;
  const match = content.match(/^OPENROUTER_API_KEY=(.*)$/m);
  return match ? match[1].trim() : null;
};

const generateHTML = (model, apiKeyExists) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OpenRouter Model Status - GetGlobalYields</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      background: linear-gradient(135deg, #1a1f35 0%, #16213e 100%);
      color: #e2e8f0;
      min-height: 100vh;
      padding: 2rem;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 3rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: #94a3b8;
      font-size: 1.1rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .card {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 1rem;
      padding: 1.5rem;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .card:hover {
      border-color: rgba(251, 191, 36, 0.4);
      background: rgba(30, 41, 59, 0.8);
      transform: translateY(-2px);
    }

    .card-label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #fbbf24;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }

    .card-value {
      font-size: 1.25rem;
      font-weight: 600;
      word-break: break-all;
      font-family: 'Courier New', monospace;
    }

    .status-ok {
      color: #10b981;
    }

    .status-error {
      color: #ef4444;
    }

    .commands-section {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 1rem;
      padding: 2rem;
      margin-bottom: 2rem;
      backdrop-filter: blur(10px);
    }

    .commands-section h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #e2e8f0;
    }

    .command-item {
      margin-bottom: 1.5rem;
    }

    .command-item:last-child {
      margin-bottom: 0;
    }

    .command-title {
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .command-code {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 0.5rem;
      padding: 1rem;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      color: #cbd5e1;
      overflow-x: auto;
      cursor: pointer;
      user-select: all;
      transition: all 0.2s ease;
    }

    .command-code:hover {
      background: rgba(15, 23, 42, 1);
      border-color: rgba(148, 163, 184, 0.2);
    }

    .recommended {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 1rem;
      padding: 2rem;
      backdrop-filter: blur(10px);
    }

    .recommended h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #e2e8f0;
    }

    .recommended-text {
      color: #cbd5e1;
      margin-bottom: 1rem;
    }

    .model-box {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(251, 191, 36, 0.3);
      border-radius: 0.75rem;
      padding: 1.5rem;
      font-family: 'Courier New', monospace;
      font-size: 0.95rem;
      color: #fbbf24;
      text-align: center;
      cursor: pointer;
      user-select: all;
      transition: all 0.2s ease;
    }

    .model-box:hover {
      background: rgba(15, 23, 42, 1);
      border-color: rgba(251, 191, 36, 0.6);
    }

    footer {
      text-align: center;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(148, 163, 184, 0.1);
      color: #64748b;
      font-size: 0.9rem;
    }

    .copy-hint {
      font-size: 0.8rem;
      color: #94a3b8;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🚀 OpenRouter Model Status</h1>
      <p class="subtitle">GetGlobalYields Project Configuration</p>
    </header>

    <div class="grid">
      <div class="card">
        <div class="card-label">Active Model</div>
        <div class="card-value">${model || '<span class="status-error">Not configured</span>'}</div>
      </div>
      <div class="card">
        <div class="card-label">API Key</div>
        <div class="card-value ${apiKeyExists ? 'status-ok' : 'status-error'}">
          ${apiKeyExists ? '✓ Configured' : '✗ Not configured'}
        </div>
      </div>
    </div>

    <div class="commands-section">
      <h2>📋 Commands</h2>

      <div class="command-item">
        <div class="command-title">Show current model & list all models</div>
        <div class="command-code">npm run openrouter:model:list</div>
        <div class="copy-hint">Click to select and copy</div>
      </div>

      <div class="command-item">
        <div class="command-title">Change to a different model</div>
        <div class="command-code">npm run openrouter:model:set -- &lt;model-id&gt;</div>
        <div class="copy-hint">Click to select and copy</div>
      </div>

      <div class="command-item">
        <div class="command-title">Reset to default free model</div>
        <div class="command-code">npm run openrouter:model:reset</div>
        <div class="copy-hint">Click to select and copy</div>
      </div>
    </div>

    <div class="recommended">
      <h2>⭐ Recommended Free Model</h2>
      <p class="recommended-text">Best for article writing, high quality, no cost:</p>
      <div class="model-box">nousresearch/hermes-3-llama-3.1-405b:free</div>
      <div class="copy-hint">Click to copy model ID</div>
    </div>

    <footer>
      <p>Open this page anytime to check your active OpenRouter model configuration</p>
    </footer>
  </div>

  <script>
    // Make all code blocks clickable to copy
    document.querySelectorAll('.command-code, .model-box').forEach(el => {
      el.addEventListener('click', () => {
        const text = el.textContent.trim();
        navigator.clipboard.writeText(text).then(() => {
          const originalText = el.textContent;
          el.textContent = '✓ Copied!';
          el.style.color = '#10b981';
          setTimeout(() => {
            el.textContent = originalText;
            el.style.color = '';
          }, 2000);
        });
      });
    });

    // Refresh page every 5 seconds to show model changes in real-time
    setInterval(() => {
      location.reload();
    }, 5000);
  </script>
</body>
</html>`;
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    const envContent = await getEnvFile();
    const model = getCurrentModel(envContent);
    const apiKeyExists = Boolean(getApiKey(envContent));

    const html = generateHTML(model, apiKeyExists);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 5173;
server.listen(PORT, () => {
  console.log('');
  console.log('🌐 OpenRouter Model Status Page');
  console.log('');
  console.log(`📍 Open in your browser:`);
  console.log(`   http://localhost:${PORT}`);
  console.log('');
  console.log('ℹ️  Page refreshes every 5 seconds');
  console.log('✓  Press Ctrl+C to stop');
  console.log('');
});
