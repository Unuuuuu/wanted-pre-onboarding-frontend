import { createContext, useContext, useMemo, useState } from "react";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "./constants";

interface ContextValue {
  accessToken: string | null;
  actions: {
    update: (token: string) => void;
    delete: () => void;
  };
}

const AccessTokenContext = createContext<ContextValue>({
  accessToken: localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY),
  actions: {
    update: (token: string) => {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, token);
    },
    delete: () => {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    },
  },
});

interface AccessTokenProviderProps {
  children: React.ReactNode;
}

const AccessTokenProvider: React.FC<AccessTokenProviderProps> = (props) => {
  const { children } = props;
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  );
  const actions = useMemo(
    () => ({
      update: (token: string) => {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, token);
        setAccessToken(token);
      },
      delete: () => {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        setAccessToken(null);
      },
    }),
    []
  );

  const value = useMemo<ContextValue>(
    () => ({ accessToken, actions }),
    [accessToken, actions]
  );

  return (
    <AccessTokenContext.Provider value={value}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export default AccessTokenProvider;

export const useAccessToken = () => {
  const value = useContext(AccessTokenContext);
  return value;
};
