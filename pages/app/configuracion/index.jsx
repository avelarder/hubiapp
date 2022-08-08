import { useRouter } from "next/router";
import React from "react";
import TabNavigator from "../../../components/common/tabnavigator";
import Footer from "../../../components/dashboard/footer";
import MainSection from "../../../components/dashboard/mainSection";
import NewLayout from "../../../components/newLayout";
import { handleOptionSelected } from "../../../utils/UI-Constants";

function GeneralPage() {
  const router = useRouter();

  return (
    <NewLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            <div className="mt-2">
              <div className="flex justify-around ">
                <TabNavigator
                  onOptionSelected={(option) =>
                    handleOptionSelected(option, router)
                  }
                  currentOptionIndex={1}
                ></TabNavigator>
              </div>
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

export default GeneralPage;
