import {useState, useContext, useEffect} from 'react'
import { useTheme } from '@emotion/react'
import Select from 'react-select'
import axios from 'axios'
import Context from '../Context'
import { useNavigate } from 'react-router-dom'


const useStyles = (theme) => ({
    root: {
      backgroundColor: '#373B44',
      overflow: 'hidden',
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
    }
})

export default function CreateChannel() {
    const navigate = useNavigate()
    const {oauth, user} = useContext(Context)
    const styles = useStyles(useTheme())
    const [name, setName] = useState(null)
    const [members, setMembers] = useState([{value: user.id, label: user.email}])
    const [userInfo, setuserInfo] = useState([])

    const changeName = (e)=>{
        setName(e.target.value)
    }

    const changeMembers = (e)=>{
        const creator = {value: user.id, label: user.email}
        setMembers(creator)
        setMembers(member => [...e, member])
    }

    useEffect(()=>{
        const fetch = async()=>{
            try {
                const {data: users} = await axios.get(`http://localhost:3001/users`)
                var data = []
                Array.from(users).forEach(element => data.push({value : element.id, label: element.email})) 
                setuserInfo(data.filter(el => el.value !== user.id))
            } catch (error) {
                console.error(error)
            }
        }
        fetch()
    }, [user, setuserInfo])

    const validate = async()=>{
        if(!name)
            window.alert('channel\'s name cannot be null')
        else{
            const newChan = {
            name: name,
            members: Array.from(members.map(el =>el.value))
            }
            try {
                const {data:channels} = await axios.get(`http://localhost:3001/channels`,{
                    headers: {
                      'Authorization': `Bearer ${oauth.access_token}`
                    },
                    params:{
                        id: user.id
                    }
                })
                console.info(channels)
                if(channels.some(curr=> curr.name === newChan.name))
                    throw Error('Channel already exists')
                await axios.post(`http://localhost:3001/channels`, newChan)
                cancel()
            } catch (error) {
                window.alert(error)
            }
        }

    }

    const cancel = () =>{
        navigate('/')
    }
    
    return (
        <div css= {styles.root}>
            <h4>name of the new Channel : </h4>
            <input type = "text" onChange={changeName}/>
            <br/><br/><br/><br/>
            {
                userInfo.length?
                <Select 
                isMulti 
                placeholder = 'Friends to invite to the channel'
                options={userInfo} 
                onChange={changeMembers}/>
                :<span>fetching data...</span>
            }
            <br/><br/><br/>
            <button style={{color: 'white', backgroundColor: 'green'}} onClick={validate}>
                confirm and quit
            </button>
            <button style={{color: 'white', backgroundColor: 'red'}} onClick={cancel}>
                cancel and quit
            </button>
        </div>
    )
}
