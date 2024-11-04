import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Container } from "react-bootstrap";
// import NavigationBar from "../components/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Navbar*/}
      {/* <NavigationBar /> */}

      <Container>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  ),
});
