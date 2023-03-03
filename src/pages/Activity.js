import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Grid, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { getListOfActivities } from "../api/api"
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ActivitiesRow } from "../components";

const Activity = () => {
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

    useEffect(()=>{
        setIsLoading(true)
        getListOfActivities()
        .then( response => {
            setActivities(response)
            setIsLoading(false)
            console.log(response)
        })
    },[])

    useEffect(() => {
        window.addEventListener('resize', setDimention)
        return(()=>{
            window.removeEventListener('resize', setDimention)
        })
    }, [screenSize])

    function editActivity(activityId){

    }

    function deleteActivity(activityId){

    }

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
                                        <TableCell>
                                            <IconButton
                                                onClick={() => console.log("add")}
                                            >
                                                <AddBoxIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>Activity Name</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activities.map(activity => {
                                        return(
                                            <ActivitiesRow activity={activity}/>
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