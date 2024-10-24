import { Container } from "@mui/material";
import CardLogin from "./components/Card/Login";


export default function Home() {
  return (
    <Container
      maxWidth={"xl"}
      style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CardLogin/>
    </Container>
  );
}
