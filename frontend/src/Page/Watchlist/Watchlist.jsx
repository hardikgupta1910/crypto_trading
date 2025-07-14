import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Action";
import { store } from "@/State/Store";
import { existInWatchlist } from "@/utils/existInWatchlist";

const Watchlist = () => {
  const { watchlist } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleRemoveToWatchlist = (value) => {
    dispatch(
      addItemToWatchlist({ coinId: value, jwt: localStorage.getItem("jwt") })
    );
  };

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, []);

  return (
    <div className="max-h-[calc(100vh-90px)] overflow-y-auto p-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5">Watchlist</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">COIN</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP.</TableHead>
            <TableHead>HIGH24</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead className="text-right text-red-800">REMOVE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.items.map((item, index) => (
            <TableRow
              key={index}
              className="transition-all duration-100 hover:bg-white/10 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30 "
            >
              <TableCell className="font-medium p-2">
                <Avatar className="-z-50">
                  <AvatarImage src={item.image} />
                </Avatar>
                <span>{item.name}</span>
              </TableCell>
              <TableCell>{item.symbol.toUpperCase()}</TableCell>
              <TableCell> {item.total_volume}</TableCell>
              <TableCell> {item.market_cap}</TableCell>
              <TableCell> {item.price_change_percentage_24h}%</TableCell>
              <TableCell className="">${item.current_price}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="icon"
                  className="h-10 w-10"
                  variant="ghost"
                  onClick={() => handleRemoveToWatchlist(item.id)}
                >
                  <BookmarkFilledIcon className="w-6 h-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
