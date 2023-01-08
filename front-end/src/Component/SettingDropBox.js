import React, {Fragment, useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Context from '../Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DrobBoxMenu(){
    const { setOauth, setUser} = useContext(Context)
    const naviate = useNavigate()
    const [anchorE1, setAnchorE1] = useState(null)
    const open = Boolean(anchorE1)

    const onClick = (e)=>{
        setAnchorE1(e.currentTarget)
    }

    const onClose = ()=>{
        setAnchorE1(null)
    }

    const settingsSelected = (e) =>{
        e.preventDefault()
        naviate('/settings')
        onClose()
    }
    
    const logoutSelected = (e) =>{
        e.stopPropagation()
        naviate('/')

        setOauth(null)
        setUser(null)

    }

    return(
        <Fragment>
            <IconButton onClick={onClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
            <Menu  anchorEl={anchorE1} open={open} onClose={onClose}>
                <MenuItem onClick = {settingsSelected}>
                    <ListItemIcon >
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick = {logoutSelected}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Fragment>
    )


}