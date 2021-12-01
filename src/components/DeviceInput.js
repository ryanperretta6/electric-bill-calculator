import { MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import "../App.css";

const DeviceInput = (props) => {
    const [name, setName] = useState(props.name !== "" ? props.name : "");
    const [voltage, setVoltage] = useState(props.voltage);
    const [usage, setUsage] = useState(props.usage);
    const [selectedUnit, setSelectedUnit] = useState("hr");
    const [selectedPer, setSelectedPer] = useState("day");

    return (
        <div className="device-input" id={`${props.num}`}>
            {/* <InputLabel id="device-name-label">Device Name</InputLabel> */}
            <TextField
                // labelId="device-input-label"
                className="device-name-txtfld"
                placeholder="Device Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <TextField
                className="device-voltage-txtfld"
                type="number"
                placeholder="Voltage"
                value={voltage}
                onChange={(event) => setVoltage(event.target.value)}
            />
            <Typography variant="body1" component="p">
                V
            </Typography>
            <TextField
                className="device-usage-txtfld"
                type="number"
                value={usage}
                placeholder="Usage"
                onChange={(event) => setUsage(event.target.value)}
            />
            <Select
                value={selectedUnit}
                onChange={(event) => setSelectedUnit(event.target.value)}
            >
                <MenuItem value="hr">{"Hr"}</MenuItem>
                <MenuItem value="min">{"Min"}</MenuItem>
            </Select>
            <Typography className="per" variant="body1" component="p">
                per
            </Typography>
            <Select
                value={selectedPer}
                onChange={(event) => setSelectedPer(event.target.value)}
            >
                <MenuItem value="day">{"Day"}</MenuItem>
                <MenuItem value="week">{"Week"}</MenuItem>
                <MenuItem value="month">{"Month"}</MenuItem>
            </Select>
        </div>
    );
};

export default DeviceInput;
