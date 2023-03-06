import { TableCell, TableRow, IconButton } from "@mui/material"
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { createRoutine } from "../api/api";

const CreateRoutineRow = ({token, setCreateMode, reloadRoutine, user}) => {
    const [routineName, setRoutineName] = useState('')
    const [routineGoal, setRoutineGoal] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const [message, setMessage] = useState({status:'', message:''})

    async function callCreateRoutine(){
        const response = await createRoutine({token, name:routineName, goal:routineGoal, isPublic})
        setRoutineName('')
        setRoutineGoal('')
        reloadRoutine()
    }

    function closeCreateMode(){
        setRoutineGoal('')
        setRoutineName('')
        setCreateMode(false)
    }

    return(
        <TableRow>
            <TableCell align="center">
                <IconButton onClick={()=>closeCreateMode()}><CloseIcon/></IconButton>
                <IconButton onClick={()=>callCreateRoutine()}><SendIcon/></IconButton>
            </TableCell>
            <TableCell>
                {user.username}
            </TableCell>
            <TableCell>
                <TextField label="Routine name" variant="standard" value={routineName} onChange={(e) => {setRoutineName(e.target.value)}}/>
            </TableCell>
            <TableCell>
                <TextField label="Goal" variant="standard" value={routineGoal} onChange={(e) => {setRoutineGoal(e.target.value)}}/>
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
        </TableRow>
    )
}

export default CreateRoutineRow