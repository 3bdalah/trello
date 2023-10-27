import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

// eslint-disable-next-line react/prop-types
export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
