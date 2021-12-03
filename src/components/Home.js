// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Home = () => {
    return (
        <Link to="/calculate">
            <div className="home"></div>
        </Link>
    );
};

export default Home;
