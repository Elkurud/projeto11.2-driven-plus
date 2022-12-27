import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { useEffect, useState, useContext } from "react";

export default function Plano() {

    const { planoId } = useParams();
    const { config } = useContext(UserContext);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [securityNumber, setSecurityNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const navigate = useNavigate();
    
    // const [container, setContainer] = useState([]);
    // const [contador, setContador] = useState(0);

    const frustracao = {
        "id": 1,
        "name": "Driven Plus",
        "image": "https://svgshare.com/i/dSP.svg",
        "price": "39.99",
        "perks": [
            {
                "id": 1,
                "membershipId": 1,
                "title": "Solicitar brindes",
                "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            {
                "id": 2,
                "membershipId": 1,
                "title": "Materiais bônus de web",
                "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
        ]
    }
    const [confirmar, setConfirmar] = useState(
        <Confirmacao2>
            <Container2>Tem Certeza que deseja assinar o plano <br/>{frustracao.name}(R$ {frustracao.price})?</Container2>
        </Confirmacao2>);

    // const [items, setItems] = useState([]);

    // useEffect(() => {

    //     const request = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config);

    //     request.then(response => {setItems(response.data)});
    //     request.catch(err => alert(err.response.data.message));

    //     console.log(items);

    // }, []);

    function submit(event) {
        event.preventDefault();
        setConfirmar(
        <Confirmacao>
            <Container2>
                Tem Certeza que deseja assinar o plano <br/>{frustracao.name}(R$ {frustracao.price})?
                <Nao onClick={voltar}>Não</Nao>
                <Sim onClick={() => assinar(event)}>Sim</Sim>
            </Container2>
        </Confirmacao>)
    }
    function voltar() {
        setConfirmar(
            <Confirmacao2>
                <Container2>Tem Certeza que deseja assinar o plano <br/>{frustracao.name}(R$ {frustracao.price})?</Container2>
            </Confirmacao2>)
    }

    function assinar(event) {
        event.preventDefault();
        
        const body = {
            membershipId: 1, cardName, cardNumber, securityNumber, expirationDate
        }

        const request = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", body, config);

        request.then(response => {navigate("/"); console.log(response)});
        request.catch(err => alert(err.response.data.message));

    }
    return(
        <Container>
            {confirmar}
            <img src={frustracao.image} alt=""/>            
            <h1>{frustracao.name}</h1>
            <Beneficios>
            <h2>
                Benefícios:
                <div>
                    {frustracao.perks.map((f) => <h3>{f.id}. {f.title}</h3>)}
                </div>
            </h2>
            <h2>
                Preco:
                <h3>R$ {frustracao.price} cobrados mensalmente</h3>
            </h2>
            </Beneficios>
            <form onSubmit={submit}>
                <Inp value={cardName} onChange={e => setCardName(e.target.value)} type='text' placeholder="Nome impresso no cartão" required/>
                <Inp value={cardNumber} onChange={e => setCardNumber(e.target.value)} type='text' placeholder="Digitos do cartão" required/>
                <Codes><SmallInp value={securityNumber} onChange={e => setSecurityNumber(e.target.value)} type='text' placeholder="Código de segurança" required/>
                <SmallInp value={expirationDate} onChange={e => setExpirationDate(e.target.value)} type='text' placeholder="Validade" required/></Codes>
                <Butt type='submit' value="ASSINAR"/>
            </form>
        </Container>
    )

}

const Nao = styled.button`
    width: 95px;
    height: 52px;
    background-color: #cecece;
    border: 0px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
`

const Sim = styled.button`
    width: 95px;
    height: 52px;
    background-color: #FF4791;
    border: 0px;
    border-radius: 8px;
    margin-left: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
`

const Confirmacao = styled.div`

    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;

`
const Confirmacao2 = styled.div`

    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;

`

const Container2 = styled.div`

    width: 248px;
    height: 210px;
    color: #000000;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    padding-top: 33px;
    padding-left: 22px;
    padding-right: 22px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 12px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

`

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    img {
        margin-top: 87px;
        margin-bottom: 12px;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1{
        font-size: 32px;
        margin-bottom: 22px;
    }
    h2 {
        font-size: 16px;
        margin-bottom: 10px;
    }
    h3 {
        font-size: 14px;
        margin-bottom: 4px;
    }
    div {
    }

`

const Beneficios = styled.div`
width: 299px;
display: flex;
flex-direction: column;
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

const SmallInp = styled.input`

background-color: #ffffff;
width: 145px;
height: 52px;
box-sizing: border-box;
border-radius: 8px;
margin-bottom: 16px;
border: 0px;
padding-left: 7px;
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
const Codes = styled.div`

    display: flex;
    flex-direction: row;
    gap: 9px;

`