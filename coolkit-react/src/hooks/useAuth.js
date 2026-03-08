import { useState, useEffect } from "react";
import { onAuthChange } from "../services/firebase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL
        });
        localStorage.setItem("uid", firebaseUser.uid); // For Dashboard.jsx
      } else {
        setUser(null);
        localStorage.removeItem("uid");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}