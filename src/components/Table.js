import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";

const BreakdownTable = (props) => {
    const getUsageComponents = () => {
        let usageComponents = [];
        for (let i in props.usageValues) {
            usageComponents.push(
                <TableCell>
                    {props.usageValues[i]}
                    {props.unitValues[i]}/{props.perValues[i]}
                </TableCell>
            );
        }
        return usageComponents;
    };

    const getRows = () => {
        let rowComponents = [];
        for (let i in props.deviceNames) {
            rowComponents.push(
                <TableRow>
                    <TableCell>{props.deviceNames[i]}</TableCell>
                    <TableCell align="right">
                        {props.usageValues[i]} {props.unitValues[i]}/
                        {props.perValues[i]}
                    </TableCell>
                    <TableCell align="right">
                        {props.costValues[i].toFixed(2)}
                    </TableCell>
                </TableRow>
            );
        }
        return rowComponents;
    };

    return (
        <div className="table">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Device Name</b>
                            </TableCell>
                            <TableCell align="right">
                                <b>Usage</b>
                            </TableCell>
                            <TableCell align="right">
                                <b>Cost({props.currency})</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{getRows()}</TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default BreakdownTable;
