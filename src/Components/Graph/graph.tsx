import axios from "axios";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./../../app/hooks"
import { setGraphData } from "../../app/Reducers/Watchlist/watchlist";
import "./graph.scss";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: "Weather forecast for next 5 days",
        },
    },
    scales: {
        x: {
            ticks: {
                display: false,
            },
            grid: {
                display: false,
                drawBorder: false,
            }
        },
        y: {
            ticks: {
                display: false,
            },
            grid: {
                display: false,
                drawBorder: true,
            }
        }
    }
};


interface City {
    location: string;
}

const Graph = ({ location }: City) => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=7b1125233d68b80c88073b75c2fa80c8`

    const [tempList, setTempList] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);


    const dispatch = useAppDispatch();
    const { list } = useAppSelector((state) => state.wishlistSlice);
    function HandleSearch() {
        axios.get(forecastUrl).then((response) => {
            dispatch(setGraphData(response.data.list));
            let templist: number[] = list?.map((item) => {
                return (Number(parseFloat((item.main.temp - 273).toString()).toFixed(2)))
            });
            setTempList(templist);
            let labelslist: string[] = list?.map((item) => {
                const date = new Date(item.dt * 1000);
                return (
                    date.toLocaleString("en-US", { day: "numeric" }) +
                    " " +
                    date.toLocaleString("en-US", { month: "long" })
                );
            });
            setLabels(labelslist);
            console.log("labels : ", labelslist);
        })


    }
    useEffect(() => {
        HandleSearch();
    }, []);



    return (
        <PlotGraph data-testid="graph" tempList={tempList} labels={labels} />

    )
}
export default Graph;
interface PlotData {
    tempList: number[],
    labels: string[]
}

const PlotGraph = ({ tempList, labels }: PlotData) => {
    return (
        <div className="graph-div" >
            <Line
                options={options}
                data={{
                    labels: labels?.map((item) => item),
                    datasets: [
                        {
                            fill: true,
                            data: tempList?.map((item) => item),
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "#7CC9F2",
                            tension: 0.4,
                            pointStyle: 'line',
                            pointBorderWidth: 0,
                            showLine: false,
                        },
                    ],
                }}
            />
        </div>
    )
}