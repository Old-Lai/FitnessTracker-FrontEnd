import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { getMe, getUsersRoutine } from "../api/api"
import { RoutinesRow } from "../components"

const MyRoutine = () => {
    const { token } = useOutletContext()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [routines, setRoutines] = useState([])

    const [screenSize, getDimention] = useState({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight
    })

    const setDimention = () => {
        getDimention({
            dynamicWidth: window.innerWidth,
            dynamicHeight: window.innerHeight
        })
    }

    useEffect(()=>{
        setIsLoading(true)
        getMe({token})
        .then(async response => {
            setUser({id:response.id, username:response.username})
            setIsLoading(false)
            
            setRoutines(await getUsersRoutine({token: token, username: response.username}))
        })
    },[token])

    useEffect(() => {
        window.addEventListener('resize', setDimention)
        return(()=>{
            window.removeEventListener('resize', setDimention)
        })
    }, [screenSize])

    return(
        <div>
            {isLoading && <h1>Loading....</h1>}
            {/* {!isLoading && routines && <RoutinesRow routineList={routines}/>} */}
            <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '80vh' }}
            >
                {!isLoading && routines && <h2>{user.username}'s routine</h2>}
                {!isLoading && routines && 
                    <Paper sx={{ width: screenSize.dynamicWidth *0.8, overflow: 'hidden' }}>
                        <TableContainer sx={{maxHeight:screenSize.dynamicHeight *0.8}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Creator Name</TableCell>
                                        <TableCell align="left">Routine Name</TableCell>
                                        <TableCell align="left">Goal</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {routines.map(routine => {
                                        return <RoutinesRow routine={routine}/>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                }
            </Grid>
        </div>
    )
}

export default MyRoutine