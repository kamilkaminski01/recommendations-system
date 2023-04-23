import axios from "axios";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BackButtonComponents from "../components/BackButtonComponents";

const API_URL = "http://localhost:8000/api/";

export default function UserRank() {
  const [dataProvider, setDataProvider] = React.useState([]);

  React.useEffect(() => {
    axios.get(API_URL + "recommenders/ranking/").then((response) => {
      setDataProvider(response.data);
    });
  }, []);

  console.log(dataProvider);

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ font: "revert" }}>
                <TableCell>Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Credibility</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataProvider.map((dataProvider) => (
                <TableRow
                  key={dataProvider.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {dataProvider.first_name}
                  </TableCell>
                  <TableCell>{dataProvider.last_name}</TableCell>
                  <TableCell>{dataProvider.credibility}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: "5px" }}></div>
        <BackButtonComponents />
      </div>
    </section>
  );
}
