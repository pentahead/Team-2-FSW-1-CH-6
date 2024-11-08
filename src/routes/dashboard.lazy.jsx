import { createLazyFileRoute } from "@tanstack/react-router";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});

export default function Dashboard() {
  return (
    <>
      <AuthenticatedLayout></AuthenticatedLayout>
    </>
  );
}
