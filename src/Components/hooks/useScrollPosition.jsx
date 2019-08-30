import { useRef, useLayoutEffect } from "react";

const isBrowser = typeof window !== `undefined`;

const mq = window.matchMedia("(min-width: 800px)");

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();
  if (mq.matches) {
    return useWindow
      ? { x: window.scrollX, y: window.scrollY }
      : { x: position.left, y: position.top };
  } else {
    return { x: 0, y: 0 };
  }
}

export function useScrollPosition(effect, deps, element, useWindow, wait) {
  const position = useRef(getScrollPosition({ useWindow }));

  let throttleTimeout = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    if (!isBrowser) {
      return;
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          // eslint-disable-next-line
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [wait]);
}

useScrollPosition.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null
};
