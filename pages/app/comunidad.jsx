import React, { useState } from "react";
import NewLayout from "../../components/newLayout";
import MainSection from "../../components/dashboard/mainSection";
import Footer from "../../components/dashboard/footer";
import CreatePost from "../../components/post/create-post";

import { Disclosure } from "@headlessui/react";

import NewsContainer from "../../components/post/news-container";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";
import { postOptions } from "../../utils/UI-Constants";
import { StyledButton } from "../../components/admin/base-ui-components";
import PostTypeScreen from "../../components/post/post-type-screen";

import PostNewsScreen from "../../components/post/post-news-screen";

function Comunidad() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);

  const hideCreatePostModal = () => {
    setCurrentOption(null);
    setShowCreatePost(false);
  };

  const handleCreatePostVisibility = (visible) => {
    setShowCreatePost(visible);
  };

  const handleCurrentOptionChange = (type) => {
    setCurrentOption(type);
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
                Avisos
              </StyledButton>

              <div className="mt-2">
                <Disclosure defaultOpen="open">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between shadow-md w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg border-1 border-purple-200 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>Publicaciones y Encuestas</span>
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
              title={"Crear Publicación"}
              onCancel={hideCreatePostModal}
            >
              {!currentOption && (
                <PostTypeScreen
                  postOptions={postOptions}
                  onCurrentOptionChange={handleCurrentOptionChange}
                ></PostTypeScreen>
              )}
              {currentOption?.key === "news" && (
                <PostNewsScreen onCancel={hideCreatePostModal}></PostNewsScreen>
              )}
            </CreatePost>
          )}
        </div>
      </NewLayout>
    </>
  );
}

export default Comunidad;
