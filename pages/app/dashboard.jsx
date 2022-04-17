import React, { useEffect, useState } from "react";
import Footer from "../../components/dashboard/footer";
import Layout from "../../components/layout";
import MainSection from "../../components/dashboard/mainSection";
import Tile from "../../components/dashboard/tile";

function DashboardPage() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div>
          <MainSection>
            <Tile title="Edificios" value="23"></Tile>
            <Tile title="Agentes" value="250"></Tile>
            <Tile title="Morosidad" value="25%"></Tile>
          </MainSection>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;
