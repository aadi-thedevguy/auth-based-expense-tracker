import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import UpdateProfile from './Auth/UpdateProfile'
import Expenses from './Expense/Expenses'

function Home() {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const { token, setToken } = useContext(AuthContext)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
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
      </div>
      <Expenses />
      {show && <UpdateProfile />}
    </>
  )
}

export default Home