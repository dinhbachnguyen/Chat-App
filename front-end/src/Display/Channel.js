
/** @jsxImportSource @emotion/react */
import {useContext, useRef, useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
// Layout
import { useTheme } from '@mui/styles';
import {Fab} from '@mui/material';
import AddMemberForm from '../Component/AddMemberForm';
import GroupIcon from '@mui/icons-material/Group';
import { Tooltip } from '@mui/material';
// Local
import Form from '../channel/Form'
import List from '../channel/List'
import Context from '../Context'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  }
})

export default function Channel() {
  const navigate = useNavigate()
  const { id } = useParams()
  const {channels, oauth} = useContext(Context)
  const channel = channels.find( channel => channel.id === id)
  const styles = useStyles(useTheme())
  const listRef = useRef()
  const [messages, setMessages] = useState([])
  // eslint-disable-next-line
  const [scrollDown, setScrollDown] = useState(false)
  const [visible, setVisible] = useState(false)

  const toggleVisibility = ()=>{
    setVisible(!visible)
  }
  const getMembers = async()=>{
    var text =''
    try {
      for(var i = 0; i<channel.members.length; ++i){
        const {data:user} = await axios.get(`http://localhost:3001/users/${channel.members[i]}`)
        text += '\n\t'+ user.username
      }
      return text
    } catch (error) {
      console.error(error)
      return '\n an error occured'
    }
  }
  const addMessage = async(message) => {
    if(message.content === '!members'){
      message.content += ' : \n'
      message.content += await getMembers()
    }
    setMessages([...messages, message])
  }

  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: messages} = await axios.get(`http://localhost:3001/channels/${id}/messages`)
        setMessages(messages)
        if(listRef.current){
          listRef.current.scroll()
        }
      }catch(err){
        navigate('/oups')
      }
    }
    fetch()
  }, [id, oauth, navigate])

  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  
  // On refresh, context.channel is not yet initialized
  if(!channel){
    return (<div>loading</div>)
  }
  return (
    <div css={styles.root}>
      { visible ? 
      <AddMemberForm
        channel={channel}
        toggleVisibility={toggleVisibility}
      />:<span/> }
      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        setMessages = {setMessages}
        ref={listRef}
      />
      <Form addMessage={addMessage} channel={channel} />
      <Tooltip title = 'Click here to invite friends to this channel'>
        <Fab
          color="primary"
          aria-label="Latest messages"
          css={[styles.fab]}
          onClick={toggleVisibility}
        >
          <GroupIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
