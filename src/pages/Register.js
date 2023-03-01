import { useState } from "react"
import { useOutletContext } from "react-router"
import { registerUser } from "../api/api"

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const {setToken} = useOutletContext()

    async function submitRegisteration(e){
        e.preventDefault()
        const capCharMap = password.split('').map(char => char === char.toUpperCase())
        const lowCharMap = password.split('').map(char => char === char.toLowerCase())
        if(password.length <= 8 || !capCharMap.includes(true) || !lowCharMap.includes(true)){
            setMessage('Password must include upper, lower case letters and longer than 8 characters')         
        } else {
            setMessage('Loading...')
            const response = await registerUser({username, password})
            setMessage(response.message)
            if(response.token){
                localStorage.setItem('Token', response.token)
                setToken(localStorage.getItem('Token'))
            }
            setUsername('')
            setPassword('')
        }
    }

    return(
        <section className="register">
            <h2 className="title">Register User</h2>
            <p className="registerMessage">{message}</p>
            <form id="registerForm" onSubmit={submitRegisteration}>
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
            <button type="submit" form="registerForm" value="submit">Register</button>
        </section>
    )
}

export default Register