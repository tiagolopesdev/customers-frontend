import styled from "styled-components";

export const ScroolCustom = styled.div`
  scroll-behavior: smooth;
  overflow-y: auto;
  height: inherit;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(159 159 159);
    border-radius: 10px;
  }
`;