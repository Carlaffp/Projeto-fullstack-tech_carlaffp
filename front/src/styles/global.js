import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        --font-primary: 'Inter', sans-serif;
        --color-primary: #778da9ff;
        --color-primary-focus: #1b263bff;
        --color-secondary:#415a77ff;
        --color-grey-0:#e0e1ddff;
        --color-grey-2:#343B41;
        --color-black:#0d1b2aff;
        --color-black-2:
        --color-sucess: #3FE864;
        --color-negative: #59323F;
        --color-white:#ffff;
    }

    body{
      background: var(--color-secondary);
    
    }
    
`;

