import { useEffect } from 'react';

export const useChatbaseWidget = (visible: boolean = true) => {
  useEffect(() => {
    const w = window as any;

    // Setup Chatbase if not initialized
    if (!w.chatbase || w.chatbase("getState") !== "initialized") {
      const cb = (...args: any[]) => {
        if (!w.chatbase?.q) {
          w.chatbase = w.chatbase || {};
          w.chatbase.q = [];
        }
        w.chatbase.q.push(args);
      };
      w.chatbase = new Proxy(cb, {
        get(target: any, prop: string | symbol) {
          if (prop === "q") return target.q;
          return (...args: any[]) => target(prop, ...args);
        },
      });
    }

    const inject = () => {
      if (document.getElementById('KxqQHDdfdAW1PQjm6vg2B')) return;
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = 'KxqQHDdfdAW1PQjm6vg2B';
      script.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(script);
    };

    // Handle visibility
    const toggleWidget = () => {
      const iframes = document.querySelectorAll<HTMLElement>('iframe[src*="chatbase.co"]');
      const widgets = document.querySelectorAll<HTMLElement>('[id*="chatbase"], [class*="chatbase"]');
      [...iframes, ...widgets].forEach(el => {
        if (el && el instanceof HTMLElement) {
          el.style.display = visible ? '' : 'none';
        }
      });
    };

    if (visible) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
      } else {
        inject();
      }
      const t = window.setTimeout(() => {
        inject();
        toggleWidget();
      }, 1000);
      return () => {
        window.clearTimeout(t);
        document.removeEventListener('DOMContentLoaded', inject);
      };
    } else {
      toggleWidget();
    }
  }, [visible]);
};

