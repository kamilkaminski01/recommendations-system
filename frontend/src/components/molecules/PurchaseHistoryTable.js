import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import axiosDefault from "setup/axios/defaultInstance";
import { ENDPOINTS } from "utils/consts";

export default function PurchaseHistoryTable() {
  const [dataProvider, setDataProvider] = React.useState([]);

  useEffect(() => {
    axiosDefault.get(ENDPOINTS.purchaseHistory).then((response) => {
      setDataProvider(response.data);
    });
  }, []);

  return dataProvider.length !== 0 ? (
    <div className="purchase-history-container">
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ font: "revert" }}>
                  <TableCell>Reward</TableCell>
                  <TableCell>Purchase Date</TableCell>
                  <TableCell>Points Spent</TableCell>
                  <TableCell>Shipping Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataProvider.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {data.reward.title}
                    </TableCell>
                    <TableCell>{data.purchase_date}</TableCell>
                    <TableCell>{data.points_spent}</TableCell>
                    <TableCell>{data.shipping_address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginTop: "5px" }}></div>
        </div>
      </section>
    </div>
  ) : (
    <></>
  );
}
