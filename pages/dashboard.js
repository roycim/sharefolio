import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import CreatePortfolioWizard from "../components/CreatePortfolioWizard";
import PortfolioCard from "../components/ui/portfolio-card";

export default function Dashboard() {
  const { user, loading, myPortfolios, subscribedPortfolios, fetchMyPortfolios } = useAuth();
  const [showWizard, setShowWizard] = useState(false);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-foreground">
        {!user ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Please sign in to continue</h2>
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
