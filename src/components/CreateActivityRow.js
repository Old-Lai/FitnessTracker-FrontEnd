import { TableCell, TableRow, IconButton } from "@mui/material"
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { useState } from "react";
import { createActivity } from "../api/api";

const CreateActivityRow = ({token, setCreateMode, reloadActivity}) => {
    const [activityName, setActivityName] = useState('')
    const [activityDes, setActivityDes] = useState('')
    const [message, setMessage] = useState({status:'', message:''})

    async function callCreateActivity(){
        const response = await createActivity({token, name:activityName, description:activityDes})
        if(response.error){
            setMessage({status:"error", message:`${response.message}`})
            const intervalId = setInterval(() => {
                setMessage({status:'',message:''})
                clearInterval(intervalId)
            }, 3000);
        } else {
            setMessage({status:"success", message:"activity created"})
            const intervalId = setInterval(() => {
                setMessage({status:'',message:''})
                clearInterval(intervalId)
            }, 3000);
        }
        setActivityName('')
        setActivityDes('')
        reloadActivity()
    }

    function closeCreateMode(){
        setActivityDes('')
        setActivityName('')
        setCreateMode(false)
    }

    return(
        <TableRow>
            <TableCell align="center">
                <IconButton onClick={()=>closeCreateMode()}><CloseIcon/></IconButton>
                <IconButton onClick={()=>callCreateActivity()}><SendIcon/></IconButton>
            </TableCell>
            <TableCell>
                <TextField label="name" variant="standard" value={activityName} onChange={(e) => {setActivityName(e.target.value)}}/>
            </TableCell>
            <TableCell sx={{display:"flex"}}>
                <TextField label="description" variant="standard" value={activityDes} onChange={(e) => {setActivityDes(e.target.value)}}/>
                {message.status && 
                    <Alert severity={message.status} sx={{height:"37px", fontSize:"12px"}}> 
                        {message.message}
                    </Alert>}
            </TableCell>
        </TableRow>
    )
}

export default CreateActivityRow