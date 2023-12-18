import { useSyncExternalStore } from "react";
import MarkdownIt from "markdown-it";
// @ts-ignore
import markdownKatex from "markdown-it-katex";
import Shikiji from "markdown-it-shikiji";

function initMarkdownIt() {
  const md = MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: true,
    linkify: true,
    typographer: true,
  }).use(markdownKatex);
  const fence = md.renderer.rules.fence!;
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const token = tokens[idx];
    const rawCode = fence(...args);

    return rawCode;

    // return `<div relative>
    // <div data-code=${encodeURIComponent(token.content)} class="copy-btn gpt-copy-btn group">
    //     <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z" /><path fill="currentColor" d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z" /></svg>
    //       <div class="group-hover:op-100 gpt-copy-tips">
    //         Copied
    //       </div>
    // </div>
    // ${rawCode}
    // </div>`;
  };
  return md;
}

async function loadAsyncPlugin(md: MarkdownIt) {
  const shikiji = await Shikiji({
    themes: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
  });
  md.use(shikiji);
}

const state = {
  asyncPluginLoaded: false,
};
const loadedCbs: (() => void)[] = [];

const md = initMarkdownIt();
loadAsyncPlugin(md).then(() => {
  state.asyncPluginLoaded = true;
  loadedCbs.forEach((fn) => fn());
});

function subscribe(callback: () => void) {
  loadedCbs.push(callback);

  return () => {
    const index = loadedCbs.findIndex(callback);
    index > -1 && loadedCbs.splice(index, 1);
  };
}

function getAsyncPluginLoaded() {
  return state.asyncPluginLoaded;
}

function getServerSnapshot() {
  return false;
}

export default function useMarkdownIt() {
  const asyncPluginLoaded = useSyncExternalStore(subscribe, getAsyncPluginLoaded, getServerSnapshot);

  return {
    md,
    asyncPluginLoaded,
  };
}
