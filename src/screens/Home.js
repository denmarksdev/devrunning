import React from 'react';
import Header from '../Header';
import {
    Container,
    Image,
} from 'semantic-ui-react'

import logo from '../assets/logo-home.png'

const Home = () => {
    return (
        <Container>
            <Header />
            <h1>Seja bem-vindo!</h1>
            <Image centered src={logo} size='medium' />
        </Container>
    )
}

export default Home