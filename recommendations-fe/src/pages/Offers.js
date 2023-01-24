import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import RedirectButton from "../components/RedirectButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import OffersDetail from "./OffersDetail";

export default function Offers() {
  const API_URL = "http://localhost:8000/api/";
  const [dataProvider, setDataProvider] = React.useState([]);
  const [isLoading, SetLoading] = React.useState(true);

  useEffect(() => {
    axios.get(API_URL + "advertisements/").then((response) => {
      setDataProvider(response.data);
      SetLoading(false);
    });
  }, []);

  console.log(`data: ${JSON.stringify(dataProvider)}`);
  if (isLoading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
  return (
    <>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <h1>Lista rekomendacji</h1>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {dataProvider.map((x, i) => (
              <div className="col mb-5" key={i}>
                <div className="card h-200 bg-image hover-zoom">
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{x.title}</h5>
                      {x.company}
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      {" "}
                      <RedirectButton
                        url={"/advertisements/" + x.id}
                        component={<OffersDetail />}
                        name="Pokaż"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
