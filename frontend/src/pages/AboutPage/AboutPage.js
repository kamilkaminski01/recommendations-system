import "./AboutPage.scss";

export default function AboutPage() {
  return (
    <div className="about-container">
      <div className="row">
        <div className="col-md-6 col-lg-5 ">
          <img src="https://picsum.photos/400" alt="photo" />
        </div>
        <div className="col-md-6 col-lg-7">
          <div className="detail-box">
            <div className="heading_container">
              <h2>State-of-the-art recommendation system</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dignissim arcu ut
              tincidunt semper. Cras facilisis libero quam, non condimentum orci pharetra ut. Nulla
              placerat lorem eget est posuere scelerisque. Maecenas iaculis purus in vehicula
              euismod. Etiam volutpat tempor lacus vel scelerisque. Vestibulum nec pharetra augue.
              Cras sit amet fermentum mauris, id convallis tellus. In lacinia dictum urna, non
              sollicitudin urna consequat id. Pellentesque dui leo, egestas sit amet justo ut,
              eleifend ullamcorper libero. Curabitur purus tellus, gravida quis tincidunt et, congue
              id lectus. Fusce finibus, enim eu varius volutpat, sapien leo aliquet dolor, eu
              venenatis dui augue non nibh. Vestibulum cursus sem eget sapien vestibulum iaculis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
