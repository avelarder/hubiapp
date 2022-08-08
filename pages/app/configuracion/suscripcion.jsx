import { useRouter } from "next/router";
import React from "react";
import TabNavigator from "../../../components/common/tabnavigator";
import Footer from "../../../components/dashboard/footer";
import MainSection from "../../../components/dashboard/mainSection";
import NewLayout from "../../../components/newLayout";
import { handleOptionSelected } from "../../../utils/UI-Constants";

function SubcriptionPage() {
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
                  currentOptionIndex={2}
                ></TabNavigator>
              </div>
              <div className="flex justify-center  mt-16">
                <div className="flex justify-evenly sm:gap-10 items-center ">
                  <div className="flex flex-col border-1 border-purple-600 p-16 items-center rounded-lg shadow-lg bg-white">
                    <input
                      className="rounded-full text-purple-600 mb-4"
                      type={"checkbox"}
                    ></input>
                    <span className="text-3xl font-semibold mb-8">Free</span>
                    <span className="font-semibold text-gray-500 mb-8 ">
                      Pagarás
                    </span>
                    <span className="font-semibold text-5xl  mb-4 ">S/. 0</span>
                    <span className="font-semibold text-gray-500 ">
                      Hasta 100 unidades
                    </span>
                  </div>

                  <div className="flex flex-col border-1 border-purple-600 p-16 items-center rounded-lg shadow-lg bg-white">
                    <input
                      className="rounded-full text-purple-600 mb-4"
                      type={"checkbox"}
                    ></input>
                    <span className="text-3xl font-semibold mb-8">
                      Standard
                    </span>
                    <span className="font-semibold text-gray-500 mb-8 ">
                      Pagarás
                    </span>
                    <span className="font-semibold text-5xl  mb-4 ">
                      S/. 1,200
                    </span>
                    <span className="font-semibold text-gray-500 ">
                      Hasta 300 unidades
                    </span>
                  </div>
                  <div className="flex flex-col border-1 border-purple-600 p-16 items-center rounded-lg shadow-lg bg-white">
                    <input
                      className="rounded-full text-purple-600 mb-4"
                      type={"checkbox"}
                    ></input>
                    <span className="text-3xl font-semibold mb-8">Free</span>
                    <span className="font-semibold text-gray-500 mb-8 ">
                      Pagarás
                    </span>
                    <span className="font-semibold text-5xl  mb-4 ">
                      S/. 2,000
                    </span>
                    <span className="font-semibold text-gray-500 ">
                      Más de 300 unidades
                    </span>
                  </div>
                </div>
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

export default SubcriptionPage;
