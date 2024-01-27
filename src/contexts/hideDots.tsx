import { createContext, useCallback, useContext, useState } from "react";

type HideDotsContextType = {
  dots: boolean;
  hideDots: () => void;
  showDots: () => void;
};

const emptyFn = () => {
  throw new Error(
    "Forgot to wrap your component in `HideDotsContext.Provider`"
  );
};

const initialState: HideDotsContextType = {
  dots: false,
  hideDots: emptyFn,
  showDots: emptyFn,
};

const HideDotsContext = createContext(initialState);

export const HideDotsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDotsHidden, setIsDotsHidden] = useState(false);

  const hideDots = useCallback(() => {
    setIsDotsHidden(true);
  }, []);

  const showDots = useCallback(() => {
    setIsDotsHidden(false);
  }, []);

  return (
    <HideDotsContext.Provider
      value={{
        dots: isDotsHidden,
        hideDots,
        showDots,
      }}
    >
      {children}
    </HideDotsContext.Provider>
  );
};

export const useHideDotsContext = () => useContext(HideDotsContext);
