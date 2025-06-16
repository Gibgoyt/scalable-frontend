---
layout: 'src/layouts/MarkdownLayout.astro'
title: '.md Markdown File Demo'
description: 'Explore how Markdown files work in Astro'
author: 'Astro Developer'
date: 2025-06-16
tags: ['astro', 'markdown', 'demo']
---

# Markdown in Astro

Welcome to the **Markdown demo page**! This page is written entirely in Markdown and demonstrates how Astro seamlessly transforms `.md` files into full HTML pages.

## 📝 What is Markdown?

Markdown is a lightweight markup language that allows you to write content using plain text formatting. Astro converts your Markdown files into HTML at build time, making it perfect for:

- Blog posts
- Documentation
- Content-heavy pages
- Static content that doesn't need complex interactivity

## 🚀 Frontmatter

At the top of this file, you'll notice the frontmatter section between the `---` markers. This YAML data is accessible in your layout and can include:

```yaml
---
layout: 'src/layouts/Layout.astro'
title: 'Page Title'
description: 'Page description'
author: 'Author Name'
date: 2025-06-16
tags: ['tag1', 'tag2']
---
```

## 🎨 Markdown Features

### Text Formatting

You can use all standard Markdown formatting:

- **Bold text** with `**text**`
- *Italic text* with `*text*`
- ***Bold and italic*** with `***text***`
- ~~Strikethrough~~ with `~~text~~`
- `Inline code` with backticks

### Lists

#### Unordered Lists
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

#### Ordered Lists
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

### Links and Images

Create [links to other pages](/apps) or [external sites](https://astro.build).

While images work in Markdown, for this demo we'll use emoji instead: 🌟 🚀 ⚡

### Blockquotes

> "The best way to predict the future is to invent it."
> 
> — Alan Kay

### Code Blocks

```javascript
// JavaScript example
function greet(name) {
  return `Hello, ${name}! Welcome to Astro.`;
}

console.log(greet('Developer'));
```

```astro
---
// Astro component example
const items = ['Astro', 'Markdown', 'Components'];
---

<ul>
  {items.map(item => <li>{item}</li>)}
</ul>
```

### Tables

| Feature | Markdown | MDX | Astro |
|---------|----------|-----|-------|
| Plain text content | ✅ | ✅ | ✅ |
| Component imports | ❌ | ✅ | ✅ |
| JavaScript expressions | ❌ | ✅ | ✅ |
| Scoped styles | ❌ | ❌ | ✅ |

### Horizontal Rules

Use three or more hyphens, asterisks, or underscores:

---

## 🔧 Markdown Configuration

Astro uses `remark` and `rehype` under the hood, which means you can:

1. Add custom remark/rehype plugins
2. Configure syntax highlighting
3. Enable GitHub Flavored Markdown
4. Add custom components via MDX

## 📚 When to Use Markdown

Markdown files are perfect when you:

- Need to write content quickly
- Want to focus on writing without HTML distractions
- Are building a blog or documentation site
- Have content writers who aren't familiar with HTML/JSX

## 🎯 Limitations

While powerful, Markdown files in Astro have some limitations:

- No dynamic JavaScript (use MDX for that)
- No component imports (use MDX for that)
- Limited styling options (relies on global CSS or layout styles)

---

## 🔗 Navigation

[← Back to Applications Hub](/apps)

---

*This page was generated from a `.md` file. View the source to see the Markdown syntax in action!*