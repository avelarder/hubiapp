import React from "react";
import { useState } from "react";
import DropzoneComponent from "../../../components/common/DropzoneComponent";
import RoundedInputText from "../../../components/common/roundedInputText";
import Thumbnail from "../../../components/common/thumbnail";
import Footer from "../../../components/dashboard/footer";
import MainSection from "../../../components/dashboard/mainSection";
import NewLayout from "../../../components/newLayout";

function DocumentPage() {
  const pdfIcon = () => {
    return (
      <div className="bg-white">
        <svg
          width="94"
          height="118"
          viewBox="0 0 94 118"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M58.6667 0.666672H12C8.90582 0.666672 5.93835 1.89583 3.75043 4.08376C1.56251 6.27168 0.333344 9.23915 0.333344 12.3333V105.667C0.333344 108.761 1.56251 111.728 3.75043 113.916C5.93835 116.104 8.90582 117.333 12 117.333H82C85.0942 117.333 88.0617 116.104 90.2496 113.916C92.4375 111.728 93.6667 108.761 93.6667 105.667V35.6667L58.6667 0.666672ZM32.405 83.4417C30.6025 85.1333 27.9425 85.8917 24.845 85.8917C24.2444 85.8982 23.6441 85.8631 23.0483 85.7867V94.105H17.8333V71.145C20.1868 70.7939 22.5649 70.634 24.9442 70.6667C28.1933 70.6667 30.5033 71.285 32.0608 72.5275C33.5425 73.7058 34.5458 75.6367 34.5458 77.9117C34.54 80.1983 33.7817 82.1292 32.405 83.4417ZM54.6125 91.3458C52.1625 93.3817 48.435 94.35 43.8792 94.35C41.1492 94.35 39.2183 94.175 37.9058 94V71.1508C40.2602 70.8072 42.6375 70.6453 45.0167 70.6667C49.4325 70.6667 52.3025 71.46 54.5425 73.1517C56.9633 74.9483 58.48 77.8125 58.48 81.925C58.48 86.3758 56.8525 89.45 54.6125 91.3458ZM76.1667 75.1583H67.23V80.4725H75.5833V84.7542H67.23V94.1108H61.945V70.8417H76.1667V75.1583ZM58.6667 41.5H52.8333V12.3333L82 41.5H58.6667Z"
            fill="black"
          />
        </svg>
      </div>
    );
  };

  const filterOptions = [
    "Todo",
    "PDF",
    "Doc",
    "Jpg",
    "Excel",
    "PPT",
    "Otros",
    "Plantillas",
  ];

  const items = [
    <Thumbnail key={1} sourceId={"1"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={2} sourceId={"2"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={3} sourceId={"3"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={4} sourceId={"4"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={5} sourceId={"5"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={6} sourceId={"6"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={7} sourceId={"7"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={8} sourceId={"8"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={9} sourceId={"9"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={11} sourceId={"1"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={12} sourceId={"2"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={13} sourceId={"3"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={14} sourceId={"4"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={15} sourceId={"5"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={16} sourceId={"6"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={17} sourceId={"7"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={18} sourceId={"8"} icon={pdfIcon}></Thumbnail>,
    <Thumbnail key={19} sourceId={"9"} icon={pdfIcon}></Thumbnail>,
  ];

  const [filterText, setFilterText] = useState("");

  const [statusFilter, setStatusFilter] = useState({
    id: "ALL",
    text: "ESTADOS: Todos",
  });

  const [roleFilter, setRoleFilter] = useState({
    id: "ALL",
    text: "ROLES: Todos",
  });

  const handleStatusFilterChanged = (value) => {
    setStatusFilter(value);
  };
  const handleRoleFilterChanged = (value) => {
    setRoleFilter(value);
  };
  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            <div className="mt-2">
              <div className="flex justify-start flex-col h-screen">
                <DropzoneComponent></DropzoneComponent>
                <div className="mt-4">
                  <RoundedInputText
                    value={filterText}
                    onChange={(e) => setFilterText(e.currentTarget.value)}
                    placeholder="Ingrese el texto a buscar"
                  ></RoundedInputText>
                </div>
                <div className="flex h-full w-full flex-col ">
                  <div className="flex justify-around text-xs my-4">
                    {filterOptions.map((x) => (
                      <div
                        key={x}
                        className="flex cursor-pointer font-bold hover:text-purple-700 "
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap">{items.map((x) => x)}</div>
                </div>
              </div>
            </div>
          </div>
        </MainSection>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </NewLayout>
  );
}

export default DocumentPage;
