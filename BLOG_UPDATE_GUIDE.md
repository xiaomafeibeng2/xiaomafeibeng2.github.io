# 博客更新指南

## 📝 创建新文章

### 步骤 1: 创建文章文件

在 `_posts/` 目录下创建新的 Markdown 文件，文件名格式：

```
YYYY-MM-DD-文章标题.md
```

例如：`2025-11-13-我的新文章.md`

### 步骤 2: 添加 Front Matter

在文件开头添加以下内容：

```yaml
---
layout: post
title: 文章标题
date: 2025-11-13
categories: 分类名称
---
```

**参数说明：**
- `layout: post` - 固定为 `post`，表示这是文章
- `title` - 文章标题
- `date` - 发布日期（格式：YYYY-MM-DD）
- `categories` - 文章分类（可以有多个，用空格分隔）

### 步骤 3: 编写内容

在 Front Matter 下方开始编写文章内容，使用 Markdown 格式：

```markdown
## 标题

这是段落内容。

### 子标题

- 列表项 1
- 列表项 2

**加粗文本** *斜体文本*

[链接文本](https://example.com)

![图片描述](图片路径)

### 代码块

```bash
# 这是代码
echo "Hello World"
```

### 引用

> 这是引用内容
```

### 步骤 4: 提交和推送

```bash
# 添加文件
git add _posts/2025-11-13-我的新文章.md

# 提交
git commit -m "添加新文章：我的新文章"

# 推送到 GitHub
git push origin main
```

---

## ✏️ 修改现有文章

### 步骤 1: 编辑文章

直接编辑 `_posts/` 目录下对应的 `.md` 文件

### 步骤 2: 提交更改

```bash
# 添加修改的文件
git add _posts/文件名.md

# 提交
git commit -m "更新文章：文章标题"

# 推送
git push origin main
```

---

## ⚙️ 更新站点配置

### 修改 `_config.yml`

编辑 `_config.yml` 文件来更新站点信息：

```yaml
title: 我的博客          # 站点标题
description: 描述        # 站点描述
email: your-email@example.com  # 联系邮箱
github_username: 用户名   # GitHub 用户名
```

### 提交配置更改

```bash
git add _config.yml
git commit -m "更新站点配置"
git push origin main
```

---

## 🎨 修改样式

### 编辑 CSS 文件

编辑 `assets/css/main.css` 来自定义样式

### 提交样式更改

```bash
git add assets/css/main.css
git commit -m "更新样式"
git push origin main
```

---

## 📋 常用 Git 命令

### 查看状态
```bash
git status
```

### 查看所有更改
```bash
git diff
```

### 添加所有更改
```bash
git add .
```

### 提交所有更改
```bash
git commit -m "更新博客"
git push origin main
```

---

## ⚡ 快速更新流程

**一次性更新多篇文章或配置：**

```bash
# 1. 查看更改
git status

# 2. 添加所有更改
git add .

# 3. 提交
git commit -m "更新博客内容"

# 4. 推送
git push origin main
```

---

## 🌐 查看更新结果

1. **等待构建** - GitHub Pages 通常需要 1-5 分钟构建
2. **访问网站** - 打开 `https://xiaomafeibeng2.github.io`
3. **检查构建状态** - 在 GitHub 仓库的 Actions 标签页查看构建日志

---

## 💡 提示

- **文章分类**：分类会自动出现在首页右侧的分类目录中
- **代码高亮**：在代码块中指定语言，如 ` ```bash `、` ```python `
- **图片**：将图片放在 `assets/` 目录下，使用相对路径引用
- **草稿**：可以先在本地测试，确认无误后再推送

---

## 📝 文章模板

复制以下模板快速创建新文章：

```markdown
---
layout: post
title: 文章标题
date: 2025-11-13
categories: 分类
---

## 文章标题

这里是文章内容...

### 子标题

更多内容...

```bash
# 代码示例
command here
```

> 引用内容

**加粗** *斜体*

[链接](https://example.com)
```

---

**需要帮助？** 查看 [README.md](README.md) 了解更多信息。

