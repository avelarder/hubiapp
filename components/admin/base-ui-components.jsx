import tw from "tailwind-styled-components";

const Container = tw.div`
    flex
    flex-col
    items-center
    justify-center
    w-full
    h-screen
`;

const PageHeader = tw.div`
    flex
    text-purple-700
    font-bold
    text-center
    justify-center
    text-3xl
    mt-4
`;

const VerticalContainer = tw.div`
    flex
    flex-col
    md:w-1/2
    w-full
    p-2
`;

const StyledInput = tw.input`
    border-1
    border-purple-400
    border-solid
    rounded-full
    h-10
    px-4
    shadow-sm
    
`;

const Divider = tw.div`
    flex
    w-full
    h-1
    bg-gradient-to-r
    from-purple-200
    to-purple-50
    my-4
`;

const StyledButton = tw.button`
    bg-gradient-to-tr
    from-purple-500
    to-purple-600 
    border-1
    hover:border-gray-300
     w-40
     h-8
     my-2
     rounded-lg 
     text-white 
    text-sm
     shadow-sm`;

const ScrollableContainer = tw.div`
    mt-2 
    w-full 
    flex 
    flex-wrap
    overflow-y-scroll
    md:justify-start
    xs:justify-center`;

export {
  Container,
  PageHeader,
  VerticalContainer,
  StyledInput,
  Divider,
  StyledButton,
  ScrollableContainer,
};
