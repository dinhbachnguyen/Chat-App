
/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'
// Local
import Oups from './Display/Oups'
import Footer from './Display/Footer'
import Header from './Display/Header'
import Main from './Main'
import Login from './Display/Login'
import Context from './Context'
import Settings from './Display/Settings'
import CreateChannel from './Display/CreateChannel'
// Rooter
import {
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom"

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  },
}

export default function App() {
  const location = useLocation()
  const {oauth} = useContext(Context)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  const gochannels = (<Navigate
    to={{
      pathname: "/channels",
      state: { from: location }
    }}
  />)
  const gohome = (<Navigate
    to={{
      pathname: "/",
      state: { from: location }
    }}
  />)
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      <Routes>
        <Route exact path="/" element={oauth ? (gochannels) : (<Login />)}/>
        <Route path="/channels/*" element={oauth ? (<Main />) : (gohome)}/>
        <Route path="/Oups" element={<Oups />} />
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/createchan" element={<CreateChannel/>}/>
      </Routes>
      <Footer />
    </div>
  );
}
