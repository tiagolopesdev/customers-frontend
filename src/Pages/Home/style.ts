import styled from "styled-components";
import { devices } from '../../Utils/sizesDevices'


export const GroupButtonsActions = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #1864BA;
  display: flex;
  padding: 10px;
  width: 100dvw;
  height: 10dvh;
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
