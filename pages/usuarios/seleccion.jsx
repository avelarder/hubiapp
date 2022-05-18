import React from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
const Container = tw.div`
    flex
    items-center
    justify-center
    w-full
    h-screen
    flex-wrap

`;

const CellContainer = tw.div`
    flex
    w-96
    m-4
    items-center
    shadow-lg
    shadow-black
`;
const Button = tw.button`
    flex 
    flex-col
    w-96
    items-center
    py-4
    bg-purple-600
    hover:bg-purple-700
    rounded-lg
    text-3xl
    font-bold
    text-white
    shadow-inner
    
`;
const ButtonImage = tw.img`
    flex
    w-64
    h-64
    object-cover
    mb-4
`;
function UserSelectorPage() {
  const router = useRouter();

  return (
    <Container>
      <CellContainer>
        <Button onClick={() => router.push("/usuarios/residentes/crear")}>
          <ButtonImage
            src={"/illustrations/undraw_working_late_re_0c3y.svg"}
          ></ButtonImage>
          HUBI
          <br />
          Residentes
        </Button>
      </CellContainer>
      <CellContainer>
        <Button onClick={() => router.push("/usuarios/colaboradores/crear")}>
          <ButtonImage
            src={"/illustrations/undraw_co_workers_re_1i6i.svg"}
          ></ButtonImage>
          HUBI <br />
          Colaboradores
        </Button>
      </CellContainer>
    </Container>
  );
}

export default UserSelectorPage;
