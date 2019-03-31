import React from 'react'
import { 
    Menu,
    Dropdown
 } from 'semantic-ui-react'

const UserOptions = ({ auth, logout  }) => {
    return(
        <Menu.Menu position='right' >
        <Dropdown item text={ auth.user.name }>
            <Dropdown.Menu>
                <Dropdown.Item>Minha conta</Dropdown.Item>
                <Dropdown.Item>Alterar senha</Dropdown.Item>
                <Dropdown.Item onClick={logout} >Sair</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    )
}

export default UserOptions
