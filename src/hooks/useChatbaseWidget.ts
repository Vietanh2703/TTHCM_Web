import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useChatbaseWidget = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    // Clean up any existing Chatbase elements first
    const cleanupChatbase = () => {
      const existingScript = document.getElementById('KxqQHDdfdAW1PQjm6vg2B');
      if (existingScript) {
        existingScript.remove();
      }

      const chatbaseElements = document.querySelectorAll('[id*="chatbase"], [class*="chatbase"], .chatbase-bubble, iframe[src*="chatbase"]');
      chatbaseElements.forEach(element => element.remove());

      if (window.chatbase) {
        delete window.chatbase;
      }
    };

    // If not on homepage, clean up and return
    if (!isHomepage) {
      cleanupChatbase();
      return;
    }

    // Load Chatbase only on homepage
    const loadChatbase = () => {
      // Clean up first
      cleanupChatbase();

      // Initialize chatbase with your specific configuration
      (function(){
        if(!window.chatbase || window.chatbase("getState") !== "initialized") {
          window.chatbase = (...args: unknown[]) => {
            if(!window.chatbase.q) {
              window.chatbase.q = [];
            }
            window.chatbase.q.push(args);
          };

          window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
              if(prop === "q") {
                return target.q;
              }
              return (...args: unknown[]) => target(prop, ...args);
            }
          });
        }

        const onLoad = function() {
          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = "KxqQHDdfdAW1PQjm6vg2B";
          script.setAttribute('domain', "www.chatbase.co");
          document.body.appendChild(script);
        };

        if(document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      })();
    };

    // Load with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(loadChatbase, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      cleanupChatbase();
    };
  }, [isHomepage]);
};

// Add type declaration for window
declare global {
  interface Window {
    chatbase?: any;
  }
}
