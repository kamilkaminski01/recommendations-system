import React, { useEffect, useState } from "react";
import "./Advertisement.scss";
import { generatePath, useParams } from "react-router-dom";
import axiosDefault from "setup/axios/defaultInstance";
import RecommendationForm from "components/molecules/RecommendationForm";
import { ENDPOINTS } from "utils/consts";

export default function Advertisement() {
  const { id } = useParams();
  const [dataProvider, setDataProvider] = useState([]);

  useEffect(() => {
    axiosDefault.get(generatePath(ENDPOINTS.advertisementDetails, { id })).then((response) => {
      setDataProvider(response.data);
    });
  }, [id]);

  return (
    <div className="advertisement-container">
      <div className="container product_data px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <div className="small mb-1"></div>
            <h1 className="display-5 fw-bolder">{dataProvider.title}</h1>
            <div className="fs-5 mb-5">
              <span>{dataProvider.reward_for_approval} points</span>
            </div>
            <p className="lead">{dataProvider.description}</p>
            <div className="d-flex">
              <span>Company: {dataProvider.company}</span>
            </div>
            <div className="mt-5">
              <RecommendationForm id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
