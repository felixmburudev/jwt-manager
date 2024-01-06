import {  useEffect, useState } from "react"
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import "../styles/home.css"

const Home = () => {
  const [username, setUsername] = useState('x')
  const [userList, setUserlist] =useState([])
  const fetchSession = async () => {
    const token = localStorage.getItem('token')

        axios.get('http://localhost:3000/protected', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUserlist(response.data)
            // console.log(JSON.stringify(response))
        })
        .catch(error => {
          console.log(error)
})
  }
  const handleLogout = () =>{
    localStorage.removeItem('token')
    // navigate('/')
    window.location.reload()
      }
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken)
        const extractedUsername = decodedToken.username 
        setUsername(extractedUsername)
      } catch (error) {
        console.log('Token is invalid or expired')
      }
    } else {
      console.log('Token not found in localStorage')
    }
    fetchSession()
  }, [])
  return (
    <div className="session">
      <h2>  WELCOME {username}</h2>
      <div className="userlist">
        <h3>the below list is only visible to authorised users</h3>
        <ul>
        {userList.map((user, index)=>(
          <li key={index}>{index + 1 + " " + user.username}</li>
        ))}</ul>
      </div>     
        <button onClick={handleLogout}>log out</button> 
    </div>
  )
}
export default Home
