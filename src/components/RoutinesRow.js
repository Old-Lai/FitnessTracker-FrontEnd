import { useState } from "react"
import { TableCell, TableRow, Collapse, IconButton, Box, Typography, Table, TableHead, TableBody } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from "react";
const RoutinesRow = (props)=>{
    const { routine } = props
    const [open, setOpen] = useState(false)
    return(
        <React.Fragment>
            <TableRow key={routine.id}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{routine.creatorName}</TableCell>
                <TableCell>{routine.name}</TableCell>
                <TableCell>{routine.goal}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Activities
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="center">Duration</TableCell>
                                    <TableCell align="center">Count</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {routine.activities && routine.activities.map((activity) => (
                                                            <TableRow key={activity.id}>
                                                            <TableCell>
                                                                {activity.name}
                                                            </TableCell>
                                                            <TableCell>{activity.description}</TableCell>
                                                            <TableCell align="center">{`${activity.duration} min`}</TableCell>
                                                            <TableCell align="center">
                                                                {activity.count}
                                                            </TableCell>
                                                            </TableRow>
                                                        ))
                                }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default RoutinesRow