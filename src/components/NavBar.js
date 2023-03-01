import { Link } from "react-router-dom"
import { Breadcrumbs, Button } from "@mui/material"
const NavBar = ({token, setToken}) => {
    function logoutUser(e){
        localStorage.removeItem('Token')
        setToken('')
    }
    return(
        <nav>
            <Breadcrumbs>
                <Link to="/">Home</Link>
                {token && <Link to="profile">Profile</Link>}
                <Link to="routine">Routine</Link>
                <Link to="activity">Activity</Link>
                {token && <Button id="logout" onClick={e=>logoutUser(e)}>Logout</Button>}
                {!token && <Link to="register">Register</Link>}
                {!token && <Link to="login">Login</Link>}
            </Breadcrumbs>
        </nav>
    )
}

export default NavBar