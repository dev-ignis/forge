export function safeStringify(value: unknown, space = 2): string {
  const seen = new WeakSet<object>();
  const isElement = (v: any) => typeof Element !== 'undefined' && v instanceof Element;
  const isEvent = (v: any) => typeof Event !== 'undefined' && v instanceof Event;

  return JSON.stringify(
    value,
    (_key, val: any) => {
      // Functions are not serializable
      if (typeof val === 'function') {
        return `[Function:${val.name || 'anonymous'}]`;
      }

      if (val && typeof val === 'object') {
        // Avoid circular references
        if (seen.has(val)) return '[Circular]';
        seen.add(val);

        // Strip DOM nodes and Events from debug output
        if (isElement(val)) {
          const tag = val.tagName?.toLowerCase?.() ?? 'element';
          const id = val.id ? `#${val.id}` : '';
          return `[Element:${tag}${id}]`;
        }
        if (isEvent(val)) {
          return `[Event:${val.type}]`;
        }
      }

      return val;
    },
    space
  );
}

