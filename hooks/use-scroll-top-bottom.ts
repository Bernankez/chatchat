import { useEffect, useState } from "react";

export function useScrollTopBottom(offset = 20) {
  const [isTop, setIsTop] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  function scrollHandler(e: Event) {
    const el = (e.target as Document).scrollingElement;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;
    if (scrollTop <= 0 + offset) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
    if (scrollHeight <= scrollTop + clientHeight + offset) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  });

  function scrollToTop() {
    document.scrollingElement?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function scrollToBottom() {
    const scrollHeight = document.scrollingElement?.scrollHeight;
    if (scrollHeight) {
      document.scrollingElement?.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }

  return {
    isTop,
    isBottom,

    scrollToTop,
    scrollToBottom,
  };
}
