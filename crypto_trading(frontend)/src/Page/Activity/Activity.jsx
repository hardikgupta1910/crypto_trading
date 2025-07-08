import React from "react";
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

const Activity = () => {
  return (
    <div className="max-h-[calc(100vh-90px)] overflow-y-auto p-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5">Activity</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date & Time</TableHead>
            <TableHead>Trading pair</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Sell Price</TableHead>
            <TableHead>Order type</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, 1, 1, 1.1, 1, 1].map((item, index) => (
            <TableRow
              key={index}
              className="transition-all duration-100 hover:bg-white/10 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30 "
            >
              <TableCell>
                <p>2025/06/02</p>
                <p className="text-gray-400">15:02:25</p>
              </TableCell>
              <TableCell className="font-medium p-2">
                <Avatar className="-z-50">
                  <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                </Avatar>
                <span>Bitcoin</span>
              </TableCell>
              <TableCell> 32994054149</TableCell>
              <TableCell> 2141505608296</TableCell>
              <TableCell> 2.16913%</TableCell>
              <TableCell className="">$107742</TableCell>
              <TableCell className="text-right">355</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
