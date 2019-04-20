import React from 'react'
import { Link } from 'react-router-dom';
import {
    Menu,
    Dropdown
} from 'semantic-ui-react'

const UserOptions = ({ auth, logout, myPath, pathChangePass,mode, to, showMode }) => {
    return (
        <Menu.Menu position='right' >
            <Dropdown item text={auth.user.name}>
                <Dropdown.Menu>
                    {
                        showMode &&
                        <Dropdown.Item as={Link} to={to}>{mode}</Dropdown.Item>
                    }
                    <Dropdown.Item as={Link} to={myPath}>Minha conta</Dropdown.Item>
                    <Dropdown.Item as={Link} to={pathChangePass} >Alterar senha</Dropdown.Item>
                    <Dropdown.Item onClick={logout} >Sair</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    )
}

UserOptions.defaultProps = {
    myPath: '/admin/my-account',
    showMode: true,
}

export default UserOptions