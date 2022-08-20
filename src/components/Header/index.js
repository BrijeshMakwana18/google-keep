import styled from "styled-components";
import LightIcon from "../../assets/light";
import DarkIcon from "../../assets/dark";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThemeToggle = styled.div`
  position: absolute;
  right: 10vw;
  align-self: center;
  cursor: pointer;
`;

const TechContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 20%;
`;

const TechImage = styled.img`
  object-fit: contain;
  height: 60px;
  width: 60px;
`;

const Header = ({ changeTheme, theme }) => {
  return (
    <Wrapper>
      <ThemeToggle onClick={() => changeTheme()}>
        {theme === "dark" ? <LightIcon fill={"white"} /> : <DarkIcon />}
      </ThemeToggle>
      <TechContainer>
        <TechImage src="react.png" />
        <TechImage src="firebase.png" />
      </TechContainer>
    </Wrapper>
  );
};

export default Header;
