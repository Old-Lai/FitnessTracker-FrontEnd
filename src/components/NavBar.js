import { Link } from "react-router-dom"
import { Breadcrumbs, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NavBar = ({token, setToken}) => {
    const navigate = useNavigate()

    function logoutUser(e){
        localStorage.removeItem('Token')
        setToken('')
        navigate('/')
    }
    return(
        <nav>
            <Breadcrumbs>
                <Link to="/">Home</Link>
                {token && <Link to="myRoutine">My Routine</Link>}
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