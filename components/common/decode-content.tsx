import useMarkdownIt from "@/hooks/use-markdown-it";
import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";

export interface DecodeContentProps {
  content: string | (() => string);
}

export default function DecodeContent({ content }: DecodeContentProps) {
  const { md, asyncPluginLoaded } = useMarkdownIt();
  const [decodedContent, setDecodedContent] = useState(renderContent(md));

  useEffect(() => {
    setDecodedContent(renderContent(md));
  }, [content, asyncPluginLoaded]);

  function renderContent(md: MarkdownIt) {
    let htmlString = "";
    if (typeof content === "function") {
      htmlString = md.render(content());
    } else if (typeof content === "string") {
      htmlString = md.render(content);
    }
    return htmlString;
  }

  return (
    <div
      className="max-w-none content prose prose-neutral dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: decodedContent }}></div>
  );
}
