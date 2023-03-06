import { TableCell, TableRow, IconButton, Table, TableHead, TableBody } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { useState, useEffect } from "react";
import React from "react";
import { getListOfActivities } from "../api/api";
import { attachActivityToRoutine } from "../api/api";
import RoutineActivityRow from "./RoutineActivityRow";

const RoutineActivityTable = ({routine, atMyProfile, reloadRoutine, token}) => {
    const [createMode,setCreateMode] = useState(false)
    const [activities, setActivities] = useState([])
    const [chosenActivity, setChosenActivity] = useState('')
    const [duration, setDuration] = useState('')
    const [count, setCount] = useState('')

    useEffect(()=>{
        getListOfActivities()
        .then(response=>{
            setActivities(response)
        })
    },[])

    async function sendAttachActivity(){
        // console.log(chosenActivity)
        const response = await attachActivityToRoutine({routineId:routine.id, activityId:chosenActivity.id, count, duration})
        // console.log(response)
        setChosenActivity('')
        setCount('')
        setDuration('')
        reloadRoutine()
    }


    return (
        <Table size="small" aria-label="purchases">
            <TableHead>
                <TableRow>
                    {atMyProfile &&
                        <TableCell align="center" sx={{ minWidth:'80px'}}>
                            <IconButton onClick={()=>setCreateMode(true)}>
                                <AddBoxIcon />
                            </IconButton>
                        </TableCell>
                    }
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Count</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {createMode &&
                    <TableRow>
                        <TableCell>
                            <IconButton onClick={()=>setCreateMode(false)}>
                                <CloseIcon />
                            </IconButton>
                            <IconButton onClick={()=>sendAttachActivity()}>
                                <SendIcon/>
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <Select
                            value={chosenActivity}
                            label="activity"
                            onChange={(e)=>setChosenActivity(e.target.value)}
                            sx={{minWidth:'150px'}}
                            >
                                <MenuItem value=''>None</MenuItem>
                                {activities && activities.map((activity)=>(
                                    <MenuItem value={activity} key={activity.id}>{activity.name}</MenuItem>
                                ))}
                            </Select>
                        </TableCell>
                        <TableCell sx={{minWidth:'300px'}}>{chosenActivity && chosenActivity.description}</TableCell>
                        <TableCell>
                            <TextField label="Goal" variant="standard" value={duration} onChange={(e) => {setDuration(e.target.value)}}/>
                        </TableCell>
                        <TableCell>
                            <TextField label="Count" variant="standard" value={count} onChange={(e) => {setCount(e.target.value)}}/>
                        </TableCell>
                    </TableRow>
                }
                {routine.activities && routine.activities.map(activity=>(
                    <RoutineActivityRow activity={activity} token={token} reloadRoutine={reloadRoutine} atMyProfile={atMyProfile} key={activity.id}/>
                ))
                    
                }
            </TableBody>
        </Table>
    )
}

export default RoutineActivityTable