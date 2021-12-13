import React, { useState } from "react";
import Layout from "../../components/layout";
import MainSection from "../../components/dashboard/mainSection";
import Footer from "../../components/dashboard/footer";
import TableSection from "../../components/common/table-section";
import CreatePost from "../../components/post/create-post";
import Firebase from "../../firebase";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";

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

const initCommunityNews = {
  headers: [
    { source: "title", columnName: "Título" },
    { source: "publishedOn", columnName: "Publicado" },
    { source: "expiresBy", columnName: "Expiración" },
  ],
  data: [],
};

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
  const db = Firebase.default.firestore();
  let communityNews = {};
  const [showCreatePost, setshowCreatePost] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [currentOption, setCurrentOption] = useState(null);

  const { data, status, error } = useFirestoreQuery(
    db.collection("CommunityNews")
  );

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "error") {
    return `Error: ${error.message}`;
  }

  if (data) {
    var currentDocs = data.map((doc) => ({
      id: doc.id,
      title: doc.title,
      publishedOn: new Date(doc.publishedOn.seconds).toString(),
      expiresBy: new Date(doc.expiresBy.seconds).toString(),
    }));

    communityNews = { ...initCommunityNews, data: currentDocs };
  }

  const hideCreatePostModal = () => {
    setCurrentStep(1);
    setCurrentOption(null);
    setshowCreatePost(false);
  };

  const handlePostCreated = () => {
    console.log("Post is created");
    setshowCreatePost(false);
  };

  const handlePostPreview = (postData) => {
    console.log(postData);
    handleStepChange(currentStep + 1);
  };

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
  };

  const handleCurrentOptionChange = (type) => {
    setCurrentOption(type);
  };

  // getCommunityNews();

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            <button
              className="bg-purple-600 shadow-md h-8 rounded-full w-40  text-white font-medium"
              onClick={() => {
                setshowCreatePost(true);
              }}
            >
              Create a Post
            </button>

            <div className="mt-4">
              {communityNews.data ? (
                <TableSection
                  sectionTitle="Avisos"
                  dataset={communityNews}
                ></TableSection>
              ) : (
                <div>Loading...</div>
              )}
              <div className="mt-4"></div>
              <TableSection
                sectionTitle="Marketplace Venta/Compra"
                dataset={products}
              ></TableSection>
            </div>
          </div>
        </MainSection>
        <div></div>
        <div>
          <Footer></Footer>
        </div>
        {showCreatePost && (
          <CreatePost
            step={currentStep}
            onStepChanged={handleStepChange}
            option={currentOption}
            onOptionChanged={handleCurrentOptionChange}
            postOptions={postOptions}
            postScopeOptions={postScopeOptions}
            onCancel={hideCreatePostModal}
            onConfirm={handlePostCreated}
            onPreview={handlePostPreview}
          ></CreatePost>
        )}
      </div>
    </Layout>
  );
}

export default Comunidad;
