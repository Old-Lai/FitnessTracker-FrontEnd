import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Grid, IconButton } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { getMe, getUsersRoutine } from "../api/api"
import { RoutinesRow } from "../components"
import { CreateRoutineRow } from "../components";

const MyRoutine = () => {
    const { token } = useOutletContext()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [routines, setRoutines] = useState([])
    const [createMode, setCreateMode] = useState(false)

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

    function reloadRoutine() {
        getMe({token})
        .then(async response => {
            setUser({id:response.id, username:response.username})
            setIsLoading(false)
            const routine = await getUsersRoutine({token: token, username: response.username})
            setRoutines(routine.reverse())
        })
    }

    useEffect(()=>{
        setIsLoading(true)
        reloadRoutine()
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
                                        <TableCell style={{width: '80px'}} align="center">
                                            <IconButton onClick={() => setCreateMode(true)}>
                                                <AddBoxIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>Creator Name</TableCell>
                                        <TableCell align="left" >Routine Name</TableCell>
                                        <TableCell align="left">Goal</TableCell>
                                        <TableCell align="center">Is Public</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {createMode && <CreateRoutineRow token={token} setCreateMode={setCreateMode} reloadRoutine={reloadRoutine} user={user}/>}
                                    {routines.map(routine => {
                                        return <RoutinesRow routine={routine} atMyProfile={true} token={token} reloadRoutine={reloadRoutine} key={routine.id}/>
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