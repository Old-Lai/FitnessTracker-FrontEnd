import { useState } from "react"
import { TableCell, TableRow, Collapse, IconButton, Box, Typography, Table, TableHead, TableBody } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from "react";
import { removeRoutine } from "../api/api";
import { updateRoutine } from "../api/api";
import { RoutineActivityTable } from ".";

const RoutinesRow = ({routine, reloadRoutine, token, atMyProfile = false})=>{
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [routineName, setRoutineName] = useState(routine.name)
    const [routineGoal, setRoutineGoal] = useState(routine.goal)
    const [isPublic, setIsPublic] = useState(routine.isPublic)

    async function sendRemoveRoutine(){
        const response = await removeRoutine({token, routineId:routine.id})
        reloadRoutine()
    }
    
    return(
        <React.Fragment>
            <TableRow key={routine.id}>
                <TableCell sx={{width:"120px"}}>
                    {atMyProfile && !editMode &&
                        <React.Fragment>
                            <IconButton
                            onClick={()=> sendRemoveRoutine()}
                            >
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton
                            onClick={()=> setEditMode(true)}
                            >
                                <EditOutlinedIcon/>
                            </IconButton>
                        </React.Fragment>
                    }
                    {!editMode &&
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    }
                    {editMode &&
                        <React.Fragment>
                            <IconButton 
                                onClick={() => {
                                    setRoutineName(routine.name)
                                    setRoutineGoal(routine.goal)
                                    setIsPublic(routine.isPublic)
                                    setEditMode(false)
                                }}
                            >
                                <CloseIcon/>
                            </IconButton>
                            <IconButton
                                onClick={async () => {
                                    await updateRoutine({token, routineId:routine.id, name:routineName, goal:routineGoal, isPublic})
                                    setEditMode(false)
                                    reloadRoutine()
                                }}
                            >
                                <SendIcon/>
                            </IconButton>
                        </React.Fragment>
                    }
                </TableCell>
                {!editMode?
                    <React.Fragment>
                        <TableCell>{routine.creatorName}</TableCell>
                        <TableCell>{routine.name}</TableCell>
                        <TableCell>{routine.goal}</TableCell>
                        {atMyProfile && <TableCell align="center">{routine.isPublic? "Public" : "Private"}</TableCell>}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <TableCell>{routine.creatorName}</TableCell>
                        <TableCell>
                            <TextField 
                                label="name" 
                                variant="standard" 
                                value={routineName} 
                                onChange={(e) => {setRoutineName(e.target.value)}}
                                sx={{width:"150px"}}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField 
                                label="name" 
                                variant="standard" 
                                value={routineGoal} 
                                onChange={(e) => {setRoutineGoal(e.target.value)}}
                                sx={{width:"150px"}}
                            />
                        </TableCell>
                        <TableCell>
                            <Select
                                value={isPublic}
                                label="Age"
                                onChange={(e)=>setIsPublic(e.target.value)}
                            >
                                <MenuItem value={true}>Public</MenuItem>
                                <MenuItem value={false}>Private</MenuItem>
                            </Select>
                        </TableCell>
                    </React.Fragment>
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Activities
                            </Typography>
                            <RoutineActivityTable routine={routine} atMyProfile={atMyProfile} reloadRoutine={reloadRoutine} token={token}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default RoutinesRow