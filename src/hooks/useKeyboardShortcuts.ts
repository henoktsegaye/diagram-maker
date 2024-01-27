import { useCallback, useEffect } from "react";

type KeyboardKeys = {
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
};

type Props = {
  key: string;
  callback: (e: KeyboardEvent) => void;
  options?: KeyboardKeys;
};
export const useOnKeyDown = ({
  key,
  callback,
  options = {
    metaKey: true,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
  },
}: Props) => {
  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const { metaKey, ctrlKey, shiftKey, altKey } = options;
    
      if (key !== event.key) {
        return;
      }
      if (metaKey && !event.metaKey) {
        return;
      }
      if (ctrlKey && !event.ctrlKey) {
        return;
      }
      if (shiftKey && !event.shiftKey) {
        return;
      }

      if (altKey && !event.altKey) {
        return;
      }
      callback(event);
    },
    [callback, key, options]
  );

  useEffect(() => {
    if (!window) {
      return;
    }
    window.addEventListener("keydown", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyUp);
    };
  }, [key, callback, options, onKeyUp]);
};
