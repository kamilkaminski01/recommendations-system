import axios from "axios";
import * as React from "react";
import BackButtonComponents from "../components/BackButtonComponents";

const API_URL = "http://localhost:8000/api/";

export default function UserRank() {
  const [dataProvider, setDataProvider] = React.useState([]);

  React.useEffect(() => {
    axios.get(API_URL + "users/ranking/").then((response) => {
      setDataProvider(response.data);
    });
  }, []);

  return (
    <>
      <div className="AppRank">
        <h1 style={{ marginBottom: "5%" }}>Ranking polecajacych</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Punkty Zaufania</th>
            </tr>
          </thead>
          <tbody>
            {dataProvider.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <BackButtonComponents />
        </div>
      </div>
    </>
  );
}
