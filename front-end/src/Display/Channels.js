
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Context from '../Context'
import {useNavigate} from 'react-router-dom'

const styles = {
  root: {
    '& a': {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap', 
    }
  },
}

export default function Channels() {
  const {
    oauth,user,
    channels, setChannels
  } = useContext(Context)
  const naviate = useNavigate();

  useEffect( () => {
    const fetch = async () => {
      const config = {
        headers: {'Authorization': `Bearer ${oauth.access_token}`},
        params: {id: user.id}
      }
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', config)
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels, user])
  
  return (
    <ul css={styles.root}>
      <li css={{textAlign: 'center', fontSize: '1.5em'}}>
        <Link to="/channels" component={RouterLink}>Home</Link>
      </li>
      {channels.length?
         channels.map( (channel, i) => (
          <li key={i} css={{textAlign: 'center', fontSize: '1.3em', mt: '10px'}}>
            <Link 
              href={`/channels/${channel.id}`}
              onClick={ (e) => {
                e.preventDefault()
                naviate(`/channels/${channel.id}`)
              }}
            >
              {channel.name}
            </Link>
          </li>
        ))
        :
        <h4>Your Discussions Will Appear Here</h4>
      }
    </ul>
  );
}
