/* eslint-disable react/prop-types */
import Sidebar from "../components/Sidebar";

export default function AuthenticatedLayout({ children }) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
}
