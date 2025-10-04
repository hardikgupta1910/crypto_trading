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
import { useNavigate } from "react-router-dom";

const AssetTable = ({ coin, category, onRowClick }) => {
  const navigate = useNavigate();
  console.log("AssetTable coin data:", coin);

  return (
    <div className="max-h-[calc(98vh-150px)] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">COIN</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP.</TableHead>
            <TableHead>HIGH24</TableHead>
            <TableHead>LOW24</TableHead>
            <TableHead>LAST 24 H</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(coin) &&
            coin.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => onRowClick(item.id)}
                className="transition-all duration-100 hover:bg-white/10 hover:backdrop-blur-md hover:ring-1 hover:ring-white/30 cursor-pointer"
              >
                <TableCell
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/market/${item.id}`);
                  }}
                  className="p-2"
                >
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.image} />
                    </Avatar>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold">
                        {item.name.split(" ").slice(0, 2).join(" ")}
                      </span>
                      {item.name.split(" ").length > 2 && (
                        <span className="text-sm font-semibold">
                          {item.name.split(" ").slice(2).join(" ")}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.total_volume}</TableCell>
                <TableCell>{item.market_cap}</TableCell>
                <TableCell>${item.high_24h}</TableCell>
                <TableCell>${item.low_24h}</TableCell>
                <TableCell>{item.price_change_percentage_24h}%</TableCell>
                <TableCell className="text-right">
                  ${item.current_price}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssetTable;
