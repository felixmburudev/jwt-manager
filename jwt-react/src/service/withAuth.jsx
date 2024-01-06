/* eslint-disable react/display-name */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const WithAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate()

    useEffect(() => {
      const checkIfIsAuth = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/login')
        }
      }

      checkIfIsAuth()
    }, [navigate]) 
    return <Component {...props} />
  }
}

export default WithAuth

