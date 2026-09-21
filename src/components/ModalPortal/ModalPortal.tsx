"use client";

import { useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};
const locks = new WeakMap<HTMLElement, { count: number; restore: () => void }>();

function lockScroll(element: HTMLElement) {
  const existing = locks.get(element);
  if (existing) {
    existing.count += 1;
  } else {
    const properties = ["overflow-x", "overflow-y"];
    const previous = properties.map((property) => ({
      property,
      value: element.style.getPropertyValue(property),
      priority: element.style.getPropertyPriority(property),
    }));
    properties.forEach((property) => element.style.setProperty(property, "hidden"));
    locks.set(element, {
      count: 1,
      restore: () => previous.forEach(({ property, value, priority }) => {
        if (value) element.style.setProperty(property, value, priority);
        else element.style.removeProperty(property);
      }),
    });
  }

  return () => {
    const lock = locks.get(element)!;
    if (--lock.count === 0) {
      lock.restore();
      locks.delete(element);
    }
  };
}

export default function ModalPortal({ children }: { children: ReactNode }) {
  const anchor = useRef<HTMLSpanElement>(null);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  useLayoutEffect(() => {
    if (!mounted) return;

    // Include nested page scrollers, not just the document body.
    const elements = new Set([document.body, document.documentElement]);
    for (let parent = anchor.current?.parentElement; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      if (locks.has(parent) || /auto|scroll/.test(style.overflowX + style.overflowY)) {
        elements.add(parent);
      }
    }
    const releases = Array.from(elements, lockScroll);
    return () => releases.forEach((release) => release());
  }, [mounted]);

  return (
    <>
      <span ref={anchor} hidden />
      {mounted && createPortal(children, document.body)}
    </>
  );
}
