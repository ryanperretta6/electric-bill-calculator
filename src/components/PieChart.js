import { Typography } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
    const createLegend = () => {
        let legendValues = [];
        for (let i in props.chartData.labels) {
            legendValues.push(
                <div
                    className="legend-item"
                    style={{ display: "inline-block" }}
                >
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
            if (i % 2 !== 0) {
                legendValues.push(<br />);
            }
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
            <Typography variant="h6" component="h3" id="title">
                Cost Breakdown by Appliance
            </Typography>
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
