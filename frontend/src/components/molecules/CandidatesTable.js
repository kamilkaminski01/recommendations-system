import React, { useEffect, useState } from "react";
import { ENDPOINTS } from "utils/consts";
import axiosDefault from "setup/axios/defaultInstance";
import { generatePath } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

export default function CandidatesTable() {
  const [dataProvider, setDataProvider] = useState([]);

  useEffect(() => {
    axiosDefault.get(ENDPOINTS.candidates).then((response) => {
      setDataProvider(response.data);
    });
  }, []);

  const handleAccept = (value) => {
    value.status = "confirmed";
    axiosDefault.put(generatePath(ENDPOINTS.candidateUpdate, { id: value.id }), value).then(() => {
      window.location.reload(true);
    });
  };

  const handleDecline = (value) => {
    value.status = "canceled";
    axiosDefault.put(generatePath(ENDPOINTS.candidateUpdate, { id: value.id }), value).then(() => {
      window.location.reload(true);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Advertisement</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
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
              <TableCell>{dataProvider.email}</TableCell>
              <TableCell>{dataProvider.advertisement_name}</TableCell>
              <TableCell>{dataProvider.status}</TableCell>
              {dataProvider.status === "confirmed" || dataProvider.status === "canceled" ? (
                <></>
              ) : (
                <>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => handleAccept(dataProvider)}
                      variant="outlined">
                      Accept
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => handleDecline(dataProvider)}
                      variant="outlined">
                      Decline
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
