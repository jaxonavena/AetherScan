import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../utils/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [curUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const navigate = useNavigate();
  const loginAction = async (data) => {
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) throw error;
      
      console.log("User logged in: ", user);
      localStorage.setItem("site", JSON.stringify(user));
      setUser(user);
      setLoading(false);
      navigate("/homepage");
    } catch (error) {
      console.error("Login error: ", error);
      setLoading(false);
    }
  };

  const logOut = async () => {
    localStorage.removeItem("site");
    setUser(null);
    setLoading(true);
    await supabase.auth.signOut()
    .then(() => {
      console.log("Successfully signed out");
    })
    .catch((error) => {
      console.error("Sign out error: ", error);
    });
    navigate("/login");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ curUser, loginAction, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
