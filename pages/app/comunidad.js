import React, { useState } from "react";
import Layout from "../../components/layout";
import MainSection from "../../components/dashboard/mainSection";
import Footer from "../../components/dashboard/footer";
import TableSection from "../../components/common/table-section";
import CreatePost from "../../components/post/create-post";
import Firebase from "../../firebase";
import { useRouter } from "next/router";

import { v4 } from "uuid";
import moment from "moment";
import NewsContainer from "../../components/post/news-container";

const postOptions = [
  { key: "news", steps: 3 },
  { key: "marketplace", steps: 4 },
  { key: "survey", steps: 4 },
  { key: "rent", steps: 4 },
  { key: "report", steps: 3 },
];

const postScopeOptions = [
  { id: "PUBLIC", text: "Público" },
  { id: "A", text: "La Floresta" },
];

const products = {
  headers: [
    { source: "title", columnName: "Título" },
    { source: "publishedOn", columnName: "Publicado" },
    { source: "expiresBy", columnName: "Expiración" },
  ],
  data: [
    {
      id: 1,
      title: "Vendo Ropero nuevo de MDF",
      description:
        "El ropero mide 2 mts de alto x 2 mts de ancho y 75 cm de profundidad en color blanco con espejos.",
      publishedOn: "21/01/2021 5:00pm",
      expiresOn: "21/01/2022 5:00pm",
      status: "Activo",
    },
    {
      id: 2,
      title: "Oportunidad - Alquilo cochera con techo",
      description:
        "Buenas, estoy alquilando una cochera subterránea con box para guardar cosas.",
      publishedOn: "21/01/2021 5:00pm",
      expiresOn: "21/01/2022 5:00pm",
      status: "Pausado",
    },
  ],
};

function Comunidad() {
  const router = useRouter();

  const [showCreatePost, setShowCreatePost] = useState(false);

  const defaultActioBarStatus = {
    backEnabled: false,
    nextEnabled: false,
    closeEnabled: true,
    publishEnabled: false,
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [postActionBarStatus, setPostActionBarStatus] = useState(
    defaultActioBarStatus
  );
  const [currentOption, setCurrentOption] = useState(null);
  const [pageSize, setpageSize] = useState(5);

  const hideCreatePostModal = () => {
    setCurrentStep(1);
    setCurrentOption(null);
    setShowCreatePost(false);
  };

  const handlePostCreated = (postData) => {
    const documentId = v4();
    const publishedOn = moment(new Date()).format("DD/MM/YYYY");

    const db = Firebase.default.firestore();
    db.collection("CommunityNews")
      .doc(documentId)
      .set({
        description: postData.data.find((x) => x.key === "description").value,
        title: postData.data.find((x) => x.key === "title").value,
        scope: postData.data.find((x) => x.key === "scope").value,
        postType: postData.data.find((x) => x.key === "postType").value,
        answerType:
          postData.data.find((x) => x.key === "answerType")?.value ?? null,
        options: postData.data.find((x) => x.key === "options")?.value ?? null,
        expiresBy:
          postData.data.find((x) => x.key === "expiresBy")?.value ?? null,
        publishedOn: publishedOn,
      });

    hideCreatePostModal();
  };

  const handleCreatePostVisibility = (visible) => {
    setShowCreatePost(visible);
    setPostActionBarStatus({
      ...postActionBarStatus,
      backEnabled: false,
      nextEnabled: false,
      closeEnabled: true,
      publishEnabled: false,
    });
  };
  const handlePostPreview = () => {
    handleStepNext();
    setPostActionBarStatus({
      ...postActionBarStatus,
      backEnabled: true,
      nextEnabled: false,
      closeEnabled: true,
      publishEnabled: true,
    });
  };

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
  };
  const handleStepBack = () => {
    setCurrentStep(currentStep - 1);
    setPostActionBarStatus({
      ...postActionBarStatus,
      backEnabled: false,
      nextEnabled: true,
      closeEnabled: true,
      publishEnabled: false,
    });
  };
  const handleStepNext = () => {
    setCurrentStep(currentStep + 1);
    setPostActionBarStatus({
      ...postActionBarStatus,
      backEnabled: true,
      nextEnabled: false,
      closeEnabled: true,
      publishEnabled: false,
    });
  };

  const handleCurrentOptionChange = (type) => {
    setCurrentOption(type);
    setPostActionBarStatus({
      ...postActionBarStatus,
      backEnabled: false,
      nextEnabled: true,
      closeEnabled: true,
      publishEnabled: false,
    });
  };

  return (
    <>
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <MainSection>
            <div className="flex flex-col w-full">
              <button
                className="bg-purple-600 shadow-md h-8 rounded-full w-40  text-white font-medium"
                onClick={() => {
                  handleCreatePostVisibility(true);
                }}
              >
                Create a Post
              </button>

              <div className="mt-4">
                <NewsContainer></NewsContainer>
                <div className="mt-4"></div>
                <TableSection
                  sectionTitle="Marketplace Venta/Compra"
                  dataset={products}
                ></TableSection>
              </div>
            </div>
          </MainSection>
          <div>
            <Footer></Footer>
          </div>
          {showCreatePost && (
            <CreatePost
              step={currentStep}
              postActionBarStatus={postActionBarStatus}
              onStepChanged={handleStepChange}
              option={currentOption}
              onOptionChanged={handleCurrentOptionChange}
              postOptions={postOptions}
              postScopeOptions={postScopeOptions}
              onCancel={hideCreatePostModal}
              onConfirm={handlePostCreated}
              onPreview={handlePostPreview}
              onBack={handleStepBack}
              onNext={handleStepNext}
            ></CreatePost>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Comunidad;
