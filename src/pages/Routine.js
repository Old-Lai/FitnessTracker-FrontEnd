import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { getPublicRoutine } from "../api/api"
import { RoutinesRow } from "../components"

import React from "react";

const Routine = ()=>{
    const [routines, setRoutines] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {token} = useOutletContext()

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

    function reloadRoutine(){
        getPublicRoutine()
        .then(response => {
            setRoutines(response.reverse())
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        setIsLoading(true)
        reloadRoutine()
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
                {!isLoading && routines && <h2>Routines table</h2>}
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
                                        return <RoutinesRow routine={routine} reloadRoutine={reloadRoutine} token={token} key={routine.id}/>
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

export default Routine