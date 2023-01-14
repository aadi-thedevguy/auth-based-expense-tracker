import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { authActions } from '../store/auth'
import { themeActions } from '../store/theme'
import UpdateProfile from './Auth/UpdateProfile'
import Expenses from './Expense/Expenses'

function Home() {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const token = useSelector(state => state.auth.token)
  const isDark = useSelector(state => state.theme.isDark)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const onClick = () => {
    dispatch(themeActions.darkMode())
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(authActions.logout())
    navigate('/login')
  }

  const handleClick = async () => {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBLAZfI3knkbyxNuEyi2t-QrjiOXbPCZVc"
    const options = {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {

      const res = await fetch(url, options)
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', borderBottom: '2px solid gray' }}>

        <h1>Welcome to Expense Tracker</h1>
        <div>
          <button onClick={handleClick}>Verify Email</button>
          <button onClick={handleLogout}>Logout</button>

        </div>
        <p>Your Profile is Incomplete. <a href='#' onClick={() => setShow(prev => !prev)}>Complete Now</a></p>
        <button onClick={onClick}>Toggle Theme</button>
      </div>
      <Expenses />
      {show && <UpdateProfile />}
    </>
  )
}

export default Home