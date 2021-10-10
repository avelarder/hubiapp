import React from "react";
import Layout from "../../components/layout";
import MainSection from "../../components/dashboard/mainSection";
import Footer from "../../components/dashboard/footer";

import QuickMenu from "../../components/common/quick-menu";
import Image from "next/image";

const options = [
  {
    key: "avisos",
    label: "Publicaciones de Avisos para Comunidad",
    target: "#avisos",
  },
  {
    key: "productos",
    label: "Publicación de productos para vender y comprar.",
    target: "#productos",
  },
  {
    key: "publicaciones",
    label: "Publicación de Reuniones y Eventos.",
    target: "#publicaciones",
  },
  {
    key: "notificaciones",
    label: "Notificaciones de Reuniones y Eventos.",
    target: "#notificaciones",
  },
  {
    key: "constancias",
    label: "Envío de Constancias de Pago.",
    target: "#constancias",
  },
  {
    key: "reportes",
    label: "Reportes financieros a nivel Comunidad.",
    target: "#reportes",
  },
  {
    key: "consultas",
    label: "Consulta de documentos e informes.",
    target: "#consultas",
  },
  {
    key: "solicitudes",
    label: "Solicitudes a la Administración.",
    target: "#solicitudes",
  },
  {
    key: "encuestas",
    label: "Encuentas y Votaciones.",
    target: "#encuentas",
  },
];

const avisos = [
  {
    id: 1,
    title: "Protocolo COVID 2021",
    description: "Estimados vecinos, se les informa que a partir del 1ro de Febrero se restringirá el acceso de visitantes dentro del condominio.",
    publishedOn: "21/01/2021 5:00pm",
    expiresOn: "21/01/2022 5:00pm",
    status: "Active",
    image: "https://www.coe.int/documents/21202288/62129062/languages-COVID-19_used+by+CoE+main+portal.jpg/b9882ed7-9e7b-caf8-c6e4-9cec0f125baa?t=1585837178000"
  },
  {
    id: 2,
    title: "Ciclo gratuito de vacunación",
    description: "Estimados vecinos, se les informa que el próximo domingo (23 de Febrero del 2020) la municipalidad brindará el servicio de vacunación de forma gratuita. Favor, registrarse en www.yomevacuno.com.",
    publishedOn: "21/01/2021 5:00pm",
    expiresOn: "21/01/2022 5:00pm",
    status: "Active",
    image: "https://www.coe.int/documents/21202288/62129062/languages-COVID-19_used+by+CoE+main+portal.jpg/b9882ed7-9e7b-caf8-c6e4-9cec0f125baa?t=1585837178000"
  },
];

function Comunidad() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <MainSection>
          <div className="flex flex-col flex-1 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Comunidad</h2>
            </header>
            <div className="p-3 flex">
              <div className="flex w-2/3">
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      {/* Table header */}
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Título
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Publicado
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Expiración
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm divide-y divide-gray-100">
                        {avisos.map((aviso) => {
                          return (
                            <tr key={aviso.id}>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                    <Image
                                      className="rounded-full"
                                      src={aviso.image}
                                      width="40"
                                      height="40"
                                      alt={aviso.title}
                                    />
                                  </div>
                                  <div className="font-medium text-gray-800">
                                    {aviso.title}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">
                                  {aviso.publishedOn}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">
                                  {aviso.expiresOn}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                </div>
              </div>
              <div className="flex w-1/3">
                <QuickMenu
                  options={options}
                  title={"Acceso Rápido"}
                ></QuickMenu>
              </div>
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

export default Comunidad;
