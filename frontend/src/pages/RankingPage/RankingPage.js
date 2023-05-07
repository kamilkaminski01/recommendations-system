import React, { useEffect } from "react";
import "./RankingPage.scss";
import axiosDefault from "setup/axios/defaultInstance";
import { ENDPOINTS } from "utils/consts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function RankingPage() {
  const [dataProvider, setDataProvider] = React.useState([]);

  useEffect(() => {
    axiosDefault.get(ENDPOINTS.ranking).then((response) => {
      setDataProvider(response.data);
    });
  }, []);

  return (
    <div className="ranking-container">
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
        </div>
      </section>
    </div>
  );
}
