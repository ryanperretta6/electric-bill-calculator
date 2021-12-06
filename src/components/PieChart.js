import { Typography } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
    const createLegend = () => {
        let legendValues = [];
        for (let i in props.chartData.labels) {
            legendValues.push(
                <div className="legend-item">
                    <div
                        className="legend-color-box"
                        style={{
                            border: "black solid 1px",
                            backgroundColor:
                                props.chartData.datasets[0].backgroundColor[i],
                            width: "15px",
                            height: "15px",
                        }}
                    />
                    <p>{props.chartData.labels[i]}</p>
                </div>
            );
        }
        return legendValues;
    };

    return (
        <div className="pie-chart">
            <div id="legend">
                <Typography
                    variant="h6"
                    component="p"
                    style={{ textDecoration: "underline" }}
                >
                    Legend:
                </Typography>
                {createLegend()}
            </div>
            <Pie
                data={props.chartData}
                plugins={{
                    responsive: true,
                    title: {
                        display: true,
                        text: "Cost by Device",
                    },
                    legend: {
                        display: true,
                        position: "right",
                    },
                }}
            />
        </div>
    );
};

export default PieChart;
