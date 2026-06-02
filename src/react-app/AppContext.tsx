import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Global state type: ONLY goal
 */
type AppContextType = {
  goal: string | null;
  setGoal: (goal: string | null) => void;
};

/**
 * Create context
 */
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Provider props
 */
type AppProviderProps = {
  children: ReactNode;
};

/**
 * Provider
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  const [goal, setGoal] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ goal, setGoal }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Safe hook
 */
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
};