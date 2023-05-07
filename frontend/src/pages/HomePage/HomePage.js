import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-title">
        <h1>Recommendations System</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="heading-container">
        <h2>Features of our system</h2>
      </div>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <div className="box">
            <div className="img-box">
              <img src="https://picsum.photos/200" />
            </div>
            <div className="detail-box">
              <h5>Refer your friends and family</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="box">
            <div className="img-box">
              <img src="https://picsum.photos/200" />
            </div>
            <div className="detail-box">
              <h5>Collect points for referrals</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="box">
            <div className="img-box">
              <img src="https://picsum.photos/200" />
            </div>
            <div className="detail-box">
              <h5>Browse upon hundreds of rewards</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="box">
            <div className="img-box">
              <img src="https://picsum.photos/200" />
            </div>
            <div className="detail-box">
              <h5>Choose and receive rewards</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
