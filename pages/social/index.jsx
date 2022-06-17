import React from "react";
import NewLayout from "../../components/newLayout";
import MainSection from "../../components/dashboard/mainSection";

function SocialHomePage() {
  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection></MainSection>
      </div>
    </NewLayout>
  );
}

export default SocialHomePage;
