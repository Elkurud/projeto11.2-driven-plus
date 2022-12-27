import styled from "styled-components"
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import person from "../assets/person.png";

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

export default function Home() {

    const [items, setItems] = useState([]);
    const { config } = useContext(UserContext);

    useEffect(() => {

        const request = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/1", config);

        request.then(response => {setItems(response.data); console.log(items)});
        request.catch(err => alert(err.response.data.message));

    }, []);

    return (
        <>
            <Header>
                <img src={frustracao.image} />
                <img src={person} />
            </Header>
            <Recept>
                Ola, Fulano
            </Recept>
            <Perks>
                {frustracao.perks.map((f) => <Perk>{f.title}</Perk>)}
            </Perks>
            <Footer>
                <Perk>
                    Mudar Plano
                </Perk>
                <PerkCancel>
                    Cancelar Plano
                </PerkCancel>
            </Footer>
        </>
    )

}

const Footer = styled.div`

    position: fixed;
    bottom: 12px;
    left: 38px;

`

const Header = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82px;
    img {
        height: 50px;
    }

`

const Perks = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

`

const Recept = styled.div`

    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    margin-bottom: 53px;

`

const Perk = styled.a`

    width: 299px;
    height: 52px;
    background-color: #ff4791;
    color: #ffffff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

`
const PerkCancel = styled.a`

    width: 299px;
    height: 52px;
    background-color: #FF4747;
    color: #ffffff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

`