import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'


const series = [
    {
        data: [[1748343830253, 109723.76011973],
        [1748347370216, 109553.041181842],
        [1748351149034, 109610.433323682],
        [1748354630506, 110129.167604078],
        [1748358111799, 109507.135694014],
        [1748361845218, 110099.576608111],
        [1748365409935, 110370.169472305],
        [1748369284268, 110318.490480906],
        [1748372626422, 109960.785226089],
        [1748376226234, 109888.527199036],
        [1748379823413, 109727.008615575],
        [1748383413736, 109037.675787297],
        [1748387032000, 109024.620933756],
        [1748390621087, 109068.456949014],
        [1748394238790, 109079.406493368],
        [1748397816433, 108886.384573542],
        [1748401288058, 108768.199882657],
        [1748405022405, 108884.025903837],
        [1748409555582, 108940.177345101],
        [1748416366361, 108862.369611423],
        [1748416625091, 108889.611947242],
        [1748420779714, 108882.048065651],
        [1748429175101, 108709.619898159],
        [1748431543765, 108863.607285888],
        [1748432961181, 108818.145479649],
        [1748433794682, 108890.91440583],
        [1748437404835, 108944.855671903],
        [1748441488776, 108356.078119861],
        [1748444594505, 107787.16425067],
        [1748448222908, 107269.42741891],
        [1748451805866, 107339.201754636],
        [1748455431275, 107616.723628537],
        [1748459030802, 107578.374809267],
        [1748462532162, 107224.666253652],
        [1748466208177, 107340.433345036],
        [1748469824412, 107515.844688279],
        [1748473400192, 107434.481069386],
        [1748477025349, 107830.098240192],
        [1748480592883, 108002.594744622],
        [1748484242802, 108122.512040664],
        [1748487782729, 108327.448662519],
        [1748491408273, 108079.342392431],
        [1748495028956, 107626.970851007],
        [1748498566218, 107725.520957438],
        [1748502206701, 107920.197474073],
        [1748506093183, 107896.137902207],
        [1748509406094, 108371.817600586],
        [1748513013344, 108510.601962719]]
    }
]

const options = {
    chart: {
        id: "area-datetime",
        type: "area",
        height: 450,
        zoom: {
            autoScaleYaxis: true
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        type: "datetime",
        tickAmount: 6
    },
    colors: ["#758AA2"],
    markers: {
        colors: ["#fff"],
        strokeColor: "#fff",
        size: 0,
        strokeWidth: 1,
        style: "hollow"

    },
    tooltip: {
        theme: "dark",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.8,
            opacityTo: 0.9,
            stops: [0, 100]
        }
    },
    grid: {
        borderColor: "#47535E",
        strokeDashArray: 4,
        show: true
    }
}

const StockChart = () => {

    const [activeLable, setActiveLable] = useState("1 Day");

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
        }
    ]


    const handleActiveLable = (value) => {
        setActiveLable(value)
    }

    return (

        <div>

            <div className='space-x-3'>
                {timeSeries.map((item) => <Button
                    key={item.label}
                    variant={activeLable === item.label ? "" : "outline"}
                    onClick={() => handleActiveLable(item.label)}

                    className={`border text-sm ${activeLable === item.label
                            ? 'bg-white text-black'
                            : 'bg-transparent text-white border-white/30'
                        }`}
                >
                    {item.label}
                </Button>
                )}
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
    )
}

export default StockChart