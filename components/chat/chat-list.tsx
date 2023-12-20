import { Role } from "@/lib/types";
import { Icon } from "@iconify/react";
import DecodeContent from "../common/decode-content";
import Placeholder from "../ui/placeholder";

export interface ChatListProps {
  className?: string;
  role?: Role;
}

export default function ChatList({ role = "assistant", className }: ChatListProps) {
  const response = `
当然可以。以下是一段示例的Markdown内容，你可以用来测试\`markdown-it\`解析器：

# Markdown 示例内容

这是一个**Markdown**示例，用于测试。

## 列表

无序列表:

- 项目一
- 项目二
    - 子项目二.1
    - 子项目二.2
- 项目三

有序列表:

1. 第一项
2. 第二项
3. 第三项

## 链接

这是一个链接: [Google](https://www.google.com)

## 图片

这是一个图片示例:

![Markdown Logo](https://markdown-here.com/img/icon256.png)

## 代码

这是一个\`inline code\`示例。

这是一个代码块示例:

\`\`\`\`javascript
function sayHello() {
    console.log("Hello, Markdown!");
}
\`\`\`\`

## 引用

这是一个引用示例:

> Markdown是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。

## 表格

这是一个表格示例:

| 标题1 | 标题2 | 标题3 |
|-------|-------|-------|
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

## 强调

这是*斜体*的示例，这是**粗体**的示例。

---

使用Markdown可以创建富文本内容，而\`markdown-it\`是一个非常流行的Markdown解析器，支持多种浏览器和Node.js。
\`\`\`
请注意，由于Markdown代码块的限制，我在内部的代码块的结束处使用了三个反引号，但是在实际使用中，您应该只使用一组三个反引号来开始和结束代码块。在这里，我使用了四个反引号来正确显示外部的代码块。在你的Markdown解析器中，你应该使用三个反引号来表示代码块的开始和结束。
  `;

  return (
    <div
      className={`flex item-start gap-3 w-full py-6 px-3 rounded-sm md:hover:bg-accent/30 transition ${
        role === "user" ? "flex-row-reverse" : ""
      } ${className || ""}`}>
      <div>
        {role === "user" ? (
          <Placeholder skeleton="w-7 h-7">
            <Icon icon="simple-icons:ghost" width="1.75rem" color="#c14344"></Icon>
          </Placeholder>
        ) : (
          <Placeholder skeleton="w-7 h-7">
            <Icon icon="gravity-ui:ghost" width="1.75rem" className="text-orange-500 dark:text-orange-400"></Icon>
          </Placeholder>
        )}
      </div>
      <div className={`break-words overflow-hidden ${role === "user" ? "pl-[2.75rem]" : "pr-[2.75rem]"}`}>
        <DecodeContent content={response}></DecodeContent>
      </div>
    </div>
  );
}
