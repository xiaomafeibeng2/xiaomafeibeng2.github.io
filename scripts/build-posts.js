#!/usr/bin/env node
/**
 * Markdown -> HTML 构建脚本
 *
 * 使用方式：
 *   npm run build
 *
 * 要求：
 *   content/posts/*.md 作为输入
 *   posts/*.html 作为输出
 *   更新 posts/index.html 与 index.html 的文章列表区域
 */

const fs = require("fs-extra");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "posts");
const OUTPUT_DIR = path.join(ROOT, "posts");
const INDEX_FILE = path.join(ROOT, "index.html");
const POSTS_INDEX_FILE = path.join(OUTPUT_DIR, "index.html");

const POSTS_SLOT_START = "<!-- posts:start -->";
const POSTS_SLOT_END = "<!-- posts:end -->";

marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: false,
  mangle: false,
});

async function main() {
  const files = await fs.readdir(CONTENT_DIR);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  if (markdownFiles.length === 0) {
    console.log("⚠️ 未找到 Markdown 文件，跳过构建。");
    return;
  }

  const posts = [];

  for (const file of markdownFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);

    validateFrontMatter(file, data);

    const htmlContent = marked.parse(content);
    const outputHtml = buildPostHtml({ ...data, content: htmlContent });

    const outPath = path.join(OUTPUT_DIR, `${data.slug}.html`);
    await fs.ensureDir(OUTPUT_DIR);
    await fs.writeFile(outPath, outputHtml, "utf8");

    posts.push({
      ...data,
      html: htmlContent,
      file: `${data.slug}.html`,
    });

    console.log(`✅ 已生成 ${data.slug}.html`);
  }

  const sorted = sortPosts(posts);

  await updatePostsIndex(sorted);
  await updateHomePage(sorted);

  console.log("✨ 构建完成！");
}

function validateFrontMatter(file, data) {
  const required = ["title", "date", "category", "summary", "slug"];
  const missing = required.filter((key) => !data[key]);
  if (missing.length) {
    throw new Error(`${file} 缺少 Front Matter 字段：${missing.join(", ")}`);
  }
}

function sortPosts(posts) {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

function buildPostHtml({ title, date, category, content }) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title} · 简约笔记</title>
    <meta name="description" content="${escapeHtml(
      title
    )} · ${escapeHtml(category)}">
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="container header-wrapper">
        <div class="brand">
          <span class="brand-logo" aria-hidden="true">✦</span>
          <div>
            <a class="brand-name" href="/">简约笔记</a>
            <p class="brand-tagline">写下思考，保持轻盈。</p>
          </div>
        </div>
        <nav class="nav">
          <a href="../index.html#posts">文章</a>
          <a href="../index.html#projects">项目</a>
          <a href="../index.html#about">关于</a>
        </nav>
      </div>
    </header>

    <main class="section">
      <article class="container post">
        <p class="card-meta">${formatDate(date)} · ${escapeHtml(category)}</p>
        <h1>${escapeHtml(title)}</h1>
        <div class="post-body">
          ${content}
        </div>
        <div class="post-end">
          <a class="card-link" href="index.html">← 返回文章列表</a>
        </div>
      </article>
    </main>

    <footer class="site-footer">
      <div class="container footer-wrapper">
        <p>© <span id="year"></span> 简约笔记. 保持轻盈。</p>
        <div class="footer-links">
          <a href="https://github.com/your-name" target="_blank" rel="noopener">GitHub</a>
          <a href="https://twitter.com/your-name" target="_blank" rel="noopener">Twitter</a>
          <a href="https://www.linkedin.com/in/your-name" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
      <script>
        document.getElementById("year").textContent = new Date().getFullYear();
      </script>
    </footer>
  </body>
</html>
`;
}

async function updatePostsIndex(posts) {
  const items = posts
    .map(
      (post) => `<article class="card">
            <p class="card-meta">${formatDate(post.date)} · ${escapeHtml(
        post.category
      )}</p>
            <h2><a href="${post.file}">${escapeHtml(post.title)}</a></h2>
            <p>${escapeHtml(post.summary)}</p>
            <a class="card-link" href="${post.file}">阅读全文</a>
          </article>`
    )
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>文章归档 · 简约笔记</title>
    <meta name="description" content="简约笔记博客的全部文章列表。">
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <header class="site-header">
      <div class="container header-wrapper">
        <div class="brand">
          <span class="brand-logo" aria-hidden="true">✦</span>
          <div>
            <a class="brand-name" href="/">简约笔记</a>
            <p class="brand-tagline">写下思考，保持轻盈。</p>
          </div>
        </div>
        <nav class="nav">
          <a href="../index.html#posts">文章</a>
          <a href="../index.html#projects">项目</a>
          <a href="../index.html#about">关于</a>
        </nav>
      </div>
    </header>

    <main class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-kicker">Archive</p>
            <h1>文章归档</h1>
          </div>
        </div>
        <div class="cards-grid">
          ${items}
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container footer-wrapper">
        <p>© <span id="year"></span> 简约笔记. 保持轻盈。</p>
        <div class="footer-links">
          <a href="https://github.com/your-name" target="_blank" rel="noopener">GitHub</a>
          <a href="https://twitter.com/your-name" target="_blank" rel="noopener">Twitter</a>
          <a href="https://www.linkedin.com/in/your-name" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
      <script>
        document.getElementById("year").textContent = new Date().getFullYear();
      </script>
    </footer>
  </body>
</html>
`;

  await fs.writeFile(POSTS_INDEX_FILE, html, "utf8");
  console.log("🗂️ 已更新 posts/index.html");
}

async function updateHomePage(posts) {
  const latest = posts.slice(0, 3);
  const cards = latest
    .map(
      (post) => `<article class="card">
              <p class="card-meta">${formatDate(post.date)} · ${escapeHtml(
        post.category
      )}</p>
              <h3><a href="posts/${post.file}">${escapeHtml(post.title)}</a></h3>
              <p>
                ${escapeHtml(post.summary)}
              </p>
              <a class="card-link" href="posts/${post.file}">阅读全文</a>
            </article>`
    )
    .join("\n");

  let indexHtml = await fs.readFile(INDEX_FILE, "utf8");
  if (!indexHtml.includes(POSTS_SLOT_START) || !indexHtml.includes(POSTS_SLOT_END)) {
    console.warn("⚠️ index.html 中未找到 posts 替换占位符，跳过首页更新。");
    return;
  }

  const regex = new RegExp(
    `${POSTS_SLOT_START}[\\s\\S]*?${POSTS_SLOT_END}`,
    "gm"
  );
  const replacement = `${POSTS_SLOT_START}\n${cards}\n          ${POSTS_SLOT_END}`;
  indexHtml = indexHtml.replace(regex, replacement);

  await fs.writeFile(INDEX_FILE, indexHtml, "utf8");
  console.log("🏠 已更新 index.html 中的文章列表");
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return escapeHtml(dateStr);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

main().catch((err) => {
  console.error("❌ 构建失败：", err);
  process.exitCode = 1;
});

