import { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios"
import styled from "styled-components";

export default function Subs() {

    const [items, setItems] = useState([]);
    const { config } = useContext(UserContext);

    useEffect(() => {

        const request = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config);

        request.then(response => {setItems(response.data)});
        request.catch(err => alert(err.response.data.message));

    }, []);


    return(
        <Container>
            <h1>Escolha seu Plano</h1>
            {items.map((f) => <StyledLink to={`/subscriptions/${f.id}`} >
                <Plano>
                    <img src={f.image} alt=""/>
                    R$ {f.price}
                </Plano>
            </StyledLink>)}
        </Container>
    )

}

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    h1 {
        font-weight: 700;
        font-size: 32px;
        margin-top: 29px;
        margin-bottom: 24px;
    }

`

const Plano = styled.div`

    width: 290px;
    height: 180px;
    border: 3px solid #7e7e7e;
    border-radius: 12px;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 16px;
    margin-bottom: 10px;
    img {
        width: 139px;
    }

`

const StyledLink = styled(Link)`

    text-decoration: none;
    color: #ffffff;

`