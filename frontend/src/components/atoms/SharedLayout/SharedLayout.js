import "./SharedLayout.scss";
import NavbarComponent from "components/organisms/Navbar/NavbarComponent";
import Footer from "components/organisms/Footer/Footer";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div className="shared-layout">
      <NavbarComponent />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SharedLayout;
