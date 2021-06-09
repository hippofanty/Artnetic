import { Container, Divider } from "@material-ui/core";
import VerticalTabs from "./Tabs";

export const Information = () => {
  return (<>
    <Container fixed maxWidth="md">
    <h1> Info</h1>
      <VerticalTabs />
    </Container>
    </>
  );
};
