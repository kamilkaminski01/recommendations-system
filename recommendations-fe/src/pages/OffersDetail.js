import { useParams } from "react-router-dom";
import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import RecomenderComponent from "../components/RecomenderComponent";
export default function OffersDetail(props) {
  const { productId } = useParams();

  const API_URL = "http://localhost:8000/api/";
  const [dataProvider, setDataProvider] = React.useState([]);
  const [isLoading, SetLoading] = React.useState(true);

  useEffect(() => {
    axios.get(API_URL + "advertisements/details/" + productId).then((response) => {
      setDataProvider(response.data);
      SetLoading(false);
    });
  }, [productId]);

  console.log(dataProvider);
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
        <div className="container product_data px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <div className="small mb-1"></div>
              <h1 className="display-5 fw-bolder">{dataProvider.title}</h1>
              <div className="fs-5 mb-5">
                <span>{dataProvider.reward_for_approval}ptk</span>
              </div>
              <p className="lead">{dataProvider.description}</p>
              <div className="d-flex">
                <span>Company: {dataProvider.company}</span>
              </div>
              <div className="mt-5">
                <RecomenderComponent />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
