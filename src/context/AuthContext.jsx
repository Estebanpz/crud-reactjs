import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { app } from "../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Create the Auth Context
const AuthContext = createContext(null);
// Hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  // Listen for auth state changes
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsuscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
