import React from "react";
import { useTheme } from "@emotion/react";
import { useState, useContext } from "react";
import Context from "../Context";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const useStyles = (theme) => ({
    root: {
        backgroundColor: "#373B44",
        color: "white"

    },
    rootLight:{
        backgroundColor: "white",
        color: "black"
    }
  })

export default function Settings(){
    const styles = useStyles(useTheme())
    var style = styles.root
    const {user, setUser} = useContext(Context)
    const [mail, setMail] = useState(user.email)
    const [username, setUsername] = useState(user.username)
    const [lightTheme, setTheme] = useState(false)
    const navigate = useNavigate()

    const changeMail = (e)=>{
        setMail(e.target.value)
    }

    const changeName = (e)=>{
        setUsername(e.target.value)
    }
    
    const toggleLight = ()=>{
        setTheme(!lightTheme)
        if(lightTheme)
            style = styles.rootLight
        else
            style = styles.root
        console.log(style)
    }
    
    const save = ()=>{
        const updateUser = async(user, setUser)=>{
            const newUser = {
                email: mail,
                username: username,
                id: user.id
            }
            try {
                await axios.put(`http://localhost:3001/users/${user.id}`, {id: user.id, user: newUser})
                setUser(newUser)
            } catch (error) {
                console.error(error)
            }
        }
        updateUser(user, setUser)
        cancel()
    }
    // const deleteAccount = ()=>{
    //     const deleteUser = async(user, setUser, setOauth)=>{
    //         try{
    //             await axios.delete(`http://localhost:3001/users/${user.id}`)
    //             setUser(null)
    //             setOauth(null)
    //         }
    //         catch(err){
    //             console.error(err)
    //         }
    //     }
    //     if(window.confirm("do you really want to delete your account?"))
    //         deleteUser(user, setUser, setOauth)
    // }
    
    const cancel = ()=>{
        navigate('/channels')
    }

    return(
            <div css={style}>
                <h4>email adress       : </h4>
                <input type = 'text'  defaultValue={mail} onChange={changeMail}/>
                <h4>Username       : </h4>
                <input type = 'text'  defaultValue={username} onChange={changeName}/>
                {/* <h4>light mode     : </h4>
                <input type = 'checkbox'  onChange={toggleLight}/> */}
                <br/><br/>
                {/* <div>
                    <button style={{color: 'black', backgroundColor: "crimson"}} onClick={deleteAccount}>
                        Delete your accont
                    </button>
                </div> */}
                <br/><br/><br/>
                <div>
                    <button style = {{color: "white", backgroundColor: "green"}} onClick={save}>
                        Save and quit
                    </button>
                    <button style = {{color: "white", backgroundColor: "red"}} onClick={cancel}>
                        Cancel and quit
                    </button>
                </div>
            </div>
    )
}