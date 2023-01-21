import { React } from "react";

const FooterComponents = () => (
    <div style={{
        display: "flex",
        position: 'absolute', right: 0, bottom: 0, left: 0,
        justifyContent: "space-between",
        backgroundColor: "#212529",
        paddingLeft: "10px",
        paddingRight: "10px",

      }}>
      <div className="left-p" style={{display: "flex", flex: "1", justifyContent: "flex-start"}}>
        <p style={{color: "white", fontSize: "12px"}}></p>
      </div>
      <div className="center-p" style={{display: "flex", flex: "1", justifyContent: "center"}}>
        <p style={{color: "white", fontSize: "12px"}}><b>UWB RIDERS </b></p>
      </div>
      <div className="right-p" style={{display: "flex", flex: "1", justifyContent: "flex-end"}}>
        <p style={{color: "white", fontSize: "12px"}}><b>wersja Alpha</b></p>
      </div>
    </div>
);

export default FooterComponents;