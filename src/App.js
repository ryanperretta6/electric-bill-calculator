import { useState } from "react";
import {
    Button,
    createTheme,
    Typography,
    ThemeProvider,
} from "@material-ui/core";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import Calculate from "./components/Calculate";
import "./App.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#D9F0FF",
        },
        secondary: {
            main: "#2F3061",
        },
        default: {
            main: "#5C7AFF",
        },
    },
});

function App() {
    const [active, setActive] = useState("home");

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <div className="header">
                        <Link
                            className="pageTitle"
                            to="/"
                            onClick={() => setActive("home")}
                        >
                            <Typography variant="h2" component="h1">
                                Electric Bill Calculator
                            </Typography>
                        </Link>
                        <div className="navButtons">
                            <Link to="/">
                                <Button
                                    className="navButton"
                                    variant="contained"
                                    color={
                                        active === "home"
                                            ? "primary"
                                            : "secondary"
                                    }
                                    onClick={() => setActive("home")}
                                >
                                    Home
                                </Button>
                            </Link>
                            <Link to="/calculate">
                                <Button
                                    className="navButton"
                                    variant="contained"
                                    color={
                                        active === "calculator"
                                            ? "primary"
                                            : "secondary"
                                    }
                                    onClick={() => setActive("calculator")}
                                >
                                    Calculator
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/calculate" element={<Calculate />} />
                        </Routes>
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
