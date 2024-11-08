import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/cars/")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /cars/!";
}
