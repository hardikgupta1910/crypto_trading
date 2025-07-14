//

import { Button } from "@/components/ui/button";
import { fetchMarketChart } from "@/State/Coin/Action";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    label: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series ",
    label: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series ",
    label: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series ",
    label: "1 Year",
    value: 365,
  },
];

const StockChart = ({ coinId }) => {
  console.log("Selected Coin ID:", coinId);

  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);

  const [activeLable, setActiveLable] = useState("1 Day");

  // Downsample the data here
  const downsample = (data, maxPoints = 200) => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const step = Math.ceil(data.length / maxPoints);
    return data.filter((_, i) => i % step === 0);
  };

  const downsampledData = downsample(coin.marketChart.data);
  const series = [
    {
      data: downsampledData,
    },
  ];

  console.log("Apex Series Data:", series);
  console.log("Market Chart Data:", coin.marketChart.data);

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 450,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
    },
    colors: ["#758AA2"],
    markers: {
      colors: ["#fff"],
      strokeColor: "#fff",
      size: 0,
      strokeWidth: 1,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#47535E",
      strokeDashArray: 4,
      show: true,
    },
  };

  const handleActiveLable = (value) => {
    setActiveLable(value);
  };

  useEffect(() => {
    const selected = timeSeries.find((item) => item.label === activeLable);
    console.log("Fetching market chart for", selected.value, "days");

    if (selected && coinId) {
      dispatch(
        fetchMarketChart({
          coinId,
          days: selected.value,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }
  }, [dispatch, coinId, activeLable]);

  return (
    <div>
      <div className="space-x-3 mb-3">
        {timeSeries.map((item) => (
          <Button
            key={item.label}
            variant={activeLable === item.label ? "" : "outline"}
            onClick={() => handleActiveLable(item.label)}
            className={`border text-sm ${
              activeLable === item.label
                ? "bg-white text-black"
                : "bg-transparent text-white border-white/30"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div id="chart-timelines">
        <ReactApexChart
          options={options}
          series={series}
          height={380}
          type="area"
        />
      </div>
    </div>
  );
};

export default StockChart;
