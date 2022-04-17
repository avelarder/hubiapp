import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import MainSection from "../../../components/dashboard/mainSection";
import Footer from "../../../components/dashboard/footer";
import EmployeesContainer from "../../../components/employee/employee-container";

function Index() {
  const [showRegister, setShowRegister] = useState(false);

  const router = useRouter();

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            <div className="mt-2">
              <div className="flex justify-around "></div>
              <EmployeesContainer
                onCreateClicked={() => router.push("./empleados/crear")}
              ></EmployeesContainer>
            </div>
          </div>
        </MainSection>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
