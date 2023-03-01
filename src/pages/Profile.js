import { useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { getMe, getUsersRoutine } from "../api/api"
import { RoutinesRow } from "../components"

const Profile = () => {
    const { token } = useOutletContext()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [routines, setRoutines] = useState([])

    useEffect(()=>{
        setIsLoading(true)
        getMe({token})
        .then(async response => {
            setUser({id:response.id, username:response.username})
            setIsLoading(false)
            
            setRoutines(await getUsersRoutine({token: token, username: response.username}))
        })
    },[token])

    return(
        <div>
            {isLoading ? <h1>Loading....</h1> : <h1>{user.username}'s profile</h1>}
            {/* {!isLoading && routines && <RoutinesRow routineList={routines}/>} */}
        </div>
    )
}

export default Profile