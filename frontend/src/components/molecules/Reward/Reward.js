import React, { useEffect, useState } from "react";
import "./Reward.scss";
import { generatePath, useParams } from "react-router-dom";
import axiosDefault from "setup/axios/defaultInstance";
import { ENDPOINTS } from "utils/consts";

export default function Reward() {
  const { id } = useParams();
  const [dataProvider, setDataProvider] = useState([]);

  useEffect(() => {
    axiosDefault.get(generatePath(ENDPOINTS.reward, { id })).then((response) => {
      setDataProvider(response.data);
    });
  }, [id]);
  console.log(dataProvider.reward_images);
  return (
    <div className="reward-container">
      <div className="container product_data px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={
                dataProvider.reward_images && dataProvider.reward_images.length > 0
                  ? dataProvider.reward_images[0].image
                  : "https://img.icons8.com/ios/500/null/help--v1.png"
              }
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1"></div>
            <h1 className="display-5 fw-bolder">{dataProvider.title}</h1>
            <div className="fs-5 mb-5">
              <span>Cost: {dataProvider.cost} points</span>
              <br />
              <span>Type: {dataProvider.type}</span>
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
    </div>
  );
}
