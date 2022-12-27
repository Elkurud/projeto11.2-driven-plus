import logo from "../assets/Logo.png"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

    
export default function Login() {

    const { token, setAndPersistToken } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {if(token){navigate("/subscriptions")}}, [])

    function submit(event) {
        event.preventDefault();
        
        const login = { email, password }
        const request = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", login);

        request.then(response => {
            setAndPersistToken(response.data.token);
            console.log(response.data);
            if(response.data.membership == null){
                navigate("/subscriptions")
            }else{navigate("/home")}
        })
        request.catch(err => alert(err.response.data.message))

    }

    return(

        <Tela1>
            <Logo src={logo} />
            <form onSubmit={submit}>
                <Inp value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder="E-mail" required/>
                <Inp value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder="Senha" required/>
                <Butt type='submit' value="ENTRAR"/>
            </form>
            <Link to={`/sign-up`}> <Cadastro>Não possuí uma conta? Cadastre-se</Cadastro> </Link>
        </Tela1>

    )

}

const Tela1 = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
        form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

`

const Logo = styled.img`

    margin-top: 134px;
    margin-bottom: 100px;

`

const Inp = styled.input`

    background-color: #ffffff;
    width: 299px;
    height: 52px;
    box-sizing: border-box;
    border-radius: 8px;
    margin-bottom: 16px;
    border: 0px;
    padding-left: 14px;
    &::placeholder{
        color: #7e7e7e;
        font-weight: 400;
        font-size: 14px;
    }

`

const Butt = styled.input`

    margin-top: 8px;
    margin-bottom: 24px;
    background-color: #ff4791;
    color: #ffffff;
    height: 52px;
    width: 299px;
    border: 0px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Cadastro = styled.p`

    color: #ffffff;
    font-size: 14px;
    text-decoration-line: underline;

`