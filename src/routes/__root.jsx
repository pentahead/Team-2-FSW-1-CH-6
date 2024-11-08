import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import NavigationBar from "../components/Navbar";
import 'bootstrap-icons/font/bootstrap-icons.css';
export const Route = createRootRoute({
  component: () => (
    <>
      {/* <NavigationBar /> */}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
