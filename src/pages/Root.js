import { Outlet } from "react-router-dom"
import { useState } from "react"
import { NavBar } from "../components"

const Root = () => {
    const [token, setToken] = useState(localStorage.getItem('Token'))
    return(
        <div>
            <header>
                <NavBar token={token} setToken={setToken}/>
            </header>
            <main>
                <Outlet context={{token, setToken}}/>
            </main>
        </div>
    )
}

export default Root