import styled from "styled-components"
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useEffect, useContext, useState } from "react";

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
            items.data.
            </Header>
        </>
    )

}

const Header = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82px;
    img {
        height: 50px;
    }

`