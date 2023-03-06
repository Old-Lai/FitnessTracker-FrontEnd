import {TableCell, TableRow, IconButton } from "@mui/material"
import { useState } from "react"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import React from "react"

import { updateActivity } from "../api/api";

const ActivitiesRow = ({token, activity, reloadActivity}) => {
    const [editMode, setEditMode] = useState(false)
    const [activityName, setActivityName] = useState(activity.name)
    const [activityDes, setActivityDes] = useState(activity.description)

    async function sendEdit(){
        const response = await updateActivity({token, activityId:activity.id, name:activityName, description:activityDes})
        console.log(response)
        setEditMode(false)
        reloadActivity()
    }

    return (
        <React.Fragment>                       
            <TableRow>
                {token ? (!editMode ?
                    <TableCell>
                        <IconButton 
                            onClick={() => setEditMode(true)}
                        >
                            <EditOutlinedIcon/>
                        </IconButton>
                    </TableCell>
                    :
                    <TableCell>
                        <IconButton 
                            onClick={() => {
                                setActivityName(activity.name)
                                setActivityDes(activity.description)
                                setEditMode(false)
                            }}
                        >
                            <CloseIcon/>
                        </IconButton>
                        <IconButton
                            onClick={() => sendEdit()}
                        >
                            <SendIcon/>
                        </IconButton>
                    </TableCell>
                ):
                <TableCell />
                }
                <TableCell>
                    {!editMode? 
                        activity.name :
                        <TextField 
                        label="name" 
                        variant="standard" 
                        value={activityName} 
                        onChange={(e) => {setActivityName(e.target.value)}}
                        sx={{width:"150px"}}
                        />
                    }
                </TableCell>
                <TableCell>
                    {!editMode? 
                        activity.description :
                        <TextField 
                        label="description" 
                        variant="standard" 
                        value={activityDes} 
                        onChange={(e) => {setActivityDes(e.target.value)}}
                        sx={{width:"150px"}}
                        />
                    }
                </TableCell>
            </TableRow>                  
        </React.Fragment>
    )
}

export default ActivitiesRow