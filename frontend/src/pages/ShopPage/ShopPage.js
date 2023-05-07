import React, { useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import "./ShopPage.scss";
import axiosDefault from "setup/axios/defaultInstance";
import RedirectButton from "components/atoms/RedirectButton";
import Reward from "components/molecules/Reward/Reward";
import { ENDPOINTS, PATHS } from "utils/consts";

export default function ShopPage() {
  const [dataProvider, setDataProvider] = useState([]);

  useEffect(() => {
    axiosDefault.get(ENDPOINTS.rewards).then((response) => {
      setDataProvider(response.data);
    });
  }, []);

  return (
    <div className="shop-container">
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {dataProvider.map((x, i) => (
              <div className="col mb-5" key={i}>
                <div className="card h-200 bg-image hover-zoom">
                  <img
                    className="card-img-top w-100"
                    src={x.image ? x.image : "https://img.icons8.com/ios/300/null/help--v1.png"}
                    width="300"
                    height="300"
                    alt=""
                  />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{x.title}</h5>
                      {x.short_description}
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <RedirectButton
                        url={generatePath(PATHS.reward, { id: x.id })}
                        component={<Reward />}
                        name="Open"
                        state={{ id: "1" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
