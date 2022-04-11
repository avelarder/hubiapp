import React, { useState } from "react";
import Layout from "../../../components/layout";
import MainSection from "../../../components/dashboard/mainSection";
import Footer from "../../../components/dashboard/footer";
import EmployeesContainer from "../../../components/employee/employee-container";
import RegisterEmployee from "../../../components/employee/register";

function Index() {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            {/* <button
              className="w-full inline-flex justify-center items-center rounded-xl border px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-red-700 sm:text-sm sm:mb-3 md:mx-1 sm:w-40 shadow-sm"
              onClick={() => {
                handleCreatePostVisibility(true);
              }}
            >
              <PlusIcon className="w-5 h-5 mr-2 font-monse"></PlusIcon>Crear
              Aviso
            </button> */}

            <div className="mt-2">
              <div className="flex justify-around "></div>
              <EmployeesContainer></EmployeesContainer>
            </div>
          </div>
        </MainSection>
        <div>
          <Footer></Footer>
        </div>
        {showRegister && (
          <RegisterEmployee
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
          ></RegisterEmployee>
        )}
      </div>
    </Layout>
  );
}

export default Index;
