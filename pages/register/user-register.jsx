import React from "react";
import { Image } from "next";

function UserRegister() {
  return (
    <div className="lg:flex justify-center lg:w-3/4 mx-auto my-8">
      <div className="bg-white lg:w-2/3 lg:rounded-l-lg mx-6 px-6 lg:mx-0 lg:px-20">
        <div className="text-3xl text-gray-700 py-6">Registration Form</div>
        <hr className="-mx-20"></hr>
        <div className="py-8">
          <div className="flex mb-4">
            <span className="items-center justify-center block rounded-full border border-blue-500 h-6 w-6 text-xs font-bold text-blue-500 mr-3">
              1
            </span>
            <span className="font-bold text-gray-800">
              Personal Information
            </span>
          </div>
          <div className="lg:flex mb-2 -mx-1">
            <div className="lg:w-1/2 mb-3 lg:mb-2 mx-1">
              <div className="px-1">
                <label className="text-gray-600 font-light">First Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
            <div className="lg:w-1/2  mb-3 lg:mb-2 mx-1">
              <div className="px-1">
                <label className="text-gray-600 font-light">Last Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-2/3">
            <div className="px-1">
              <label className="text-gray-600 font-light">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
        </div>
        <hr className="-mx-20"></hr>
        <div className="py-8">
          <div className="flex mb-4">
            <span className="items-center justify-center block rounded-full border border-blue-500 h-6 w-6 text-xs font-bold text-blue-500 mr-3">
              2
            </span>
            <span className="font-bold text-gray-800">Address Information</span>
          </div>
          <div className="lg:flex mb-2 -mx-1">
            <div className="lg:w-1/2 mb-3 lg:mb-2 mx-1">
              <div className="px-1">
                <label className="text-gray-600 font-light">Country</label>
                <input
                  type="text"
                  className="w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
            <div className="lg:w-1/2 mb-3 lg:mb-2 mx-1">
              <div className="px-1">
                <label className="text-gray-600 font-light">
                  Street Address
                </label>
                <input
                  type="text"
                  className="w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-2/3">
            <div className="px-1">
              <label className="text-gray-600 font-light">State</label>
              <input
                type="email"
                className="w-full mt-1 px-2 py-1 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
        </div>
        <hr className="-mx-20"></hr>
        <div className="flex justify-end py-8">
          <button
            type="button"
            className="flex items-center bg-blue-600 text-gray-200 rounded hover:bg-blue-500 px-6 py-2 focus:outline-none"
          >
            <span className="material-icons pr-1">add</span>
            Register
          </button>
        </div>
      </div>
      <div className="bg-blue-600 lg:w-1/3  lg:rounded-r-lg mx-6 px-6 lg:mx-0 lg:px-0">
        <div className="px-8">
          <div className="font-bold text-gray-200 pt-8 pb-3">Freelancer</div>
          <div className="tracking-wider">
            <sup className="text-base text-gray-100">$</sup>
            <span className="font-light text-4xl -mx-1 text-gray-100">99</span>
            <sub className="text-base text-gray-100 tracking-normal">/Year</sub>
          </div>
          <div className="italic text-gray-300 py-2">
            Automatically renews after 1 year
          </div>
          <div className="mt-6">
            <div className="">
              <div className="flex mb-1">
                <p className="text-gray-300 mr-2">
                  <span className="border rounded-full material-icons p-1">
                    done
                  </span>
                </p>
                <p className="text-gray-300">Uses on 5 client sites.</p>
              </div>
              <div className="flex mb-1">
                <p className="text-gray-300 mr-2">
                  <span className="border rounded-full material-icons p-1">
                    done
                  </span>
                </p>
                <p className="text-gray-300">Private repositories.</p>
              </div>
              <div className="flex mb-1">
                <p className="text-gray-300 mr-2">
                  <span className="border rounded-full material-icons p-1">
                    done
                  </span>
                </p>
                <p className="text-gray-300">Email Support</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-gray-300">
            <span className="block">
              Need <strong className="text-white font-bold">20</strong> client
              sites ?
            </span>
            <a href="#" className="text-gray-100 font-bold underline">
              Switch to <span className="italic">Agency</span>
              account.
            </a>
          </div>
          <hr className="border-1 border-gray-500 my-10"></hr>
          <div className="mt-6 text-gray-400 font-light">
            Css is horrible things. Web2tailwind helps to deals with in very
            effective and production way.
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="w-16">
              {/* <Image
                className="border border-gray-500 p-2 w-12 h-12 rounded-full"
                src="http://web2tailwind.com/assets/img/logo-white.png"
                key="sample"
              /> */}
            </div>
            <div className="flex-1">
              <div className="text-gray-300 font-semibold">
                Web2tailwind.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
