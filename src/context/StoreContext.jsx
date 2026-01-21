import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import { getUserInfo } from "../firebase/store.firebase";
const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export default function StoreProvider({ children }) {
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      if (user) {
        const userInfo = await getUserInfo(user.uid);
        setStore(userInfo.data());
        setLoading(false);
      }
    };
    fetchStore();
    return () => {};
  }, []);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
}
