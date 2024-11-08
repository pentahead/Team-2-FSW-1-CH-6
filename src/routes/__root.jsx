import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-bootstrap";
export const Route = createRootRoute({
  component: () => (
    <>
      {/* <NavigationBar /> */}
      <Outlet />
      <TanStackRouterDevtools />

      {/* React Toastify */}
      <ToastContainer theme="colored" />
    </>
  ),
});
