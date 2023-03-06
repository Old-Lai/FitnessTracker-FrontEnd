import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Grid, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { getListOfActivities } from "../api/api"
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ActivitiesRow } from "../components";
import { CreateActivityRow } from "../components";
import { useOutletContext } from "react-router"



const Activity = () => {
    const { token } = useOutletContext()
    const [activities, setActivities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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

    function reloadActivity(){
        getListOfActivities()
        .then( response => {
            setActivities(response.reverse())
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        setIsLoading(true)
        reloadActivity()
    },[])

    useEffect(() => {
        window.addEventListener('resize', setDimention)
        return(()=>{
            window.removeEventListener('resize', setDimention)
        })
    }, [screenSize])

    return(
        <div>
            <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '80vh' }}
            >
                {isLoading && <h1>Loading...</h1>}
                {!isLoading && activities && <h2>Activities table</h2>}
                {!isLoading && activities && 
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
                                        <TableCell>Activity Name</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {createMode && <CreateActivityRow token={token} reloadActivity={reloadActivity} setCreateMode={setCreateMode}/>}
                                    {activities.map(activity => {
                                        return(
                                            <ActivitiesRow token={token} activity={activity} reloadActivity={reloadActivity}key={activity.id}/>
                                        )
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

export default Activity