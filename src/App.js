import { useState } from "react";
import { AddNote, Header } from "./components";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./theme/colors";
import GlobalStyles from "./utils/globalStyles";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <ThemeProvider theme={theme === "dark" ? dark : light}>
      <GlobalStyles />
      <Header theme={theme} changeTheme={() => changeTheme()} />
      <AddNote />
    </ThemeProvider>
  );
};

export default App;
