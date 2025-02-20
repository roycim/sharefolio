import Image from "next/image";
import { useState } from "react";

export default function CryptoIcon({ name, symbol }) {
  const [imageError, setImageError] = useState(false);

  // CoinCap Image URL
  const imageUrl = `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

  return (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white text-sm font-semibold border border-gray-700">
      {!imageError ? (
        <Image
          src={imageUrl}
          alt={name}
          width={32}
          height={32}
          className="rounded-full"
          onError={() => setImageError(true)} // If image fails, show text
        />
      ) : (
        <span className="uppercase">{symbol.substring(0, 3)}</span> // Fallback initials
      )}
    </div>
  );
}
