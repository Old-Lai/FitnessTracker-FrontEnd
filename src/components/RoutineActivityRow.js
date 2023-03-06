import { TableCell, TableRow, IconButton } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { removeRoutineActivity, updateRoutineActivity } from "../api/api";
import { useState } from "react";
import React from "react";

const RoutineActivityRow = ({activity, token, reloadRoutine, atMyProfile}) => {
    const [duration, setDuration] = useState('')
    const [count, setCount] = useState('')
    const [editMode, setEditMode] = useState(false)

    return(
        <TableRow key={activity.id}>
            {atMyProfile ?
                <TableCell>
                    {!editMode &&
                        <React.Fragment>
                            <IconButton
                            onClick={async ()=> {
                                await removeRoutineActivity({token, routineActivityId:activity.routineActivityId})
                                reloadRoutine()
                            }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton
                            onClick={()=> {
                                setCount(activity.count)
                                setDuration(activity.duration)
                                setEditMode(true)
                            }}
                            >
                                <EditOutlinedIcon/>
                            </IconButton>
                        </React.Fragment>
                    }
                    {editMode &&
                        <React.Fragment>
                            <IconButton 
                                onClick={() => {
                                    setCount('')
                                    setDuration('')
                                    setEditMode(false)
                                }}
                            >
                                <CloseIcon/>
                            </IconButton>
                            <IconButton
                                onClick={async () => {
                                    await updateRoutineActivity({token, routineActivityId:activity.routineActivityId, count, duration})
                                    setEditMode(false)
                                    reloadRoutine()
                                }}
                            >
                                <SendIcon/>
                            </IconButton>
                        </React.Fragment>
                    }
                </TableCell>
                :
                <TableCell />
            }
            <TableCell>
                {activity.name}
            </TableCell>
            <TableCell>{activity.description}</TableCell>
            {!editMode ?
                <React.Fragment>
                    <TableCell>{`${activity.duration} min`}</TableCell>
                    <TableCell>{activity.count}</TableCell>
                </React.Fragment>
                :
                <React.Fragment>
                    <TableCell>
                        <TextField label="Duration" variant="standard" value={duration} onChange={(e) => {setDuration(e.target.value)}}/>
                    </TableCell>
                    <TableCell>
                        <TextField label="Count" variant="standard" value={count} onChange={(e) => {setCount(e.target.value)}}/>
                    </TableCell>
                </React.Fragment>
            }
        </TableRow>
    )
}

export default RoutineActivityRow