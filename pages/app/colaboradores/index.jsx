import React, { useState } from "react";
import { useRouter } from "next/router";
import NewLayout from "../../../components/newLayout";
import MainSection from "../../../components/dashboard/mainSection";
import Footer from "../../../components/dashboard/footer";
import CollaboratorContainer from "../../../components/collaborator/collaborator-container";

function Index() {
  const [showRegister, setShowRegister] = useState(false);

  const router = useRouter();

  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            <div className="mt-2">
              <div className="flex justify-around "></div>
              <CollaboratorContainer
                onCreateClicked={() => router.push("./colaboradores/crear")}
              ></CollaboratorContainer>
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

export default Index;
