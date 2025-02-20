import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  fetchMyPortfolios: async () => [],
  fetchSubscribedPortfolios: async () => [],
  myPortfolios: [],
  subscribedPortfolios: [],
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myPortfolios, setMyPortfolios] = useState([]);
  const [subscribedPortfolios, setSubscribedPortfolios] = useState([]);
  const router = useRouter();

  // Fetch portfolios function
  async function fetchMyPortfolios(userId) {
    try {
      const { data, error } = await supabase
        .from("portfolios")
        .select("*, creatorUser:users(email)")
        .eq("creator", userId);

      if (error) throw error;
      setMyPortfolios(data || []);
      return data || [];
    } catch (err) {
      console.error("Error fetching my portfolios:", err);
      return [];
    }
  }

  async function fetchSubscribedPortfolios(userId) {
    try {
      const { data, error } = await supabase
        .from("portfolio_subscriptions")
        .select("portfolios(*, creatorUser:users(email))")
        .eq("subscriber", userId);

      if (error) throw error;
      const subs = data
        .map((sub) => sub.portfolios)
        .filter((pf) => pf.visibility === "public" || pf.creator === userId);

      setSubscribedPortfolios(subs || []);
      return subs || [];
    } catch (err) {
      console.error("Error fetching subscribed portfolios:", err);
      return [];
    }
  }

  // Auth state management
  useEffect(() => {
    async function initializeAuth() {
      const { data: { user }, error } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await Promise.all([
          fetchMyPortfolios(user.id),
          fetchSubscribedPortfolios(user.id)
        ]);
      }
      setLoading(false);
    }

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      
      if (currentUser) {
        await Promise.all([
          fetchMyPortfolios(currentUser.id),
          fetchSubscribedPortfolios(currentUser.id)
        ]);
      } else {
        setMyPortfolios([]);
        setSubscribedPortfolios([]);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Auth methods
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    router.push('/dashboard');
    return data;
  };

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    if (data.user) {
      await supabase.from('users').upsert({
        id: data.user.id,
        email: data.user.email,
        slug: data.user.email.split('@')[0]
      });
    }
    router.push('/dashboard');
    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      fetchMyPortfolios,
      fetchSubscribedPortfolios,
      myPortfolios,
      subscribedPortfolios,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);