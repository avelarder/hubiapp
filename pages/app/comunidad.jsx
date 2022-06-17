import React, { useState } from "react";
import NewLayout from "../../components/newLayout";
import MainSection from "../../components/dashboard/mainSection";
import Footer from "../../components/dashboard/footer";
import CreatePost from "../../components/post/create-post";
import Firebase from "../../firebase";
import { Disclosure } from "@headlessui/react";
import { uuid as v4 } from "uuidv4";
import moment from "moment";
import NewsContainer from "../../components/post/news-container";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";

import { postOptions, postScopeOptions } from "../../utils/UI-Constants";
import { StyledButton } from "../../components/admin/base-ui-components";

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
        allowAddOption:
          postData.data.find((x) => x.key === "allowAddOption")?.value ?? null,
        schedule:
          postData.data
            .find((x) => x.key === "schedule")
            ?.value.toISOString() ?? null,
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
      <NewLayout>
        <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          <MainSection>
            <div className="flex flex-col w-full">
              <StyledButton
                className="inline-flex items-center justify-center"
                onClick={() => {
                  handleCreatePostVisibility(true);
                }}
              >
                <PlusIcon className="w-5 h-5 mr-2 font-monse"></PlusIcon>Crear
                Aviso
              </StyledButton>

              <div className="mt-2">
                <Disclosure defaultOpen="open">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between shadow-md w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg border-1 border-purple-200 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>Avisos y Encuestas</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "transform rotate-180" : ""
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
      </NewLayout>
    </>
  );
}

export default Comunidad;
