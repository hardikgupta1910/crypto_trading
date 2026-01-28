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
import { useDispatch, useSelector } from "react-redux";
import { getALLOrdersForUser } from "@/State/Order/Action";

const Activity = () => {
  const dispatch = useDispatch();
  // const { orders } = useSelector((store) => store.order);
  const orders = useSelector((store) => store.order.orders);

  useEffect(() => {
    dispatch(getALLOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);
  console.log("orders on screen:", orders);

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
          {orders?.length > 0 ? (
            orders.map((item, index) => {
              const {
                orderItem,
                orderType,
                timestamp, // assuming you have a timestamp
              } = item;

              const { coin, buyPrice, sellPrice } = orderItem;

              // Format date & time
              const dateObj = new Date(timestamp);
              const date = dateObj.toLocaleDateString();
              const time = dateObj.toLocaleTimeString();

              return (
                <TableRow
                  key={index}
                  className="transition-all duration-100 hover:bg-white/10 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30"
                >
                  <TableCell>
                    <p>{date}</p>
                    <p className="text-gray-400">{time}</p>
                  </TableCell>

                  <TableCell className="font-medium flex gap-2 items-center">
                    <Avatar className="-z-50 w-6 h-6">
                      {/* <AvatarImage src={coin.image} /> */}
                      <AvatarImage src={coin?.image ?? "/fallback.png"} />
                    </Avatar>
                    <span>{coin.name}</span>
                  </TableCell>

                  <TableCell>${buyPrice}</TableCell>
                  <TableCell>${sellPrice}</TableCell>
                  <TableCell>{orderType}</TableCell>

                  <TableCell className="">
                    {coin.total_volume?.toLocaleString() ?? "N/A"}
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    ${(sellPrice - buyPrice).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-400">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
