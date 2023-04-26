import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme: { elements } }): string => elements.TEXT_PRIMARY};
    background: ${({ theme: { elements } }): string => elements.BG};
    letter-spacing: 0.16px;
  }

  button {
    font-size: 14px;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;
