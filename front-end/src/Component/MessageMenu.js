import React, {  useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ListItemIcon } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'

export default function MessageMenu({message, setVisible}) {
    const [content, setcontent] = useState(message.content)

    const removeMessage = async()=>{
        if(window.confirm('Are you sure')){
            try {
                const id = message.channelId
                await axios.delete(`http://localhost:3001/channels/${id}/messages`, message) 
            } catch (error) {
                console.error(error)
            }
        }
        setVisible(null)
    }

    const handleChange = (e)=>{
        setcontent(e.target.value)
    }

    const updateMessage = async()=>{
        try {
            message.content = content
            const id = message.channelId
            await axios.put(`http://localhost:3001/channels/${id}/messages`, message)
            setVisible(null)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <div css = {{textAlign: 'center', width: '50%', ml:'20px'}}  style ={{backgroundColor:'red'}}>
            <MenuItem onClick={removeMessage}>
                <ListItemIcon>
                    <DeleteOutlineIcon/>
                </ListItemIcon>
                Delete this message
            </MenuItem>
            <MenuItem >
                <ListItemIcon>
                    <EditIcon onClick={updateMessage}/>
                </ListItemIcon>
                Edit this message
                <input type = 'text' placeholder={message.content} onChange={handleChange} />
            </MenuItem>
        </div>
    )
}
