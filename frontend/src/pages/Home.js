import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom>
                Recommender Offers
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Something short and leading about the collection below—its contents, the creator,
                etc. Make it short and sweet, but not too short so folks don&apos;t simply skip over
                it entirely.
              </Typography>
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center"></Stack>
            </Container>
          </Box>
        </main>
      </ThemeProvider>
      <section className="feature_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Features Of Our System</h2>
            <p>Discover the elements of a system before you buy it</p>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="box">
                <div className="img-box">{/* <img src="images/f1.png" alt=""> */}</div>
                <div className="detail-box">
                  <h5>WATER RESISTANCE OF A WATCH</h5>
                  <p>
                    Sed ligula urna, sagittis sed tristique eu, ultricies id erat. Cras sodales nisi
                    condimentum, viverra lectus vel, pulvinar metus. Etiam mollis sollicitudin
                    pretium.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="box">
                <div className="img-box">{/* <img src="images/f2.png" alt=""> */}</div>
                <div className="detail-box">
                  <h5>Alerts &amp; Notifications</h5>
                  <p>
                    Nullam ut rhoncus est, sed dictum metus. Pellentesque tortor ligula, ultricies
                    sit amet ligula a, rhoncus maximus neque. Curabitur ac velit elementum tellus
                    aliquam malesuada vitae
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="box">
                <div className="img-box"></div>
                <div className="detail-box">
                  <h5>Messages</h5>
                  <p>
                    Nullam ut rhoncus est, sed dictum metus. Pellentesque tortor ligula, ultricies
                    sit amet ligula a, rhoncus maximus neque. Curabitur ac velit elementum tellus
                    aliquam malesuada vitae
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="box">
                <div className="img-box">{/* <img src="images/f4.png" alt=""> */}</div>
                <div className="detail-box">
                  <h5>Bluetooth</h5>
                  <p>
                    Nullam ut rhoncus est, sed dictum metus. Pellentesque tortor ligula, ultricies
                    sit amet ligula a, rhoncus maximus neque. Curabitur ac velit elementum tellus
                    aliquam malesuada vitaeI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
