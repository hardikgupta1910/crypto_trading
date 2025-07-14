import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DotIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import TradingForm from "./TradingForm";
import StockChart from "../Home/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/State/Coin/Action";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Action";
import { existInWatchlist } from "@/utils/existInWatchlist";

const StockDetails = () => {
  const { coin, watchlist } = useSelector((store) => store);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      fetchCoinDetails({ coinId: id, jwt: localStorage.getItem("jwt") })
    );
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [id]);

  const handleAddToWatchlist = () => {
    const coinId = coin.coinDetails?.id;
    const jwt = localStorage.getItem("jwt");

    if (!coinId || !jwt) {
      console.warn("Missing coinId or jwt. Aborting.");
      return;
    }

    dispatch(addItemToWatchlist({ coinId, jwt }));
  };

  useEffect(() => {
    if (coin.coinDetails) {
      setIsInWatchlist(existInWatchlist(watchlist.items, coin.coinDetails));
    }
  }, [watchlist.items, coin.coinDetails]);

  return (
    <div className="p-5 mt-5">
      <div className="flex justify-between">
        <div className="flex gap-5 items-start">
          <div>
            <Avatar className="">
              <AvatarImage src={coin.coinDetails?.image.large} />
            </Avatar>
          </div>

          {/* Wrap BTC + price section vertically */}
          <div className="flex flex-col gap-1">
            {/* First Row: BTC and Bitcoin */}
            <div className="flex items-center gap-2">
              <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{coin.coinDetails?.name}</p>
            </div>

            {/* Second Row: Price and % */}
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                ${coin.coinDetails?.market_data.current_price.usd}
              </p>
              <p className="text-red-600">
                <span>
                  {" "}
                  {coin.coinDetails?.market_data.market_cap_change_24h}{" "}
                </span>
                <span>
                  ({" "}
                  {
                    coin.coinDetails?.market_data
                      .market_cap_change_percentage_24h
                  }
                  % )
                </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          {/* <Button
            onClick={handleAddToWatchlist}
            className={"bg-white text-black m-3"}
          >
            {existInWatchlist(watchlist.items, coin.coinDetails) ? (
              <BookmarkFilledIcon className="h-6 w-6" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </Button> */}
          <Button
            onClick={handleAddToWatchlist}
            className="bg-white text-black m-3"
          >
            {isInWatchlist ? (
              <BookmarkFilledIcon className="h-6 w-6" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-black" size="lg">
                Trade
              </Button>
            </DialogTrigger>
            <DialogContent
              aria-describedby="dialog-description"
              className="backdrop-blur-sm bg-black/30"
            >
              <DialogHeader>
                <DialogTitle>How much do you want to spend?</DialogTitle>
                <DialogDescription id="dialog-description">
                  Select the amount and confirm your crypto trade.
                </DialogDescription>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-10">
        <StockChart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetails;
