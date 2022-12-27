import styled from "styled-components";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function submit(event) {
        event.preventDefault();

        const request = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", { email, name, cpf, password })

        request.then(() => navigate("/"));
        request.catch(err => alert(err.response.data.message))
    }

    return(
        <Tela1>
            <Form onSubmit={submit}>
                <Inp value={name} onChange={e => setName(e.target.value)} type='name' placeholder="Nome" required></Inp>
                <Inp value={cpf} onChange={e => setCpf(e.target.value)} type='text' placeholder="CPF" required></Inp>
                <Inp value={email} onChange={e => setEmail(e.target.value)} type='email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="E-mail" required></Inp>
                <Inp value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder="Senha" required></Inp>
                <Butt type='submit' value="CADASTRAR"/>
            </Form>
            <Link to={`/`}> <Cadastrar>Já possuí uma conta? Entre</Cadastrar> </Link>
        </Tela1>
    )


}

const Tela1 = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 148px;

`

const Form = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;

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
    &:hover{
        cursor: pointer;
    }

`

const Cadastrar = styled.p`

    color: #ffffff;
    font-size: 14px;
    text-decoration-line: underline;

`