import React, { useState } from "react";
import NewLayout from "../../components/newLayout";
import MainSection from "../../components/dashboard/mainSection";
import Footer from "../../components/dashboard/footer";
import PostModal from "../../components/post/post-modal";

import { Disclosure } from "@headlessui/react";

import { ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";
import { postOptions } from "../../utils/UI-Constants";
import { StyledButton } from "../../components/admin/base-ui-components";
import PostTypeScreen from "../../components/post/post-type-screen";

import PostNewsScreen from "../../components/post/post-news-screen";
import * as Events from "../../components/event/event-list-container-def";
import * as Posts from "../../components/post/post-list-container-def";
import * as Marketplace from "../../components/marketplace/marketplace-list-container-def";
import * as Rent from "../../components/rent/rent-list-container-def";
import ListContainer from "../../components/event-list-container";
import EventScreen from "../../components/event/event-screen";
import MarketplaceScreen from "../../components/marketplace/marketplace-screen";
import RentScreen from "../../components/rent/rent-screen";

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
                        <ListContainer
                          firebaseQuery={Posts.DEFAULT_QUERY}
                          handleDeleteConfirmation={
                            Posts.handleDeleteConfirmation
                          }
                          handleRowClicked={Posts.handleRowClicked}
                          handleViewClicked={Posts.handleViewClicked}
                          mapResolver={Posts.DEFAULT_MAP_RESOLVER}
                          rowLimit={Posts.DEFAULT_LIMIT}
                          sectionTitle={Posts.DEFAULT_SECTION_TITLE}
                          sortingColumn={Posts.DEFAULT_SORTING_COLUMN}
                          tableStructure={Posts.tableStructure}
                        ></ListContainer>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="mt-2">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between shadow-md w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg border-1 border-purple-200 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>Eventos</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-purple-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <ListContainer
                          firebaseQuery={Events.DEFAULT_QUERY}
                          handleDeleteConfirmation={
                            Events.handleDeleteConfirmation
                          }
                          handleRowClicked={Events.handleRowClicked}
                          handleViewClicked={Events.handleViewClicked}
                          mapResolver={Events.DEFAULT_MAP_RESOLVER}
                          rowLimit={Events.DEFAULT_LIMIT}
                          sectionTitle={Events.DEFAULT_SECTION_TITLE}
                          sortingColumn={Events.DEFAULT_SORTING_COLUMN}
                          tableStructure={Events.tableStructure}
                        ></ListContainer>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="mt-2">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between shadow-md w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg border-1 border-purple-200 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>Compra y Venta</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-purple-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <ListContainer
                          firebaseQuery={Marketplace.DEFAULT_QUERY}
                          handleDeleteConfirmation={
                            Marketplace.handleDeleteConfirmation
                          }
                          handleRowClicked={Marketplace.handleRowClicked}
                          handleViewClicked={Marketplace.handleViewClicked}
                          mapResolver={Marketplace.DEFAULT_MAP_RESOLVER}
                          rowLimit={Marketplace.DEFAULT_LIMIT}
                          sectionTitle={Marketplace.DEFAULT_SECTION_TITLE}
                          sortingColumn={Marketplace.DEFAULT_SORTING_COLUMN}
                          tableStructure={Marketplace.tableStructure}
                        ></ListContainer>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="mt-2">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between shadow-md w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg border-1 border-purple-200 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>Alquileres</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-purple-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <ListContainer
                          firebaseQuery={Rent.DEFAULT_QUERY}
                          handleDeleteConfirmation={
                            Rent.handleDeleteConfirmation
                          }
                          handleRowClicked={Rent.handleRowClicked}
                          handleViewClicked={Rent.handleViewClicked}
                          mapResolver={Rent.DEFAULT_MAP_RESOLVER}
                          rowLimit={Rent.DEFAULT_LIMIT}
                          sectionTitle={Rent.DEFAULT_SECTION_TITLE}
                          sortingColumn={Rent.DEFAULT_SORTING_COLUMN}
                          tableStructure={Rent.tableStructure}
                        ></ListContainer>
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
            <PostModal
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
              {currentOption?.key === "event" && (
                <EventScreen onCancel={hideCreatePostModal}></EventScreen>
              )}
              {currentOption?.key === "marketplace" && (
                <MarketplaceScreen
                  onCancel={hideCreatePostModal}
                ></MarketplaceScreen>
              )}
              {currentOption?.key === "rent" && (
                <RentScreen onCancel={hideCreatePostModal}></RentScreen>
              )}
            </PostModal>
          )}
        </div>
      </NewLayout>
    </>
  );
}

export default Comunidad;
