import logo from "./face.jpg";

export default function AboutUs() {
  return (
    <>
      <div class="sub-page">
        <section class="about_section layout_padding">
          <div class="container ">
            <div class="row">
              <div class="col-md-6 col-lg-5 ">
                <div class="img-box">
                  <img src={logo} alt="Man showing Ok "/>
                </div>
              </div>
              <div class="col-md-6 col-lg-7">
                <div class="detail-box">
                  <div class="heading_container">
                    <h2>
                      The state-of-the-art recommendation system at your hand
                    </h2>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam dignissim arcu ut tincidunt semper. Cras facilisis
                    libero quam, non condimentum orci pharetra ut. Nulla
                    placerat lorem eget est posuere scelerisque. Maecenas
                    iaculis purus in vehicula euismod. Etiam volutpat tempor
                    lacus vel scelerisque. Vestibulum nec pharetra augue. Cras
                    sit amet fermentum mauris, id convallis tellus. In lacinia
                    dictum urna, non sollicitudin urna consequat id.
                    Pellentesque dui leo, egestas sit amet justo ut, eleifend
                    ullamcorper libero. Curabitur purus tellus, gravida quis
                    tincidunt et, congue id lectus. Fusce finibus, enim eu
                    varius volutpat, sapien leo aliquet dolor, eu venenatis dui
                    augue non nibh. Vestibulum cursus sem eget sapien vestibulum
                    iaculis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
