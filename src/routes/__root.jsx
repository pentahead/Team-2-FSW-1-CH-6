import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Container } from "react-bootstrap";
import NavigationBar from "./components/Navbar";
// import NavigationBar from "../components/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <NavigationBar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
