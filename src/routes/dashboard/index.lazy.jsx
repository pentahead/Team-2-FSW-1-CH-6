import { createLazyFileRoute } from "@tanstack/react-router";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import { useState } from "react";
import Protected from "../../components/Auth/Protected";
import ScreenCars from "../../components/Dashboard/ScreenCars";
import ScreenModels from "../../components/Dashboard/ScreenModels";
import ScreenManufactures from "../../components/Dashboard/ScreenManufactures";
import ScreenTransmission from "../../components/Dashboard/ScreenTransmission";
import ScreenType from "../../components/Dashboard/ScreenType";

export const Route = createLazyFileRoute("/dashboard/")({
  component: () => (
    <Protected roles={[1]}>
      <Dashboard />
    </Protected>
  ),
});

export default function Dashboard() {
  const [openCars, setOpenCars] = useState(true);
  const [openTransmission, setOpenTransmission] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openManufacture, setOpenManufacture] = useState(false);
  const [openType, setOpenType] = useState(false);
  return (
    <>
      <AuthenticatedLayout
        openCars={openCars}
        setOpenCars={setOpenCars}
        openTransmission={openTransmission}
        setOpenTransmission={setOpenTransmission}
        openModel={openModel}
        setOpenModel={setOpenModel}
        openManufacture={openManufacture}
        setOpenManufacture={setOpenManufacture}
        openType={openType}
        setOpenType={setOpenType}
      >
        {openCars && <ScreenCars />}
        {openTransmission && <ScreenTransmission />}
        {openModel && <ScreenModels />}
        {openManufacture && <ScreenManufactures />}
        {openType && <ScreenType />}
      </AuthenticatedLayout>
    </>
  );
}
