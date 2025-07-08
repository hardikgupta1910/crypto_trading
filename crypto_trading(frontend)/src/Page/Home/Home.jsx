import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CrossIcon, DotIcon, MessageCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinList } from "@/State/Coin/Action";

const Home = () => {
  const [category, setCategory] = React.useState("all");
  const [inputValue, setInputValue] = React.useState("");
  const [isBotRelease, setIsBotRelease] = React.useState(false);
  const { coin } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      console.log(inputValue);
    }
    setInputValue("");
  };

  useEffect(() => {
    dispatch(getTop50CoinList());
  }, [category]);

  useEffect(() => {
    dispatch(getCoinList(1));
  }, []);
  useEffect(() => {
    console.log("Coin List", coin.coinList); // ✅ Debug
  }, [coin.coinList]);

  useEffect(() => {
    console.log("Top 50 Coin List:", coin.getTop50CoinList);
  }, [coin.getTop50CoinList]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative">
        <div className="lg:flex">
          <div className="lg:w-[50%] lg:border-r">
            <div className="p-3 flex items-center gap-4 ">
              <Button
                onClick={() => handleCategory("all")}
                className={`rounded-full transition-all duration-100
                   hover:bg-white/20 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30
                     ${
                       category === "all"
                         ? "bg-white text-black "
                         : "border  border-white/30 text-white"
                     }`}
              >
                {" "}
                All{" "}
              </Button>

              <Button
                onClick={() => handleCategory("top50")}
                className={`rounded-full transition-all duration-100
                   hover:bg-white/20 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30
                     ${
                       category === "top50"
                         ? "bg-white text-black"
                         : "border border-white/30 text-white"
                     }`}
              >
                Top50
              </Button>

              <Button
                onClick={() => handleCategory("topGainer")}
                className={`rounded-full transition-all duration-100
                   hover:bg-white/20 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30
                    ${
                      category === "topGainer"
                        ? "bg-white text-black"
                        : "border border-white/30 text-white"
                    }`}
              >
                Top Gainers
              </Button>

              <Button
                onClick={() => handleCategory("topDecliners")}
                className={`rounded-full transition-all duration-100
                     hover:bg-white/20 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30
                      ${
                        category === "topDecliners"
                          ? "bg-white text-black"
                          : "border border-white/30 text-white"
                      }`}
              >
                Top Decliners
              </Button>
            </div>
            <AssetTable
              coin={category == "all" ? coin.coinList : coin.top50}
              category={category}
            />
          </div>

          <div className="hidden lg:block lg:w-[50%] p-5 overflow-hidden">
            <StockChart />
            <div className="flex items-center gap-4 mt-4">
              <div>
                <Avatar>
                  <AvatarImage
                    src={
                      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                    }
                  />
                </Avatar>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p>BTC</p>
                  <DotIcon className="text-gray-400" />
                  <p className="text-gray-400">BITCOIN</p>
                </div>

                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold">107742</p>
                  <p className="text-green-600">
                    <span>44310245979</span>
                    <span>(+2.11283%)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
          {isBotRelease && (
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

                {[1, 1, 1, 1].map((item, i) => (
                  <div
                    key={i}
                    className={`${
                      i % 2 == 0 ? "self-start" : "self-end"
                    } pb-5 w-auto`}
                  >
                    {i % 2 == 0 ? (
                      <div className="justify-end self-end px-5 py-2 rounded-none bg-slate-700 w-auto">
                        <p>prompt who are you</p>
                      </div>
                    ) : (
                      <div className="justify-end self-end px-5 py-2 rounded-none bg-slate-700 w-auto">
                        <p>ans hi, Hardik</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="h-[12%]  bg-black z-39 relative">
                <Input
                  className="w-full h-full order-none outline-none rounded-none"
                  placeholder="Write prompt"
                  onChange={handleChange}
                  value={inputValue}
                  onKeyPress={handleKeyPress}
                />
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
