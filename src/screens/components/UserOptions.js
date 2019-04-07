import React from 'react'
import { Link } from 'react-router-dom';
import { 
    Menu,
    Dropdown
 } from 'semantic-ui-react'

const UserOptions = ({ auth, logout, path }) => {
    return(
        <Menu.Menu position='right' >
        <Dropdown item text={ auth.user.name }>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to={path}>Minha conta</Dropdown.Item>
                <Dropdown.Item>Alterar senha</Dropdown.Item>
                <Dropdown.Item onClick={logout} >Sair</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    )
}

UserOptions.defaultProps = {
    path: '/my-account'
}

export default UserOptions
