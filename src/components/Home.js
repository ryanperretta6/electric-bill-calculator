// eslint-disable-next-line no-unused-vars
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Home = () => {
    return (
        <Link to="/calculate" className="no-underline">
            <div className="home">
                <br />
                <Typography variant="h5" component="p" className="no-underline">
                    This calculator can be used to estimate your monthly
                    electrical bill with the voltage(V), current(A), and usage
                    of your appliances and devices. <br />{" "}
                </Typography>
                <br />
                <br />
                <div className="left-align">
                    <Typography id="instructions" variant="h5" component="h2">
                        Instructions:
                    </Typography>
                    <Typography variant="h6" component="p">
                        1. Enter your price for electricity per kilowatt-hour.
                        <br />
                        2. Select the currency your bill is in.
                        <br />
                        3. Enter a name for the device.
                        <br />
                        4. Enter the Voltage(V) and Current(A) for each device.
                        <br />
                        5. Enter the estimated usage time for each device and
                        select the correct units for each.
                        <br />
                        6. Click <em>add new device</em> to add another device
                        or <em>remove</em> to delete the last entry.
                        <br />
                        7. Finally, click the Calculate button to see the
                        results.
                    </Typography>
                </div>
                <br />
                <br />
                <br />
                <br />
                <Typography variant="h4" component="p">
                    <b>
                        <em>Click anywhere to continue</em>
                    </b>
                </Typography>
            </div>
        </Link>
    );
};

export default Home;
