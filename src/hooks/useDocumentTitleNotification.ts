import { useEffect, useRef } from "react";

export function useDocumentTitleNotification(isNotifying: boolean, notificationTitle: string) {
  const originalTitleRef = useRef<string>("");
  const isToggledRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!originalTitleRef.current && document.title && document.title !== notificationTitle) {
      originalTitleRef.current = document.title;
    }

    const observer = new MutationObserver(() => {
      const currentTitle = document.title;
      if (currentTitle && currentTitle !== notificationTitle) {
        originalTitleRef.current = currentTitle;
      }
    });

    const head = document.querySelector("head");
    if (head) {
      observer.observe(head, { childList: true, subtree: true, characterData: true });
    }

    let intervalId: NodeJS.Timeout;

    if (isNotifying) {
      intervalId = setInterval(() => {
        if (document.title !== notificationTitle && document.title !== originalTitleRef.current) {
          originalTitleRef.current = document.title;
        }

        if (isToggledRef.current) {
          document.title = originalTitleRef.current;
        } else {
          document.title = notificationTitle;
        }
        isToggledRef.current = !isToggledRef.current;
      }, 1500);
    } else {
      if (originalTitleRef.current) {
        document.title = originalTitleRef.current;
      }
      isToggledRef.current = false;
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      observer.disconnect();

      if (originalTitleRef.current && document.title === notificationTitle) {
        document.title = originalTitleRef.current;
      }
    };
  }, [isNotifying, notificationTitle]);
}
