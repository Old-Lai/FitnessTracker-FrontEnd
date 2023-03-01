import { useState } from "react"
import { useOutletContext } from "react-router"
import { loginUser } from "../api/api"
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const { setToken } = useOutletContext()

    async function submitLogin(e){
        e.preventDefault()
        setMessage('Loading...')
        const response = await loginUser({username, password})
        console.log(response)
        setMessage(response.message)
        if(response.token){
            localStorage.setItem('Token', response.token)
            setToken(localStorage.getItem('Token'))
        }
        setUsername('')
        setPassword('')
    }

    return(
        <section className="login">
            <h2 className="title">Login User</h2>
            <p className="loginMessage">{message}</p>
            <form id="loginForm" onSubmit={submitLogin}>
                <p>Username:</p>
                <input 
                    type="text"
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                />

                <p>Password:</p>
                <input 
                    type="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
            </form>
            <button type="submit" form="loginForm" value="submit">Login</button>
        </section>
    )
}

export default Login