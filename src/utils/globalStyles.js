import { createGlobalStyle } from "styled-components";

const globalStyles = createGlobalStyle`
@font-face {
    font-family: "Roboto";
    src: url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
}
*{
    margin: 0;
    padding: 0;
}
body{
    display: flex;
    padding: 4vh 10vw 4vh 10vw;
    align-items: center;
    justify-content: center;
    font-family: 'QuickSand', sans-serif;
}
`;

export default globalStyles;
