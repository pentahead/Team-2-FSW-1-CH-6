import { createLazyFileRoute } from "@tanstack/react-router";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import { useState } from "react";
import Protected from "../../components/Auth/Protected";
import ScreenModels from "../../components/Dashboard/ScreenModels";
import ScreenManufactures from "../../components/Dashboard/ScreenManufactures";
import ScreenTransmission from "../../components/Dashboard/ScreenTransmission";
import ScreenType from "../../components/Dashboard/ScreenType";
<<<<<<< HEAD
import ScreenAvailables from "../../components/Dashboard/ScreenAvailables";
import ScreenSpecs from "../../components/Dashboard/ScreenSpecs";
import ScreenOptions from "../../components/Dashboard/ScreenOptions";
<<<<<<< HEAD
import ScreenCars from "../../components/dashboard/ScreenCars";
// import ScreenSpec from "../../components/Dashboard/ScreenSpec"; // Pastikan ini diimport
// import ScreenOptions from "../../components/Dashboard/ScreenOptions"; // Pastikan ini diimport
=======
=======
>>>>>>> 71a0f30 (Finishing CRUD Car)
>>>>>>> 149b28c (resolve conflict)

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
<<<<<<< HEAD
  const [openAvailables, setOpenAvailables] = useState(false); // Perbaiki nama state menjadi openAvailables
  const [openSpec, setOpenSpec] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

=======
>>>>>>> 149b28c (resolve conflict)
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
<<<<<<< HEAD
        setOpenAvailables={setOpenAvailables} // Pastikan ini diteruskan ke layout
        setOpenSpec={setOpenSpec}
        setOpenOptions={setOpenOptions}
        openAvailables={openAvailables} // Pastikan ini diteruskan ke layout
        openSpec={openSpec}
        openOptions={openOptions}
=======
>>>>>>> 149b28c (resolve conflict)
      >
        {openCars && <ScreenCars />}
        {openTransmission && <ScreenTransmission />}
        {openModel && <ScreenModels />}
        {openManufacture && <ScreenManufactures />}
        {openType && <ScreenType />}
        {openSpec && <ScreenSpecs />}
        {openOptions && <ScreenOptions />}
        {openAvailables && <ScreenAvailables />}
      </AuthenticatedLayout>
    </>
  );
}
