import styled from "styled-components";
import { devices } from "../Utils/sizesDevices";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const ElementLink = styled(Link)`
  color: #6C757D;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: small;

  &:hover {
    font-weight: 700;
    color: #0D6EFD;
  }
`

interface ElementButtonProps {
  color?: string
  backgroundColor?: string
}

export const ElementButton = styled(Button)<ElementButtonProps>`
  color: #6C757D;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: small;
  text-transform: none;
  
  &:hover {
    font-weight: 700;
    text-transform: none;
  }
`

export const GroupButtonsActions = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #FFFFFF;
  display: flex;
  padding: 10px;
  width: 100dvw;
  height: 7dvh;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-evenly;

  @media ${devices.tablet} {
    max-width: 100dvw;
  }

  @media ${devices.laptop} {
    max-width: 100dvw;
  }

  @media ${devices.mobileL} {
    max-width: 96dvw;
  }
`

export const ScroolCustom = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow-y: auto;
  scroll-behavior: auto;

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