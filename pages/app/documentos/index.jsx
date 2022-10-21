import { StarIcon, TagIcon, TrashIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";
import { useState } from "react";
import DropzoneComponent from "../../../components/common/DropzoneComponent";
import OffCanvas from "../../../components/common/OffCanvas";
import RoundedInputText from "../../../components/common/roundedInputText";
import TableSection from "../../../components/common/table-section";
import TagModal from "../../../components/common/tag-modal";
import Thumbnail from "../../../components/common/thumbnail";
import ContextualMenu from "../../../components/dashboard/contextualMenu";
import Footer from "../../../components/dashboard/footer";
import MainSection from "../../../components/dashboard/mainSection";
import NewLayout from "../../../components/newLayout";
import { useLocationContext } from "../../../locationProvider";
import Firebase from "../../../firebase";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import { useAuth } from "../../../authUserProvider";

const PdfIcon = () => (
  <svg
    width="94"
    height="118"
    viewBox="0 0 94 118"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M58.6667 0.666672H12C8.90582 0.666672 5.93835 1.89583 3.75043 4.08376C1.56251 6.27168 0.333344 9.23915 0.333344 12.3333V105.667C0.333344 108.761 1.56251 111.728 3.75043 113.916C5.93835 116.104 8.90582 117.333 12 117.333H82C85.0942 117.333 88.0617 116.104 90.2496 113.916C92.4375 111.728 93.6667 108.761 93.6667 105.667V35.6667L58.6667 0.666672ZM32.405 83.4417C30.6025 85.1333 27.9425 85.8917 24.845 85.8917C24.2444 85.8982 23.6441 85.8631 23.0483 85.7867V94.105H17.8333V71.145C20.1868 70.7939 22.5649 70.634 24.9442 70.6667C28.1933 70.6667 30.5033 71.285 32.0608 72.5275C33.5425 73.7058 34.5458 75.6367 34.5458 77.9117C34.54 80.1983 33.7817 82.1292 32.405 83.4417ZM54.6125 91.3458C52.1625 93.3817 48.435 94.35 43.8792 94.35C41.1492 94.35 39.2183 94.175 37.9058 94V71.1508C40.2602 70.8072 42.6375 70.6453 45.0167 70.6667C49.4325 70.6667 52.3025 71.46 54.5425 73.1517C56.9633 74.9483 58.48 77.8125 58.48 81.925C58.48 86.3758 56.8525 89.45 54.6125 91.3458ZM76.1667 75.1583H67.23V80.4725H75.5833V84.7542H67.23V94.1108H61.945V70.8417H76.1667V75.1583ZM58.6667 41.5H52.8333V12.3333L82 41.5H58.6667Z"
      fill="rgba(109, 40, 217)"
    />
  </svg>
);

const DocIcon = () => (
  <svg
    width="94"
    height="118"
    viewBox="0 0 94 118"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M58.6667 0.666672H12C8.9058 0.666672 5.93834 1.89583 3.75042 4.08376C1.56249 6.27168 0.333328 9.23915 0.333328 12.3333V105.667C0.333328 108.761 1.56249 111.728 3.75042 113.916C5.93834 116.104 8.9058 117.333 12 117.333H82C85.0942 117.333 88.0616 116.104 90.2496 113.916C92.4375 111.728 93.6667 108.761 93.6667 105.667V35.6667L58.6667 0.666672ZM30.4042 90.815C27.9192 92.88 24.145 93.8542 19.5308 93.8542C16.76 93.8542 14.8058 93.6792 13.4758 93.5042V70.34C15.8615 69.9965 18.2698 69.8346 20.68 69.8558C25.16 69.8558 28.065 70.6608 30.3342 72.3758C32.7842 74.1958 34.3242 77.1008 34.3242 81.2542C34.3242 85.775 32.6792 88.89 30.4042 90.815ZM47.8458 94C40.8458 94 36.7567 88.715 36.7567 81.995C36.7567 74.9308 41.2658 69.6517 48.2308 69.6517C55.47 69.6517 59.425 75.0708 59.425 81.5808C59.4192 89.31 54.7292 94 47.8458 94ZM75 89.555C76.6042 89.555 78.3892 89.1992 79.445 88.785L80.25 92.9442C79.27 93.4342 77.065 93.9592 74.2008 93.9592C66.0517 93.9592 61.8517 88.89 61.8517 82.17C61.8517 74.1258 67.5858 69.6517 74.7258 69.6517C77.4908 69.6517 79.585 70.2117 80.53 70.7017L79.445 74.9367C78.0248 74.3497 76.5017 74.0522 74.965 74.0617C70.73 74.0617 67.44 76.6167 67.44 81.8667C67.44 86.5858 70.24 89.555 75 89.555ZM58.6667 41.5H52.8333V12.3333L82 41.5H58.6667Z"
      fill="rgba(109, 40, 217)"
    />
  </svg>
);

const PptIcon = () => (
  <svg
    width="91"
    height="119"
    viewBox="0 0 91 119"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M90.5 118.562H0.5V0.4375H62.375L90.5 28.5625V118.562Z"
      fill="rgba(109, 40, 217)"
    />
    <path
      d="M40.0212 78.2256V90.4375H31.3447V54.4459H45.7053C48.4587 54.4459 50.8944 54.9522 53.0094 55.9675C55.13 56.9772 56.7669 58.4228 57.9312 60.2903C59.09 62.1634 59.6722 64.2841 59.6722 66.6578C59.6722 70.1678 58.415 72.9747 55.9034 75.0728C53.3862 77.1766 49.9409 78.2256 45.5562 78.2256H40.0212ZM40.0212 71.5263H45.7053C47.3872 71.5263 48.6697 71.1072 49.5472 70.2663C50.4303 69.4253 50.8719 68.2384 50.8719 66.7056C50.8719 65.0238 50.4191 63.6822 49.5134 62.6753C48.6078 61.6684 47.3703 61.1594 45.8066 61.1425H40.0212V71.5263Z"
      fill="white"
    />
  </svg>
);
const ExcelIcon = () => (
  <svg
    width="122"
    height="124"
    viewBox="0 0 122 124"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M71.455 0.0774985L2.015 13.2525C0.842813 13.4753 0 14.5409 0 15.7325V108.267C0 109.459 0.842813 110.525 2.015 110.747L71.455 123.922C71.61 123.952 71.765 124 71.92 124C72.4916 124 73.0244 123.826 73.47 123.457C74.0416 122.983 74.4 122.256 74.4 121.52V2.48C74.4 1.74375 74.0416 1.01719 73.47 0.542498C72.8984 0.0678111 72.1816 -0.0581265 71.455 0.0774985ZM79.36 14.88V32.24H84.32V37.2H79.36V49.6H84.32V54.56H79.36V66.96H84.32V71.92H79.36V86.8H84.32V91.76H79.36V109.12H116.56C119.292 109.12 121.52 106.892 121.52 104.16V19.84C121.52 17.1081 119.292 14.88 116.56 14.88H79.36ZM89.28 32.24H109.12V37.2H89.28V32.24ZM16.585 38.905H29.295L35.96 52.7775C36.4831 53.8722 36.9481 55.2187 37.355 56.73H37.4325C37.6941 55.8291 38.1978 54.4147 38.905 52.6225L46.2675 38.905H57.8925L44.02 61.845L58.28 85.25H45.9575L37.8975 70.1375C37.5972 69.5756 37.2872 68.5391 36.9675 67.0375H36.89C36.735 67.7447 36.3669 68.8491 35.805 70.2925L27.745 85.25H15.345L30.1475 62.0775L16.585 38.905ZM89.28 49.6H109.12V54.56H89.28V49.6ZM89.28 66.96H109.12V71.92H89.28V66.96ZM89.28 86.8H109.12V91.76H89.28V86.8Z"
      fill="rgba(109, 40, 217)"
    />
  </svg>
);

const IconContainer = ({
  sourceId,
  isSelected,
  documentName,
  featuredBy,
  icon,
  isFavorited,
  onMouseOver,
  onClick,
  onDocumentTag,
  currentUser,
}) => {
  const db = Firebase.default.firestore();

  const handleDocumentDelete = () => {
    db.collection("Documents").doc(sourceId).set({
      isRemoved: true,
      updatedOnUTC: new Date().toISOString(),
    });
  };

  const handleDocumentFavorite = () => {
    if (isFavorited) {
      db.collection("Documents")
        .doc(sourceId)
        .update({
          featuredBy: featuredBy.filter((x) => x !== currentUser),
          updatedOnUTC: new Date().toISOString(),
        });
    } else {
      db.collection("Documents")
        .doc(sourceId)
        .update({
          featuredBy: [...featuredBy, currentUser],
          updatedOnUTC: new Date().toISOString(),
        });
    }
  };

  const handleMouseOver = (e) => {
    onMouseOver();
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-center text-center rounded-lg p-2",
        {
          "bg-gray-50": isSelected,
        }
      )}
      onMouseOver={handleMouseOver}
    >
      <Thumbnail
        sourceId={sourceId}
        documentName={documentName}
        icon={icon}
      ></Thumbnail>
      <div className="flex justify-center mt-2">
        <StarIcon
          className={classNames({
            "text-gray-300 w-6 h-6 cursor-pointer": true,
            "text-yellow-400 fill-current": isFavorited,
          })}
          onClick={handleDocumentFavorite}
        ></StarIcon>

        <TagIcon
          className="text-gray-300 w-6 h-6  cursor-pointer"
          onClick={onDocumentTag}
        ></TagIcon>
        <TrashIcon
          className="text-gray-300 w-6 h-6  cursor-pointer"
          onClick={handleDocumentDelete}
        ></TrashIcon>
      </div>
    </div>
  );
};

function DocumentPage() {
  const initDocuments = {
    headers: [
      {
        source: "name",
        columnName: "Nombre",
        isLink: true,
        path: (id) => `documentos/${id}/detalle`,
        onClick: (e, id) => {
          e.preventDefault();
          handleShowOffCanvas(id);
        },
        isDate: false,
      },
      {
        source: "updatedOn",
        columnName: "Fecha última modificación",
        isDate: false,
      },
      { source: "type", columnName: "Tipo", isDate: false },
    ],
    data: [],
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

  const DEFAULT_LIMIT = 10;

  const db = Firebase.default.firestore();
  const { locationSelected } = useLocationContext();
  const { authUser, loading } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [orderField, setOrderField] = useState("name");
  const [isOrderDirectionDesc, setOrderDirection] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_LIMIT);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [filterText, setFilterText] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [filterByFileType, setFilterByFileType] = useState("Todos");

  const [statusFilter, setStatusFilter] = useState({
    id: "ALL",
    text: "ESTADOS: Todos",
  });

  const [roleFilter, setRoleFilter] = useState({
    id: "ALL",
    text: "ROLES: Todos",
  });

  const queryDocuments = db
    .collection("Documents")
    .where("location", "==", locationSelected.id ?? "");

  const {
    data: localDocuments,
    status: loadingDocuments,
    error,
  } = useFirestoreQuery(queryDocuments);

  const handleDocumentFiltering = (filter) => {
    setFilterText(filter);
  };

  const handleShowOffCanvas = (rowId) => {
    setSelectedDocument(documents.data.find((x) => x.id === rowId));
    setShowOffCanvas(true);
  };

  const handleStatusFilterChanged = (value) => {
    setStatusFilter(value);
  };
  const handleRoleFilterChanged = (value) => {
    setRoleFilter(value);
  };

  const handleShowMoreNewsClicked = () => {
    setRowsPerPage((prev) => prev + currentLimit);
  };

  const onTagModalConfirmation = () => {};
  const handleChangeLimit = (limit) => {
    setCurrentLimit(limit);
    setRowsPerPage(limit);
  };

  const handleOrderByFieldChanged = (field) => {
    let localDirection;
    if (field === orderField) localDirection = !isOrderDirectionDesc;
    else {
      setOrderField(field);
      localDirection = false;
    }
    setOrderDirection(localDirection);
  };

  const getIcon = (type) => {
    const types = [
      { filter: "PDF", type: "application/pdf", icon: PdfIcon() },
      { filter: "JPG", type: "image/jpeg", icon: PdfIcon() },
      {
        filter: "DOC",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        icon: DocIcon(),
      },
      {
        filter: "PPT",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        icon: PptIcon(),
      },
      {
        filter: "EXCEL",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        icon: ExcelIcon(),
      },
      {
        filter: "ZIP",
        type: "application/x-zip-compressed",
        icon: ExcelIcon(),
      },
    ];

    return types.find((x) => x.type === type).icon;
  };

  if (loadingDocuments === "loading") {
    return (
      <div className="flex justify-center items-center w-full bg-purple-100 h-10 text-xs text-purple-500">
        Los datos se están cargando, un momento por favor.
      </div>
    );
  }

  if (loadingDocuments === "error") {
    return `Error: ${error.message}`;
  }

  const addTagToDocument = (documentId, tag) => {
    db.collection("Documents")
      .doc(documentId)
      .update({
        tags: [...selectedDocument.tags, tag],
        updatedOnUTC: new Date().toISOString(),
      });
  };
  const removeTagFromDocument = (documentId, tag) => {
    const selectedTags = selectedDocument.tags.filter((x) => x !== tag);
    db.collection("Documents").doc(documentId).update({
      tags: selectedTags,
      updatedOnUTC: new Date().toISOString(),
    });
  };
  const documentList = {
    ...initDocuments,
    data: localDocuments.filter((x) => x.name.includes(filterText)),
    origin: localDocuments,
  };
  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            <div className="mt-2">
              <div className="flex justify-start flex-col h-screen">
                <DropzoneComponent
                  location={locationSelected}
                ></DropzoneComponent>
                <div className="flex mt-4 items-center">
                  <RoundedInputText
                    value={filterText}
                    onChange={(e) =>
                      handleDocumentFiltering(e.currentTarget.value)
                    }
                    placeholder="Ingrese el texto a buscar"
                  ></RoundedInputText>
                  {showDetails ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#bdbdbd"
                      className="w-6 h-6 cursor-pointer"
                      onClick={(e) => setShowDetails(!showDetails)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#bdbdbd"
                      className="w-6 h-6  cursor-pointer"
                      onClick={(e) => setShowDetails(!showDetails)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                      />
                    </svg>
                  )}

                  <ContextualMenu className="relative inline-flex">
                    <li>
                      <button
                        className="w-full p-2 text-sm pl-8 text-left  hover:bg-gray-100"
                        onClick={() => {}}
                      >
                        Nombre
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full p-2 text-sm pl-8 text-left  hover:bg-gray-100"
                        onClick={(e) => {}}
                      >
                        Tamaño Mayor a Menor
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full p-2 text-sm pl-8 text-left  hover:bg-gray-100"
                        onClick={(e) => {}}
                      >
                        Tamaño Menor a Mayor
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full p-2 text-sm pl-8 text-left  hover:bg-gray-100"
                        onClick={(e) => {}}
                      >
                        Tipo
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full p-2 text-sm pl-8 text-left  hover:bg-gray-100"
                        onClick={(e) => {}}
                      >
                        Fecha de Modificación
                      </button>
                    </li>
                  </ContextualMenu>
                </div>

                <div className="flex h-full w-full flex-col ">
                  <div className="flex justify-around text-xs my-4">
                    {filterOptions.map((x) => (
                      <div
                        key={x}
                        className="flex cursor-pointer font-bold hover:text-purple-700 "
                        onClick={() => setFilterByFileType(x)}
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                  {showDetails ? (
                    <TableSection
                      sectionTitle="Documntos"
                      dataset={documentList}
                      currentLimit={currentLimit}
                      isOrderDesc={isOrderDirectionDesc}
                      orderField={orderField}
                      onShowOffCanvas={() => {}}
                      onView={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      onShowMore={handleShowMoreNewsClicked}
                      onChangeLimit={handleChangeLimit}
                      onOrderByFieldChanged={handleOrderByFieldChanged}
                      onFilterPostChanged={() => {}}
                    ></TableSection>
                  ) : (
                    <div className="flex flex-wrap gap-8">
                      {documentList.data.map((x) => (
                        <IconContainer
                          key={x.id}
                          sourceId={x.id}
                          documentName={x.name}
                          tags={x.tags}
                          icon={getIcon(x.type)}
                          isSelected={selectedDocument.id == x.id}
                          onMouseOver={() => setSelectedDocument(x)}
                          onClick={handleShowOffCanvas}
                          onDocumentTag={() => {
                            setShowModal(true);
                          }}
                          isFavorited={x.featuredBy.indexOf(authUser.uid) > -1}
                          currentUser={authUser.uid}
                          featuredBy={x.featuredBy}
                        ></IconContainer>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {showModal && (
              <TagModal
                sourceId={selectedDocument.id}
                selectedTags={selectedDocument.tags}
                onCancel={() => setShowModal(false)}
                onConfirm={onTagModalConfirmation}
                onAddingTag={addTagToDocument}
                onRemovingTag={removeTagFromDocument}
              ></TagModal>
            )}
          </div>
          <OffCanvas
            showSidebar={showOffCanvas}
            setShowSidebar={setShowOffCanvas}
          >
            <div className="flex flex-col py-10 px-10 bg-white text-black border-1 rounded-lg border-purple-300">
              <h3 className="flex  text-2xl font-semibold text-black justify-center text-center">
                Filtros
              </h3>
            </div>
          </OffCanvas>
        </MainSection>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </NewLayout>
  );
}

export default DocumentPage;
