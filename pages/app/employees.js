import React, { useEffect, useState } from "react";
import Footer from "../../components/dashboard/footer";
import Layout from "../../components/layout";
import MainSection from "../../components/dashboard/mainSection";
import Image from "next/image";

import Image01 from "/public/images/user-36-05.jpg";
import Image02 from "/public/images/user-36-06.jpg";
import Image03 from "/public/images/user-36-07.jpg";
import Image04 from "/public/images/user-36-08.jpg";
import Image05 from "/public/images/user-36-09.jpg";

function EmployeePage() {
  const customers = [
    {
      id: "0",
      image: Image01,
      name: "Alex Shatov",
      email: "alexshatov@gmail.com",
      location: "Chorrillos",
      buildings: "La Floresta",
      role: "Vigilante",
    },
    {
      id: "1",
      image: Image02,
      name: "Philip Harbach",
      email: "philip.h@gmail.com",
      location: "Miraflores",
      buildings: "Girnaldas, Residencial Floresta II",
      role: "Vigilante",
    },
    {
      id: "2",
      image: Image03,
      name: "Mirko Fisuk",
      email: "mirkofisuk@gmail.com",
      location: "Barranco",
      buildings: "Fonavi II, Las conchitas, Residencial Manos arriba",
      role: "Conserje",
    },
    {
      id: "3",
      image: Image04,
      name: "Olga Semklo",
      email: "olga.s@cool.design",
      location: "Barranco",
      buildings: "Fonavi II",
      role: "Limpieza",
    },
    {
      id: "4",
      image: Image05,
      name: "Burak Long",
      email: "longburak@gmail.com",
      location: "Chorrillos",
      buildings: "La floresta, Remanso",
      role: "Cadetería",
    },
  ];

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div>
          <MainSection>
            <div className="flex flex-col flex-1 bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Empleados</h2>
              </header>
              <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Edificios
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Rol</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Zona</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm divide-y divide-gray-100">
                      {customers.map((customer) => {
                        return (
                          <tr key={customer.id}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                  <Image
                                    className="rounded-full"
                                    src={customer.image}
                                    width="40"
                                    height="40"
                                    alt={customer.name}
                                  />
                                </div>
                                <div className="font-medium text-gray-800">
                                  {customer.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{customer.email}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left font-medium text-green-500">
                                <ul>
                                  {customer.buildings.split(",").map((x, i) => (
                                    <li key={"building_" + i}>{x}</li>
                                  ))}
                                </ul>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-md text-left">
                                {customer.role}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-md text-left">
                                {customer.location}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </MainSection>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </Layout>
  );
}

export default EmployeePage;
