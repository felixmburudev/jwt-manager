import {useState} from 'react'
import "../styles/login.css"
import axios from 'axios'
import { useNavigate, } from 'react-router-dom'
import Loading from '../components/Loading'

const Login = () => {
  const navigate = useNavigate() 
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logRes, setLogRes] = useState(null)
  const [isLoading, setIsloading] =useState(false)
    
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsloading(true)
        if(email.length <= 0 || password.length <= 1){
                setIsloading(false)
                setLogRes("Make sure your Inputs Are Valide")
            }
            else{
        try{         
            const response = await axios.post('http://localhost:3000/Login', { password, email})
            const token = response.data.token
            localStorage.setItem('token', token)
            if(response.status === 200){
                    setLogRes("LOGIN SUCCESSIFUL")
                setTimeout(()=>{
                    setIsloading(false)
                    navigate('/')
                }, 4000)
            }}
            
        catch(err){
            if(err.response.status === 401){
                setLogRes("Incorrect Password Or Email")
                
                setTimeout(()=>{
                    setIsloading(false)
                }, 3000)}         
            
        }} }    
  return (
    <div className='login-container'>
        {isLoading?(
             <Loading log={logRes}/>
        ):(
            <div className="login">
                <h2>Login Here</h2>
        <div className="loginRes">
            {logRes}
        </div>
        <div className="inputs">
            <form onSubmit={handleSubmit}>
                <div className="email">
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="passwordL">
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={handlePasswordChange }
                    />
                </div>
                <div className="btn">
                    <button type='submit'> Login </button>
                </div>
                 
            </form>
        </div>
        <div className="create">
           
                <a href="/">Forgot Password</a>
                <div>
                <span> Don`t Have An Account? </span>
                <a href='/SignUp' > Create Here</a></div>
            
        </div>
            </div>
        )}        
    </div>
  )
}
export default Login
