import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import CryptoIcon from "./CryptoIcon";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function OriginCryptoTable({ cryptoData, loading }) {
  // Sort coins by market cap descending (largest first)
  const sortedData = cryptoData.slice().sort((a, b) => {
    return (b.market_cap_usd || 0) - (a.market_cap_usd || 0);
  });

  return (
    <div className="overflow-y-auto relative max-h-[650px] rounded-lg border border-border bg-card shadow-lg">
      <Table>
        {/* Make the entire header sticky */}
        <TableHeader className="sticky top-0 z-10 bg-popover/80 backdrop-blur-md">
          <TableRow>
            <TableHead className="px-4 py-4 text-left text-md text-muted-foreground font-semibold uppercase">
              #
            </TableHead>
            <TableHead className="px-4 py-4 text-left text-md text-muted-foreground font-semibold uppercase">
              Name
            </TableHead>
            <TableHead className="px-4 py-4 text-left text-md text-muted-foreground font-semibold uppercase">
              Price (USD)
            </TableHead>
            <TableHead className="px-4 py-4 text-left text-md text-muted-foreground font-semibold uppercase">
              24h Change
            </TableHead>
            <TableHead className="px-4 py-4 text-left text-md text-muted-foreground font-semibold uppercase">
              Market Cap
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-foreground py-6">
                Loading crypto data...
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((coin, index) => (
              <TableRow
                key={coin.slug}
                className="border-b border-border hover:bg-popover/20 transition-all duration-200 group"
              >
                <TableCell className="px-4 py-4 text-foreground font-semibold">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-4 text-foreground">
                  <div className="flex items-center gap-3">
                    <CryptoIcon name={coin.name} symbol={coin.symbol} size="small" />
                    <div className="flex items-center">
                      <span className="font-medium">{coin.name}</span>
                      <span className="ml-2 text-sm text-muted-foreground uppercase">
                        {coin.symbol}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 text-foreground font-semibold">
                  ${coin.price_usd?.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`px-4 py-4 font-semibold flex items-center ${
                    coin.change_percent_24_hr >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {coin.change_percent_24_hr?.toFixed(2)}%
                  {coin.change_percent_24_hr >= 0 ? (
                    <TrendingUp className="ml-1 h-4 w-4" />
                  ) : (
                    <TrendingDown className="ml-1 h-4 w-4" />
                  )}
                </TableCell>
                <TableCell className="px-4 py-4 text-foreground">
                  ${(coin.market_cap_usd / 1e9).toFixed(2)}B
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
