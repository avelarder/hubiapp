import React, { useState } from "react";
import Card from "../../../components/common/card";
import {
  Container,
  PageHeader,
  VerticalContainer,
  StyledInput,
  Divider,
  StyledButton,
  ScrollableContainer,
} from "../../../components/admin/base-ui-components";
import { useRouter } from "next/router";
import { paths } from "../../../utils/paths";

function LocationPickerPage() {
  const [filter, setFilter] = useState("");
  const router = useRouter();

  const locations = [
    {
      code: "REGISTER_COLLABORATOR1",
      title: "Registrar colaborador para una Ubicación",
      description:
        "Registre administradores, conserjes, personal de limpieza y seguridad a una locación en particular.",
      image: "/images/building.jpg",
    },
    {
      code: "SUSPEND_LOCATION_COLLABORATOR2",
      title: "Suspender acceso a una Ubicación",
      image: "/images/building.jpg",
      description:
        "Suspende el acceso a una locacion en particular. El usuario en su próximo ingreso de sesión si no tiene alguna otra locación asignada no podrá acceder al dashboard.",
    },
    {
      code: "REGISTER_COLLABORATOR3",
      title: "Registrar colaborador para una Ubicación",
      description:
        "Registre administradores, conserjes, personal de limpieza y seguridad a una locación en particular.",
      image: "/images/building.jpg",
    },
    {
      code: "SUSPEND_LOCATION_COLLABORATOR4",
      title: "Suspender acceso a una Ubicación",
      image: "/images/building.jpg",
      description:
        "Suspende el acceso a una locacion en particular. El usuario en su próximo ingreso de sesión si no tiene alguna otra locación asignada no podrá acceder al dashboard.",
    },
    {
      code: "REGISTER_COLLABORATOR5",
      title: "Registrar colaborador para una Ubicación",
      description:
        "Registre administradores, conserjes, personal de limpieza y seguridad a una locación en particular.",
      image: "/images/building.jpg",
    },
    {
      code: "SUSPEND_LOCATION_COLLABORATOR6",
      title: "Suspender acceso a una Ubicación",
      image: "/images/building.jpg",
      description:
        "Suspende el acceso a una locacion en particular. El usuario en su próximo ingreso de sesión si no tiene alguna otra locación asignada no podrá acceder al dashboard.",
    },
    {
      code: "REGISTER_COLLABORATOR7",
      title: "Chatito colaborador para una Ubicación",
      description:
        "Registre administradores, conserjes, personal de limpieza y seguridad a una locación en particular.",
      image: "/images/building.jpg",
    },
    {
      code: "SUSPEND_LOCATION_COLLABORATOR8",
      title: "Suspender acceso a una Ubicación",
      image: "/images/building.jpg",
      description:
        "Suspende el acceso a una locacion en particular. El usuario en su próximo ingreso de sesión si no tiene alguna otra locación asignada no podrá acceder al dashboard.",
    },
  ];

  return (
    <Container>
      <PageHeader>Seleccione una locación HUBI</PageHeader>
      <VerticalContainer>
        <StyledInput
          placeholder="Ingrese un texto para filtrar la lista de Ubicaciones."
          onChange={(e) => setFilter(e.currentTarget.value)}
        ></StyledInput>
      </VerticalContainer>
      <ScrollableContainer>
        {locations
          .filter((x) => x.title.toLowerCase().includes(filter))
          .map((task) => (
            <div key={task.code} className="inline-flex md:w-1/3 m-4">
              <Card
                buttonLabel={"Seleccionar"}
                description={task.description}
                onButtonClick={() => {
                  router.push(paths.ADMIN.REGISTER_COLLABORATOR(task.code));
                }}
                title={task.title}
                imageSrc={task.image}
              ></Card>
            </div>
          ))}
      </ScrollableContainer>
    </Container>
  );
}

export default LocationPickerPage;
