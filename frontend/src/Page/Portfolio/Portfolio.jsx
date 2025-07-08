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

const Portfolio = () => {
  return (
    <div className="max-h-[calc(100vh-90px)] overflow-y-auto p-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">ASSET</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Change%</TableHead>
            <TableHead className="text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
            <TableRow
              key={index}
              className="transition-all duration-100 hover:bg-white/10 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30 "
            >
              <TableCell className="font-medium p-2">
                <Avatar className="-z-50">
                  <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                </Avatar>
                <span>Bitcoin</span>
              </TableCell>
              <TableCell>BTC</TableCell>
              <TableCell> 32994054149</TableCell>
              <TableCell> 2141505608296</TableCell>
              <TableCell> 2.16913%</TableCell>
              <TableCell className="text-right">$107742</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
