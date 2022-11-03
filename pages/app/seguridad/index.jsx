import { useRouter } from "next/router";
import React from "react";
import Footer from "../../../components/dashboard/footer";
import MainSection from "../../../components/dashboard/mainSection";
import IncidentContainer from "../../../components/incidents/incidentContainer";
import NewLayout from "../../../components/newLayout";

function IncidentIndexPage() {
  const router = useRouter();

  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            <div className="mt-2">
              <div className="flex justify-around "></div>
              <IncidentContainer
                onCreateClicked={() => router.push("./seguridad/crear")}
              ></IncidentContainer>
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
export default IncidentIndexPage;
