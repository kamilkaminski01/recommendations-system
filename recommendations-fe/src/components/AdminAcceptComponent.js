import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Button from "@mui/material/Button";

export default function AdminAcceptComponent() {
  const API_URL = "http://localhost:8000/api/";
  const [dataProvider, setDataProvider] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get(API_URL + "candidates/").then((response) => {
      setDataProvider(response.data);
      setLoading(false);
    });
  }, []);

  const handleAccept = (value) => {
    value.status = "confirmed";
    axios.put(API_URL + "candidates/update/" + value.id + "/", value).then(() => {
      window.location.reload(true);
    });
  };
  const handleDecline = (value) => {
    value.status = "canceled";
    axios.put(API_URL + "candidates/update/" + value.id + "/", value).then(() => {
      window.location.reload(true);
    });
  };

  if (isLoading) {
    return <>Loading...</>;
  }
  console.log(dataProvider);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Offert Name</TableCell>
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
                      onClick={(event) => handleAccept(dataProvider)}
                      variant="outlined">
                      Accept
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={(event) => handleDecline(dataProvider)}
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
