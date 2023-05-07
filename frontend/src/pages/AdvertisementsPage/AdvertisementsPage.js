import { useEffect, useState } from "react";
import "./AdvertisementsPage.scss";
import RedirectButton from "components/atoms/RedirectButton";
import Advertisement from "components/molecules/Advertisement/Advertisement";
import axiosDefault from "setup/axios/authInstance";
import { ENDPOINTS, PATHS } from "utils/consts";
import { generatePath } from "react-router-dom";

export default function AdvertisementsPage() {
  const [dataProvider, setDataProvider] = useState([]);

  useEffect(() => {
    axiosDefault.get(ENDPOINTS.advertisements).then((response) => {
      setDataProvider(response.data);
    });
  }, []);

  return (
    <div className="advertisements-container">
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
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
                    <p className="text-center">{x.type}</p>
                    <div className="text-center">
                      <RedirectButton
                        url={generatePath(PATHS.advertisement, { id: x.id })}
                        component={<Advertisement />}
                        name="Open"
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
