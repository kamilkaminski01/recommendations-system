import { Button } from "@material-ui/core";

const BackButtonComponents = () => {
  const back = () => {
    window.history.back();
  };

  return (
    <div>
      <Button style={{ marginRight: "20px" }} onClick={back} variant="contained">
        Powrót
      </Button>
    </div>
  );
};

export default BackButtonComponents;
