import React from "react";
import Layout from "../../components/layout";
import MainSection from "../../components/dashboard/mainSection";
import Footer from "../../components/dashboard/footer";
import TableSection from "../../components/common/table-section";

const avisos = {
  headers: [
    { source: "title", columnName: "Título" },
    { source: "publishedOn", columnName: "Publicado" },
    { source: "expiresOn", columnName: "Expiración" },
  ],
  data: [
    {
      id: 1,
      title:
        "Protocolo COVID 2021 Protocolo COVID 2021 Protocolo COVID 2021 Protocolo COVID 2021 Protocolo COVID 2021",
      description:
        "Estimados vecinos, se les informa que a partir del 1ro de Febrero se restringirá el acceso de visitantes dentro del condominio.",
      publishedOn: "21/01/2021 5:00pm",
      expiresOn: "21/01/2022 5:00pm",
      status: "Active",
      image:
        "https://www.coe.int/documents/21202288/62129062/languages-COVID-19_used+by+CoE+main+portal.jpg/b9882ed7-9e7b-caf8-c6e4-9cec0f125baa?t=1585837178000",
    },
    {
      id: 2,
      title: "Ciclo gratuito de vacunación",
      description:
        "Estimados vecinos, se les informa que el próximo domingo (23 de Febrero del 2020) la municipalidad brindará el servicio de vacunación de forma gratuita. Favor, registrarse en www.yomevacuno.com.",
      publishedOn: "21/01/2021 5:00pm",
      expiresOn: "21/01/2022 5:00pm",
      status: "Active",
      image:
        "https://www.coe.int/documents/21202288/62129062/languages-COVID-19_used+by+CoE+main+portal.jpg/b9882ed7-9e7b-caf8-c6e4-9cec0f125baa?t=1585837178000",
    },
  ],
};

const products = {
  headers: [
    { source: "title", columnName: "Título" },
    { source: "publishedOn", columnName: "Publicado" },
    { source: "expiresOn", columnName: "Expiración" },
  ],
  data: [
    {
      id: 1,
      title: "Vendo Ropero nuevo de MDF",
      description:
        "El ropero mide 2 mts de alto x 2 mts de ancho y 75 cm de profundidad en color blanco con espejos.",
      publishedOn: "21/01/2021 5:00pm",
      expiresOn: "21/01/2022 5:00pm",
      status: "Activo",
    },
    {
      id: 2,
      title: "Oportunidad - Alquilo cochera con techo",
      description:
        "Buenas, estoy alquilando una cochera subterránea con box para guardar cosas.",
      publishedOn: "21/01/2021 5:00pm",
      expiresOn: "21/01/2022 5:00pm",
      status: "Pausado",
    },
  ],
};
function Comunidad() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col w-full">
            <TableSection sectionTitle="Avisos" dataset={avisos}></TableSection>
            <div className="mt-4"></div>
            <TableSection
              sectionTitle="Marketplace Venta/Compra"
              dataset={products}
            ></TableSection>
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
