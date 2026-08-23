// Pulls whatever the scheduled-publish Action pushed, so the local dev server
// shows the same set of live articles as the real site.
//
// A GitHub Action runs on GitHub's machines and has no way to reach this one,
// so "update the local server when a page goes live" cannot be pushed - it has
// to be pulled. This runs automatically before `npm run dev` (via the `predev`
// hook) and can be run on its own with `npm run sync`.
//
// It never fails the command it precedes. Being offline, or sitting on local
// edits that block a fast-forward, should not stop you from starting the dev
// server - it just means you are looking at slightly older content, and the
// warning below says so.
import { execSync } from 'node:child_process';

const run = (cmd) => execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();

const publishedIn = (range) => {
  try {
    const files = run(`git diff --name-only ${range} -- src/content`).split('\n').filter(Boolean);
    const nowLive = [];
    for (const f of files) {
      let before = '';
      let after = '';
      try { before = run(`git show ${range.split('..')[0]}:"${f}"`); } catch { /* new file */ }
      try { after = run(`git show ${range.split('..')[1]}:"${f}"`); } catch { continue; }
      if (/^draft:\s*true\s*$/m.test(before) && /^draft:\s*false\s*$/m.test(after)) {
        nowLive.push(f.replace(/^src\/content\//, '').replace(/\.md$/, ''));
      }
    }
    return nowLive;
  } catch {
    return [];
  }
};

try {
  const before = run('git rev-parse HEAD');
  run('git fetch origin --quiet');

  const behind = run('git rev-list --count HEAD..origin/main');
  if (behind === '0') {
    console.log('[sync] Already up to date with origin/main.');
    process.exit(0);
  }

  console.log(`[sync] ${behind} new commit(s) on origin/main - pulling...`);
  run('git pull --ff-only --quiet');
  const after = run('git rev-parse HEAD');

  const nowLive = publishedIn(`${before}..${after}`);
  if (nowLive.length > 0) {
    console.log(`[sync] Newly published (${nowLive.length}):`);
    nowLive.forEach((s) => console.log('        ' + s));
  }
  console.log('[sync] Local content now matches the live site.');
} catch (err) {
  const msg = (err.stderr || err.stdout || err.message || '').toString().trim().split('\n')[0];
  console.warn('[sync] Could not sync with origin - continuing with local content.');
  if (msg) console.warn('[sync] Reason: ' + msg);
  console.warn('[sync] If you have local edits blocking a fast-forward, commit or stash them.');
}
