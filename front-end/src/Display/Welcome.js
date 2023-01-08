
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { ReactComponent as ChannelIcon } from '../icons/channel.svg';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//others
import Context from '../Context';
import axios from 'axios';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '30%',
    fill: '#fff',
  }
})

export default function Welcome() {
  const styles = useStyles(useTheme())
  const navigate = useNavigate()
  const {oauth, setUser} = useContext(Context)
  
  useEffect(()=>{
    const addUser = async() =>{
      const name = String(oauth.email).split('@')[0]
      const user = {
        email: oauth.email,
        username: name
      }
      try {
        const {data: users} = await axios.get(`http://localhost:3001/users`)
        var found = users.find(curr => curr.email === user.email)
        if(found == null){
          await axios.post(`http://localhost:3001/users`, user)
          const {data: users} = await axios.get(`http://localhost:3001/users`)
          found = users.find(curr => curr.email === user.email)
        }
        setUser(found)
      }
      catch(err){
        console.error(err)
      }
    }
    addUser()
  }, [oauth, setUser])

  const newChan = ()=>{
    navigate('/createchan')
  }

  return (
    <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <Tooltip title = 'New channel' arrow onClick={newChan}>
              <IconButton>
                <ChannelIcon css={styles.icon} />
                <Typography color="textPrimary">
                  Create channels
                </Typography>
              </IconButton>
            </Tooltip>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
