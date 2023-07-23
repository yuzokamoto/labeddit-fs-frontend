import styled from "styled-components"
import { useEffect, useState } from "react";
import { TOKEN_NAME } from "../constants/constants";
import { goToLoginPage, goToPostsPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import LoginLogoIcon from "../svgs/login-logo.svg"

export const PostsPageContainer = styled.main`
  height: 100%;
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-x: hidden;
  overflow-y: scroll;
`

export const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 8vh;

  #logo {
    width: 152px;
  }
`

export const MessageSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 2rem;

  h1 {
    background-color: #EDEDED;
    color: #323941;
    width: 100%;
    height: 130px;
    margin: 0.5rem 0;
    padding: 10px;
    font-size: 18px;
  }

  p {
    color: #323941;
    font-size: 24px;

    span {
      font-weight: bold;
    }
  }
`

export const PostsSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export default function NotFoundPage() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (countdown <= 0) {
    if (window.localStorage.getItem(TOKEN_NAME)) {
      goToPostsPage(navigate)
    } else {
      goToLoginPage(navigate)
    }
  }

  return (
    <PostsPageContainer>
      <HeaderSection>
        <img id="logo" src={LoginLogoIcon} alt="Logo da Labenu" />
      </HeaderSection>

      <MessageSection>
        <h1>Página não encontrada</h1>
        <p>Redirecionando em <span>{countdown}</span> segundos.</p>
      </MessageSection>
    </PostsPageContainer>
  );
}
