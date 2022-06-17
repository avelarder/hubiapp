import React from "react";
import Footer from "../../components/dashboard/footer";
import NewLayout from "../../components/newLayout";
import MainSection from "../../components/dashboard/mainSection";

function Reports() {
  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div>
          <MainSection>
            <h1>Informes</h1>
          </MainSection>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </NewLayout>
  );
}

export default Reports;
