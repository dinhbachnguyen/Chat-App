
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from '../Context';
import DrobBoxMenu from '../Component/SettingDropBox';

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
  icon: {
    right: 75,
    top:55
  }
})

export default function Header({
  drawerToggleListener
}) {
  const styles = useStyles(useTheme())
  const {
    oauth, user,
    drawerVisible, setDrawerVisible
  } = useContext(Context)
  
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }

  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={drawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      {
        oauth ?
          <span>
            {user ? user.username : oauth.email}
            <DrobBoxMenu/>
          </span>
        :
          <span>Hello Newcomer</span>
      }
    </header>
  );
}
