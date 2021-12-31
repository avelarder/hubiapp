import React, { useState } from "react";
import Layout from "../../components/layout";
import MainSection from "../../components/dashboard/mainSection";
import Footer from "../../components/dashboard/footer";
import TableSection from "../../components/common/table-section";
import CreatePost from "../../components/post/create-post";
import Firebase from "../../firebase";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import { v4 } from "uuid";
import moment from "moment";

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
    { source: "title", columnName: "Título", isLink: true, path: "posts/" },
    { source: "publishedOn", columnName: "Publicado" },
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

  const defaultActioBarStatus = { backEnabled: false, nextEnabled: false, closeEnabled: true, publishEnabled: false };

  const [currentStep, setCurrentStep] = useState(1);
  const [postActionBarStatus, setPostActionBarStatus] = useState(defaultActioBarStatus);
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
      publishedOn: moment(new Date(doc.publishedOn.seconds), true).format(
        "DD/MM/YYYY"
      ),
      expiresBy: moment(new Date(doc.expiresBy.seconds), true).format(
        "DD/MM/YYYY"
      ),
    }));

    communityNews = { ...initCommunityNews, data: currentDocs };
  }

  const hideCreatePostModal = () => {
    setCurrentStep(1);
    setCurrentOption(null);
    setshowCreatePost(false);
  };

  const handlePostCreated = (postData) => {
    const documentId = v4();
    const publishedOn = new Date();
    const expiresBy = new Date(publishedOn.getDate() + 10);

    db.collection("CommunityNews")
      .doc(documentId)
      .set({
        description: postData.data.find((x) => x.key === "description").value,
        title: postData.data.find((x) => x.key === "title").value,
        scope: postData.data.find((x) => x.key === "scope").value.id,
        expiresBy: expiresBy,
        publishedOn: publishedOn,
      });

    hideCreatePostModal();
  };

  const handleCreatePostVisibility = (visible) => {
    setshowCreatePost(visible);
    setPostActionBarStatus({ ...postActionBarStatus, backEnabled: false, nextEnabled: false, closeEnabled: true, publishEnabled: false });
  }
  const handlePostPreview = () => {
    handleStepNext();
    setPostActionBarStatus({ ...postActionBarStatus, backEnabled: true, nextEnabled: false, closeEnabled: true, publishEnabled: true });
  };

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);

  };
  const handleStepBack = () => {
    setCurrentStep(currentStep - 1);
    setPostActionBarStatus({ ...postActionBarStatus, backEnabled: false, nextEnabled: true, closeEnabled: true, publishEnabled: false });
  };
  const handleStepNext = () => {
    setCurrentStep(currentStep + 1);
    setPostActionBarStatus({ ...postActionBarStatus, backEnabled: true, nextEnabled: false, closeEnabled: true, publishEnabled: false });
  };

  const handleCurrentOptionChange = (type) => {
    setCurrentOption(type);
    setPostActionBarStatus({ ...postActionBarStatus, backEnabled: false, nextEnabled: true, closeEnabled: true, publishEnabled: false });
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
                handleCreatePostVisibility(true);
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
  );
}

export default Comunidad;
