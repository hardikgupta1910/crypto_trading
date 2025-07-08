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

const Withdrawal = () => {
  return (
    <div className="max-h-[calc(100vh-90px)] overflow-y-auto p-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Date </TableHead>
            <TableHead> Method</TableHead>
            <TableHead>Amount </TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, 1, 1, 1.1, 1, 1].map((item, index) => (
            <TableRow
              key={index}
              className="transition-all duration-100 hover:bg-white/10 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30 "
            >
              <TableCell>
                <p>2025/06/02 at 14:15</p>
              </TableCell>
              <TableCell> Bank</TableCell>
              <TableCell> 5154549</TableCell>
              <TableCell className="text-right"> 08296</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;
