import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CrossIcon, DotIcon, MessageCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinList } from "@/State/Coin/Action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchCoinChatResponse } from "@/utils/chatbotApi";

const Home = () => {
  const [category, setCategory] = React.useState("all");
  const [inputValue, setInputValue] = React.useState("");
  const [isBotRelease, setIsBotRelease] = React.useState(false);
  const { coin } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);
  const handleCategory = (value) => setCategory(value);
  const handleChange = (e) => setInputValue(e.target.value);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    dispatch(getTop50CoinList());
  }, [category]);

  useEffect(() => {
    dispatch(getCoinList(1));
  }, []);

  useEffect(() => {
    console.log("Coin List", coin.coinList);
  }, [coin.coinList]);

  useEffect(() => {
    console.log("Top 50 Coin List:", coin.getTop50CoinList);
  }, [coin.getTop50CoinList]);

  const [selectedCoinId, setSelectedCoinId] = React.useState("bitcoin");

  // 🔄 Get BTC coin dynamically from Redux data
  const selectedCoin =
    coin.top50?.find((c) => c.id === selectedCoinId) ||
    coin.coinList?.find((c) => c.id === selectedCoinId);

  //CHATBOT

  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi, I'm your crypto assistant!" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  // const handleSend = async () => {
  //   if (!userMessage.trim()) return;

  //   const userMsgObj = { type: "user", text: userMessage };
  //   setMessages((prev) => [...prev, userMsgObj]);
  //   setUserMessage("");

  //   try {
  //     const botResponse = await fetchCoinChatResponse(userMessage);
  //     const botMessage = {
  //       type: "bot",
  //       text: botResponse || "Sorry, I couldn't find relevant information.",
  //     };
  //     setMessages((prev) => [...prev, botMessage]);
  //   } catch (err) {
  //     const errorMsg = { type: "bot", text: "⚠️ Error fetching response" };
  //     setMessages((prev) => [...prev, errorMsg]);
  //     console.log(err);
  //   }
  // };

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const userMsgObj = { type: "user", text: userMessage };
    setMessages((prev) => [...prev, userMsgObj]);
    setUserMessage("");

    try {
      const botResponse = await fetchCoinChatResponse(userMessage);

      console.log("bot response:", botResponse);

      const botMessage = {
        type: "bot",
        text:
          botResponse?.text || "Sorry, I couldn't find relevant information.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMsg = { type: "bot", text: "⚠️ Error fetching response" };
      setMessages((prev) => [...prev, errorMsg]);
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative">
        <div className="lg:flex">
          <div className="lg:w-[50%] lg:border-r">
            <div className="p-3 flex items-center gap-4">
              {["all", "top50", "topGainer", "topDecliners"].map((type) => (
                <Button
                  key={type}
                  onClick={() => handleCategory(type)}
                  className={`rounded-full transition-all duration-100 hover:bg-white/20 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30 ${
                    category === type
                      ? "bg-white text-black"
                      : "border border-white/30 text-white"
                  }`}
                >
                  {type === "topGainer"
                    ? "Top Gainers"
                    : type === "topDecliners"
                    ? "Top Decliners"
                    : type === "top50"
                    ? "Top50"
                    : "All"}
                </Button>
              ))}
            </div>

            <AssetTable
              coin={category === "all" ? coin.coinList : coin.top50}
              category={category}
              onRowClick={setSelectedCoinId}
            />

            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          <div className="hidden lg:block lg:w-[50%] p-5 overflow-hidden">
            <StockChart coinId={selectedCoinId} />

            {selectedCoin ? (
              <div className="flex items-center gap-4 mt-4">
                <div>
                  <Avatar>
                    <AvatarImage src={selectedCoin.image} />
                  </Avatar>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p>{selectedCoin.symbol?.toUpperCase()}</p>
                    <DotIcon className="text-gray-400" />
                    <p className="text-gray-400">
                      {selectedCoin.name?.toUpperCase()}
                    </p>
                  </div>

                  <div className="flex items-end gap-2">
                    <p className="text-xl font-bold">
                      {selectedCoin.current_price}
                    </p>
                    <p
                      className={
                        selectedCoin.price_change_percentage_24h > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      <span>{selectedCoin.market_cap}</span>{" "}
                      <span>
                        ({selectedCoin.price_change_percentage_24h?.toFixed(2)}
                        %)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-gray-400">Loading BTC data...</p>
            )}
          </div>
        </div>

        <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
          {/* {isBotRelease && (
            <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-800">
              <div className="flex justify-between items-center border-b px-6 h-[12%]">
                <p> bot </p>
                <Button onClick={handleBotRelease} variant="ghost" size="icon">
                  <X />
                </Button>
              </div>

              <div className="flex flex-col overflow-y-auto gap-5 px-5 py-2 h-[88%] pb-28">
                <div className="self-start pb-5 w-auto">
                  <div className="justify-end self-end px-5 py-2 rounded-none bg-slate-700 w-auto">
                    <p>hi, Hardik</p>
                    <p> you can ask any question related to crypto</p>
                    <p>like , price, market cap e.t.c.</p>
                  </div>
                </div>

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`${
                      msg.type === "bot" ? "self-start" : "self-end"
                    } pb-5 w-auto`}
                  >
                    <div className="px-5 py-2 rounded bg-slate-700 w-auto max-w-[80%]">
                      <p className="text-white">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-[12%] bg-black z-39 relative flex items-center px-2 gap-2">
                <Input
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 border-none rounded-md h-[80%] bg-slate-700 text-white"
                  placeholder="Write your message..."
                />
                <Button
                  onClick={handleSend}
                  className="bg-blue-600 text-white hover:bg-blue-700 h-[80%] px-4"
                >
                  Send
                </Button>
              </div>
            </div>
          )} */}

          {isBotRelease && (
            <div className="rounded-xl w-[22rem] md:w-[26rem] h-[70vh] bg-gray-900 shadow-2xl border border-gray-700 flex flex-col">
              <div className="flex justify-between items-center border-b border-gray-700 px-4 py-3 bg-gray-800 text-white rounded-t-xl">
                <p className="font-semibold text-lg">💬 Crypto Assistant</p>
                <Button onClick={handleBotRelease} variant="ghost" size="icon">
                  <X className="text-gray-300 hover:text-white" />
                </Button>
              </div>

              <div className="flex flex-col overflow-y-auto gap-4 px-4 py-4 h-full max-h-[calc(100%-4.5rem)]">
                <div className="bg-gray-700 text-sm text-white px-4 py-2 rounded-lg max-w-[80%] self-start shadow">
                  <p>Hi, Hardik 👋</p>
                  <p>You can ask any question related to crypto</p>
                  <p>like price, market cap, etc.</p>
                </div>

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`${
                      msg.type === "bot" ? "self-start" : "self-end"
                    } max-w-[80%]`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg shadow text-sm ${
                        msg.type === "bot"
                          ? "bg-gray-700 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 px-3 py-3 bg-gray-800 flex items-center gap-2">
                <Input
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-gray-700 text-white placeholder-gray-400 border-none focus:outline-none rounded-md h-10"
                  placeholder="Write your message..."
                />

                <Button
                  onClick={handleSend}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-0"
                >
                  Send
                </Button>
              </div>
            </div>
          )}

          <div className="relative w-[10rem] cursor-pointer group">
            <Button
              onClick={handleBotRelease}
              className="w-full h-[3rem] gap-2 items-center bg-white"
            >
              <MessageCircle
                size={5}
                className="fill-[#1e293b] -rotate-90 stroke-none group-hover:fill-[#1a1a1a] scale-150"
              />
              <span className="text-2xl text-gray-800">bot</span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
