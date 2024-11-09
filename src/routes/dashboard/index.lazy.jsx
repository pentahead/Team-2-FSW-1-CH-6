import { createLazyFileRoute } from "@tanstack/react-router";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import { useState } from "react";
import Protected from "../../components/Auth/Protected";
import ScreenCars from "../../components/Dashboard/ScreenCars";
import ScreenModels from "../../components/Dashboard/ScreenModels";
import ScreenManufactures from "../../components/Dashboard/ScreenManufactures";
import ScreenTransmission from "../../components/Dashboard/ScreenTransmission";
import ScreenType from "../../components/Dashboard/ScreenType";
<<<<<<< HEAD
import ScreenAvailables from "../../components/Dashboard/ScreenAvailables";
import ScreenSpecs from "../../components/Dashboard/ScreenSpecs";
import ScreenOptions from "../../components/Dashboard/ScreenOptions";
=======
>>>>>>> 71a0f30 (Finishing CRUD Car)
import ScreenAvailables from "../../components/Dashboard/ScreenAvailables";

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
  const [openAvailabels, setOpenAvailabels] = useState(false);
  const [openSpec, setOpenSpec] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
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
        setOpenAvailabels={setOpenAvailabels}
        setOpenSpec={setOpenSpec}
        setOpenOptions={setOpenOptions}
        openAvailabels={openAvailabels}
        openSpec={openSpec}
        openOptions={openOptions}
      >
        {openCars && <ScreenCars />}
        {openManufacture && <ScreenManufactures />}
        {openTransmission && <ScreenTransmission />}
        {openModel && <ScreenModels />}
        {openType && <ScreenType />}
        {openAvailabels && <ScreenAvailables />}
        {openSpec && <ScreenSpecs />}
        {openOptions && <ScreenOptions />}
        {openAvailabels && <ScreenAvailables />}
        {/* {openSpec && <ScreenSpec />} */}
        {/* {openOptions && <ScreenOptions />}  */}
      </AuthenticatedLayout>
    </>
  );
}
