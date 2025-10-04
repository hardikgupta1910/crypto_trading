import { Button } from "@/components/ui/button";
import "./App.css";
import Home from "./Page/Home/Home";
import { Routes, Route } from "react-router-dom";
import Portfolio from "./Page/Portfolio/Portfolio";
import Activity from "./Page/Activity/Activity";
import Wallet from "./Page/Wallet/Wallet";
import Withdrawal from "./Page/Withdrawal/Withdrawal";
import PaymentDetails from "./Page/Payment Details/PaymentDetails";
import StockDetails from "./Page/StockDetails/StockDetails";
import NotFound from "./Page/Not Found/NotFound";
import Watchlist from "./Page/Watchlist/Watchlist";
import SearchCoin from "./Page/Search Coin/SearchCoin";
import Auth from "./Page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";
import Sidebar from "./Page/Navbar/Sidebar";
import Navbar from "./Page/Navbar/Navbar";
import Profile from "./Page/Profile/Profile";
import AdminRoute from "./components/Admin/AdminRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log("......auth", auth);

  useEffect(() => {
    //runs  everytime whem auth.jwt changes
    const storedJwt = localStorage.getItem("jwt");
    if (storedJwt && !auth.user) {
      dispatch(getUser(storedJwt)); // Fetch user from token
    }
  }, []);

  if (localStorage.getItem("jwt") && !auth.user) {
    // Optional: Show loading spinner while fetching user
    return <div className="text-white p-10">Loading...</div>;
  }
  //   dispatch(getUser(auth?.jwt || localStorage.getItem("jwt"))); //If auth is present then use it Otherwise get the JWT from localStorage.
  // }, [auth.jwt]);

  return (
    <>
      {auth.user ? ( // if auth.user is null show ahow auth else open acc
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchCoin />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
