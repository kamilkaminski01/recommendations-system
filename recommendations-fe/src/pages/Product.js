import { useParams } from "react-router-dom";
import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Product(props) {
  const { userId } = useParams();

  const API_URL = "http://localhost:8000/api/";
  const [dataProvider, setDataProvider] = React.useState([]);
  const [isLoading, SetLoading] = React.useState(true);

  useEffect(() => {
    axios.get(API_URL + "shop/rewards/" + userId).then((response) => {
      setDataProvider(response.data);
      SetLoading(false);
    });
  }, [userId]);

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
              <img
                className="card-img-top mb-5 mb-md-0"
                src={dataProvider.reward_images[0].image}
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="small mb-1"></div>
              <h1 className="display-5 fw-bolder">{dataProvider.title}</h1>
              <div className="fs-5 mb-5">
                <span>{dataProvider.cost}$</span>
              </div>
              <p className="lead">{dataProvider.long_description}</p>
              <div className="d-flex">
                <button
                  className="btn btn-outline-dark flex-shrink-0 addToCart-btn"
                  value={1}
                  type="button">
                  <i className="bi-cart-fill me-1"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
