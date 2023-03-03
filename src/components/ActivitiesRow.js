import {TableCell, TableRow, IconButton } from "@mui/material"
import { useState } from "react"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React from "react"

const ActivitiesRow = ({activity}) => {

    return (
        <React.Fragment>                       
            <TableRow>
                <TableCell>
                    <IconButton 
                        onClick={() => console.log(activity.id,"edit")}
                    >
                        <EditOutlinedIcon/>
                    </IconButton>
                    <IconButton
                        onClick={() => console.log("delete")}
                    >
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </TableCell>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.description}</TableCell>
            </TableRow>                  
        </React.Fragment>
    )
}

export default ActivitiesRow