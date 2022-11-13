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
    w-full
`;

const VerticalContainer = tw.div`
    flex
    flex-col
    w-full
    p-2
    justify-center
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
    from-purple-700
    to-purple-400 
    border-1
    hover:border-purple-200
    w-40
    h-10
    my-2
    rounded-lg 
    text-white 
    text-sm
    font-regular
    shadow-sm`;

const StateStyledButton = tw.button`
    bg-gradient-to-tr
    border-1
    from-purple-700
    to-purple-400 
    hover:border-purple-200
    w-40
    h-10
    my-2
    rounded-lg 
    text-white 
    text-sm
    font-regular
    shadow-sm
    
    ${(props) =>
      props.disabled &&
      `
      from-purple-300
      to-purple-400 
      `}
    `;

const StyledSecondaryButton = tw.button`
    bg-gradient-to-tr
    from-gray-400
    to-gray-300 
    border-1
    hover:border-gray-200
    w-40
    h-8
    my-2
    rounded-lg 
    text-white 
    text-sm
    font-regular
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
  StyledSecondaryButton,
  ScrollableContainer,
  StateStyledButton,
};
