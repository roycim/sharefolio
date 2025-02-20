'use client';
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Layout from "../components/Layout";
import FloatingReferralCard from "../components/FloatingReferralCard";
import { supabase } from "../lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";
import OriginCryptoTable from "@/components/OriginCryptoTable";
import { Button } from "@/components/ui/button";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    async function syncAndLoadTokens() {
      setLoading(true);
      try {
        // Sync tokens
        await fetch("/api/syncTokens", { method: "POST" });
      } catch (syncError) {
        console.error("Error syncing tokens:", syncError);
      }
      try {
        // Load tokens from Supabase
        const { data, error } = await supabase.from("assets").select("*");
        if (error) throw error;
        setCryptoData(data);
      } catch (dbError) {
        console.error("Error fetching tokens from DB:", dbError);
      }
      setLoading(false);
    }
    syncAndLoadTokens();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-blue-500/5 rounded-full blur-3xl"
            />
          </div>

          <div className="container mx-auto px-6">
            <motion.div
              ref={heroRef}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={stagger}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              {/* Main Heading with Custom Gradient and Drop Shadow */}
              <motion.h1
                variants={fadeIn}
                className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#007CF0] via-[#4E54C8] to-[#7209B7] bg-clip-text text-transparent leading-tight drop-shadow-md"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg,#225BD2 0%,rgb(106, 164, 234) 50%,rgb(163, 68, 226) 100%)",
                }}
              >
                The Social Platform for
                <br />
                <span
                  className="bg-gradient-to-r from-[#007CF0] via-[#4E54C8] to-[#7209B7] bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg,rgb(145, 82, 208) 0%,rgb(106, 164, 234) 50%,rgb(201, 168, 223) 100%)",
                  }}
                >
                  Crypto Traders
                </span>
              </motion.h1>

              {/* Subtext with Adjusted Colors for Light/Dark Mode */}
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 leading-relaxed text-muted-foreground dark:text-gray-300 light:text-gray-700"
              >
                Whether you're sharing your expertise or following top traders,
                <br />
                Sharefolio is your gateway to social crypto trading.
              </motion.p>

              {/* Call-to-Action Buttons replaced by OriginUI Buttons */}
              <motion.div
                variants={fadeIn}
                className="flex items-center justify-center gap-6 mt-8"
              >
                <Button
                  asChild
                  className="px-8 py-4 text-lg font-semibold bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                >
                  <Link href="/signup">
                    Start Trading <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="px-8 py-4 text-lg font-medium border border-border bg-muted text-foreground rounded-lg hover:bg-muted/90 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/explore">Explore Top Traders</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skeleton Test Section */}
        <section className="py-8 px-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Skeleton Loading Test
          </h2>
          <Skeleton className="w-[750px] h-[50px] rounded-full" />
          <Skeleton className="mt-6 w-[750px] h-[50px] rounded-full" />
          <Skeleton className="mt-6 w-[500px] h-[50px] rounded-full" />
        </section>

        {/* Live Crypto Prices using OriginUI Table */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            🔥 Live Crypto Prices
          </h2>
          <OriginCryptoTable cryptoData={cryptoData} loading={loading} />
        </section>
      </div>

      <div className="w-full mt-24 py-16">
        <FloatingReferralCard />
      </div>
    </Layout>
  );
}
