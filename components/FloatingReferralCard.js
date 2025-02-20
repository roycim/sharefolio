// components/FloatingReferralCard.js
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// A client-only wrapper to ensure that motion components render only on the client.
function ClientOnlyMotionDiv(props) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return <motion.div {...props} />;
}

export default function FloatingReferralCard() {
  // Memoize coin positions so they remain consistent between renders.
  const coinPositions = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }));
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Floating Coins Background */}
      <div className="absolute inset-0 pointer-events-none">
        {coinPositions.map((pos, i) => (
          <ClientOnlyMotionDiv
            key={i}
            className="w-4 h-4 bg-yellow-400 rounded-full absolute opacity-75"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: 'easeInOut'
            }}
            style={{ left: pos.left, top: pos.top }}
          />
        ))}
      </div>

      {/* Referral Card */}
      <ClientOnlyMotionDiv
        className="relative z-20 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-10 rounded-2xl shadow-2xl max-w-lg mx-auto transform transition-all duration-300 hover:scale-105"
        whileHover={{ scale: 1.05, rotate: [0, 10, 2] }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.01 }}
      >
        <h2 className="text-2xl font-bold">Refer &amp; Earn Crypto Rewards</h2>
        <p className="mt-3 text-gray-200">
          Invite your friends to Sharefolio and earn{' '}
          <span className="font-bold">up to 30%</span> commission on their subscriptions.
        </p>
        <button className="mt-6 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition">
          Get Your Referral Link
        </button>
      </ClientOnlyMotionDiv>

      {/* Referral Program Details */}
      <div className="relative z-20 max-w-3xl mx-auto mt-10 text-gray-300 text-sm">
        <p>🔹 Earn 30% of all subscription fees from your referrals.</p>
        <p>🔹 More referrals = higher tier bonuses &amp; exclusive perks.</p>
        <p>🔹 Instant payouts in USDT or your preferred crypto.</p>
        <p className="mt-4 font-bold text-white">
          Start sharing your link today and build passive crypto income! 🚀
        </p>
      </div>
    </div>
  );
}
