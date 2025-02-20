import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import CreatePortfolioWizard from "../components/CreatePortfolioWizard";
import PortfolioCard from "../components/ui/portfolio-card";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [myPortfolios, setMyPortfolios] = useState([]);
  const [subscribedPortfolios, setSubscribedPortfolios] = useState([]);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        setUser(user);
        fetchMyPortfolios(user.id);
        fetchSubscribedPortfolios(user.id);
      } else {
        router.push('/auth');
      }
    }
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        if (currentUser) {
          fetchMyPortfolios(currentUser.id);
          fetchSubscribedPortfolios(currentUser.id);
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  async function fetchMyPortfolios(userId) {
    try {
      const { data, error } = await supabase
        .from("portfolios")
        .select("*, creatorUser:users(email)")
        .eq("creator", userId);

      if (error) throw error;
      setMyPortfolios(data || []);
    } catch (err) {
      console.error("Error fetching my portfolios:", err);
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
    } catch (err) {
      console.error("Error fetching subscribed portfolios:", err);
    }
  }

  return (
    <Layout>
      <div className="text-foreground">
        {!user ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2">Welcome, {user.email}!</p>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">My Portfolios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myPortfolios.map((pf) => (
                  <PortfolioCard
                    key={pf.id}
                    portfolio={pf}
                    user={user}
                    isSubscribed={false}
                  />
                ))}
                <div
                  className="flex flex-col items-center justify-center bg-popover border border-dashed border-border rounded p-4 cursor-pointer hover:bg-popover/80 transition"
                  onClick={() => setShowWizard(true)}
                >
                  <span className="text-4xl font-bold">+</span>
                  <span className="mt-2">Create New Portfolio</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Subscribed Portfolios</h2>
              {subscribedPortfolios.length === 0 ? (
                <p className="text-muted-foreground">
                  You are not subscribed to any portfolios.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subscribedPortfolios.map((pf) => (
                    <PortfolioCard
                      key={pf.id}
                      portfolio={pf}
                      user={user}
                      isSubscribed
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {showWizard && user && (
        <CreatePortfolioWizard
          userId={user.id}
          onClose={() => setShowWizard(false)}
          onPortfolioCreated={() => fetchMyPortfolios(user.id)}
        />
      )}
    </Layout>
  );
}