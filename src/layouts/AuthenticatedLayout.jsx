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
  setOpenAvailabels,
  setOpenSpec,
  setOpenOptions,
  openAvailabels,
  openSpec,
  openOptions,
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
        setOpenAvailabels={setOpenAvailabels}
        setOpenSpec={setOpenSpec}
        setOpenOptions={setOpenOptions}
        openAvailabels={openAvailabels}
        openSpec={openSpec}
        openOptions={openOptions}
      >
        {children}
      </Sidebar>
    </>
  );
}
