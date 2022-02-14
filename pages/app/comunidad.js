import React, { useState } from "react";
import Layout from "../../components/layout";
import MainSection from "../../components/dashboard/mainSection";
import Footer from "../../components/dashboard/footer";
import CreatePost from "../../components/post/create-post";
import Firebase from "../../firebase";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { v4 } from "uuid";
import moment from "moment";
import NewsContainer from "../../components/post/news-container";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";



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

function Comunidad() {

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
        allowAddOption: postData.data.find((x) => x.key === "allowAddOption")?.value ?? null,
        schedule: postData.data.find((x) => x.key === "schedule")?.value.toLocaleString() ?? null,
        publishedOn: publishedOn,
        createdOnUTC: new Date().toISOString(),
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
                className="w-full inline-flex justify-center items-center rounded-xl border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 sm:text-sm sm:mb-3 md:mx-1 sm:w-40 shadow-sm"
                onClick={() => {
                  handleCreatePostVisibility(true);
                }}
              >
                <PlusIcon className="w-5 h-5 mr-2 font-monse"></PlusIcon>Crear Aviso
              </button>

              <div className="mt-2">
                <Disclosure defaultOpen="open">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>Avisos y Encuestas</span>
                        <ChevronUpIcon
                          className={`${open ? 'transform rotate-180' : ''
                            } w-5 h-5 text-purple-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <NewsContainer></NewsContainer>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>


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
