# 我的博客

一个基于 Jekyll 构建的简约个人博客，部署在 GitHub Pages 上。

## ✨ 特性

- 🎨 **简约设计** - 干净、简洁的界面风格
- 📱 **响应式布局** - 完美适配移动端和桌面端
- 🏷️ **分类目录** - 右侧分类导航，方便浏览文章
- 💻 **代码高亮** - 支持多种编程语言的语法高亮
- 📝 **Markdown 支持** - 完整的 Markdown 格式支持
- 🔍 **SEO 优化** - 内置 SEO 标签和站点地图
- 🌐 **中文优化** - 针对中文内容优化的字体和排版

## 📁 项目结构

```
my-blog/
├── _config.yml          # Jekyll 配置文件
├── _includes/           # 包含文件
│   ├── header.html     # 头部导航
│   └── footer.html     # 页脚
├── _layouts/            # 布局文件
│   ├── default.html    # 默认布局
│   ├── home.html       # 首页布局
│   ├── page.html       # 页面布局
│   └── post.html       # 文章布局
├── _posts/              # 博客文章目录
│   └── *.md            # Markdown 格式的文章
├── assets/              # 静态资源
│   └── css/
│       └── main.css    # 主样式文件
├── 404.html            # 404 错误页面
├── about.markdown       # 关于页面
├── index.markdown       # 首页
├── Gemfile              # Ruby 依赖管理
└── Gemfile.lock         # 依赖版本锁定
```

## 🚀 快速开始

### 环境要求

- Ruby >= 2.7.0
- Bundler

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/xiaomafeibeng2/xiaomafeibeng2.github.io.git
   cd xiaomafeibeng2.github.io
   ```

2. **安装依赖**
   ```bash
   bundle install
   ```

3. **本地运行**
   ```bash
   bundle exec jekyll serve
   ```

4. **访问网站**
   打开浏览器访问 `http://localhost:4000`

## 📝 使用说明

### 创建新文章

在 `_posts/` 目录下创建新的 Markdown 文件，文件名格式为：

```
YYYY-MM-DD-文章标题.md
```

文章 Front Matter 示例：

```yaml
---
layout: post
title: 文章标题
date: 2025-11-13
categories: 分类名称
---
```

### 配置站点

编辑 `_config.yml` 文件来配置站点信息：

- `title`: 站点标题
- `description`: 站点描述
- `url`: 站点 URL
- `email`: 联系邮箱
- `github_username`: GitHub 用户名

### 自定义样式

编辑 `assets/css/main.css` 文件来自定义样式。CSS 变量定义在文件顶部，可以轻松修改颜色主题。

## 🌐 部署到 GitHub Pages

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Update blog"
   git push origin main
   ```

2. **配置 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `main` 分支
   - Folder 选择 `/ (root)`
   - 点击 Save

3. **等待构建**
   - GitHub Pages 会自动构建站点
   - 构建完成后，访问 `https://xiaomafeibeng2.github.io`

## 🛠️ 技术栈

- **Jekyll** - 静态站点生成器
- **GitHub Pages** - 免费托管服务
- **Markdown** - 文档格式
- **Kramdown** - Markdown 解析器
- **Highlight.js** - 代码语法高亮

## 📦 插件

- `jekyll-feed` - RSS 订阅
- `jekyll-sitemap` - 站点地图
- `jekyll-seo-tag` - SEO 优化

## 📄 许可证

本项目采用 MIT 许可证。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- GitHub: [@xiaomafeibeng2](https://github.com/xiaomafeibeng2)
- 网站: [https://xiaomafeibeng2.github.io](https://xiaomafeibeng2.github.io)

---

⭐ 如果这个项目对你有帮助，请给个 Star！

