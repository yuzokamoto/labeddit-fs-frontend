import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import FooterBarIcon from "../svgs/footer-bar.svg"
import { goToPostsPage, goToSignupPage } from "../routes/coordinator"
import { BASE_URL, TOKEN_NAME } from "../constants/constants"
import HeaderBar from "../components/HeaderBar"

export const SignupPageContainer = styled.main`
  height: 100%;
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  #logo {
    width: 152px;
  }

  h1 {
    font-size: 16px;
  }
`

export const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #logo {
    width: 152px;
  }

  h1 {
    font-size: 33px;
    margin: 0.5rem 0;
  }
`

export const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    input {
      color: #323941;
      width: 100%;
      max-width: 365px;
      height: 60px;
      margin: 0.5rem 0;
      padding: 10px;
      border: 1px solid lightgray;
    }
  }

  button {
    width: 100%;
    max-width: 365px;
    height: 51px;
    border-radius: 25px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    border: none;
  }

  button.primary {
    background-color: #FC8B6B;
    color: white;
    margin-top: 3rem;
  }

  .hr-line {
    margin: 1rem 0;
  }
`

const TermsBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;

  section {
    display: flex;
    align-items: center;
    justify-content: center;

    .checkbox {
      width: 18px;
    }

    label {
      margin-left: 0.5rem;
    }
  }

  h2, label {
    font-size: 14px;
    font-weight: 400;
  }

  span {
    color: #4088CB;
  }
`

export default function SignupPage() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_NAME)
    if (token) {
      goToPostsPage(navigate)
    }
  }, [])

  const signup = (e) => {
    e.preventDefault()

    const body = {
      nickname: nickname,
      email: email,
      password: password
    }

    axios.post(BASE_URL + "/users/signup", body)
      .then(res => {
        window.localStorage.setItem(TOKEN_NAME, res.data.token)
        goToPostsPage(navigate)
      })
      .catch(err => console.log(err))
  }

  return (
    <SignupPageContainer>
      <HeaderBar />

      <HeaderSection>
        <h1>Olá, boas vindas ao LabEddit ;)</h1>
      </HeaderSection>

      <FormSection>
        <form onSubmit={signup}>
          <input
            placeholder="Apelido"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />

          <input
            placeholder="E-mail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <TermsBox>
            <h2>Ao continuar, você concorda com o nosso
              <span>{" "}Contrato de usuário</span> e nossa
              <span>{" "}Política de Privacidade</span>
            </h2>
            <section>
              <input
                className="checkbox"
                type="checkbox"
                name="termsAndConditions"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                required
              />
              <label htmlFor="termsAndConditions">
                Eu concordo em receber emails sobre coisas legais no Labeddit
              </label>
            </section>
          </TermsBox>

          <button
            className="primary"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </FormSection>

      <img id="footer-bar" src={FooterBarIcon} alt="Barra horizontal de rodapé" />
    </SignupPageContainer>
  );
}
