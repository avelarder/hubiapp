import React, { useState } from "react";
import {
  Container,
  PageHeader,
  VerticalContainer,
  StyledInput,
  Divider,
  StyledButton,
  ScrollableContainer,
} from "../../components/admin/base-ui-components";

import { useRouter } from "next/router";

function AdminDashboardPage() {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const listOfTask = [
    {
      code: "REGISTER_COLLABORATOR",
      title: "Registrar colaborador para una Ubicación",
      description:
        "Registre administradores, conserjes, personal de limpieza y seguridad a una locación en particular.",
      path: "/admin/actions/pick-location",
    },
    {
      code: "SUSPEND_LOCATION_COLLABORATOR",
      title: "Suspender acceso a una Ubicación",
      path: "/admin/actions/suspend-collaborator",
      description:
        "Suspende el acceso a una locacion en particular. El usuario en su próximo ingreso de sesión si no tiene alguna otra locación asignada no podrá acceder al dashboard.",
    },
  ];
  return (
    <Container>
      <PageHeader>Central de Operaciones</PageHeader>
      <VerticalContainer>
        <StyledInput
          placeholder="Ingrese un texto para filtrar la lista de tareas."
          onChange={(e) => setFilter(e.currentTarget.value)}
        ></StyledInput>
      </VerticalContainer>

      {listOfTask
        .filter((x) => x.title.toLowerCase().includes(filter))
        .map((task) => (
          <ScrollableContainer
            key={task.code}
            className="mt-2 w-full flex justify-around items-center"
          >
            <VerticalContainer>
              <div className="w-min-96 font-bold text-xl">{task.title}</div>
              <div className="flex w-full">{task.description}</div>
              <StyledButton onClick={(e) => router.push(task.path)}>
                Ir
              </StyledButton>
              <Divider></Divider>
            </VerticalContainer>
          </ScrollableContainer>
        ))}
    </Container>
  );
}

export default AdminDashboardPage;
