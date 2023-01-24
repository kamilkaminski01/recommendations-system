import { Button } from "@material-ui/core";

const BackButtonComponents = () => {
  const back = () => {
    window.history.back();
  };

  return (
    <div>
      <Button onClick={back} variant="contained">
        Powrót
      </Button>
    </div>
  );
};

export default BackButtonComponents;
