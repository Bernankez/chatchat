import markdownIt from "markdown-it";
// @ts-ignore
import markdownKatex from "markdown-it-katex";
import markdownHl from "markdown-it-highlightjs";

export interface DecodeContentProps {
  content: string | (() => string);
}

export default function DecodeContent({ content }: DecodeContentProps) {
  const md = markdownIt({
    html: false,
    xhtmlOut: false,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownKatex)
    .use(markdownHl);
  const fence = md.renderer.rules.fence!;
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const token = tokens[idx];
    const rawCode = fence(...args);

    return rawCode;

    return `<div relative>
    <div data-code=${encodeURIComponent(token.content)} class="copy-btn gpt-copy-btn group">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z" /><path fill="currentColor" d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z" /></svg>
          <div class="group-hover:op-100 gpt-copy-tips">
            Copied
          </div>
    </div>
    ${rawCode}
    </div>`;
  };

  let decodedContent = "";

  if (typeof content === "function") {
    decodedContent = md.render(content());
  } else if (typeof content === "string") {
    decodedContent = md.render(content);
  }

  return <div className="content" dangerouslySetInnerHTML={{ __html: decodedContent }}></div>;
}
