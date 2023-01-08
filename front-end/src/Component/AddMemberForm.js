import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Context from '../Context'
import Select from 'react-select'
import axios from 'axios'

export default function AddMemberForm({channel, toggleVisibility}) {

    const [options, setoptions] = useState([])
    const [selected, setselected] = useState([])
    const {oauth, user, setChannels} = useContext(Context)

    const handleChange = (e) =>{
        setselected([...selected, ...e])
    }
    
    useEffect(() => {
        const fetch = async()=>{
            try {
                var baseData = [], options = []
                const {data: users} = await axios.get(`http://localhost:3001/users`)
                Array.from(users).forEach(element => {
                    if(channel.members.find(member => member === element.id))
                        baseData.push({value: element.id, label: element.email})
                    else
                        options.push({value: element.id, label:element.email})
                    
                });
                setoptions(options)
                setselected(baseData)
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    }, [setselected, setoptions, channel])

    const validate = async()=>{
        try {
            console.info(selected)
            const Chan = {
                name: channel.name,
                id: channel.id,
                members : Array.from(selected.map(el => el.value))
            }
            await axios.put(`http://localhost:3001/channels/${channel.id}`, Chan)
            toggleVisibility()
            const config = {
                headers: {'Authorization': `Bearer ${oauth.access_token}`},
                params: {id: user.id}
              }
            const {data:channels} = await axios.get(`http://localhost:3001/channels`, config)
            setChannels(channels)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Select
            isMulti
            autoFocus
            styles = {{width: '75%'}}
            options = {options}
            onChange={handleChange}
            />
            <button style = {{ color: 'white', backgroundColor: 'green'}} onClick={validate}>
                Validate
            </button>
        </div>
    )
}
