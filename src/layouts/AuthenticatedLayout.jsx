/* eslint-disable react/prop-types */
import Sidebar from "../components/Sidebar";

export default function AuthenticatedLayout({
  openCars,
  setOpenCars,
  openTransmission,
  setOpenTransmission,
  openModel,
  setOpenModel,
  openManufacture,
  setOpenManufacture,
  openType,
  setOpenType,
  children,
}) {
  return (
    <>
      <Sidebar 
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
        {children}
      </Sidebar>
    </>
  );
}
