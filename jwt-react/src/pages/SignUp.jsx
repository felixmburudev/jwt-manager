import {useState} from 'react'
import "../styles/login.css"
import axios from 'axios'
import Loading from '../components/Loading'

const SignUp = () => {  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPass] = useState('')
  const [logRes, setLogRes] = useState(null)
  const [isLoading, setIsloading] =useState(false)
  const[username, setUsername] = useState('')    
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleusernameChange=(e)=>{
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPass(e.target.value)
  }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsloading(true)
        if(email.length <= 0 || password.length <= 1 || confirmPassword <= 0 || username.length<=0){
                setIsloading(false)
                setLogRes("Make sure your Inputs Are Valide")
            }
            else if(password !== confirmPassword){
                setIsloading(false)
              setLogRes('Passwords misMatch')
            }
            else{
        try{         
            const response = await axios.post('http://localhost:3000/signup', { password, email, username})
            if(response.status === 200){  
              setLogRes("Account Created Successifuly") 
              setTimeout(()=>{
                setIsloading(false)
                    setLogRes('')
                    setConfirmPass('')
                    setEmail('')
                    setPassword('')
                    setUsername('')
            }, 4000)          
            }
        }
        catch(err){            
            if(err.response.status === 400){
                setLogRes( err.response.data) 
                console.log( err.response)               
                setTimeout(()=>{
                    setIsloading(false)
                }, 3000)
            }            
        }}        
  }    
  return (
    <div className='signup-container'>
        {isLoading?(
             <Loading log={logRes }/>
        ):(
            <div className="signup">
                <h2>Create Account</h2>
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
                <div className="username">
                    <label htmlFor='password'>Username</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={username}
                        onChange={handleusernameChange }  />                  
                </div>
                <div className="passwordL">
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={handlePasswordChange }/>                    
                </div>
                <div className="passwordL">
                    <label htmlFor='password'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange }/>                    
                    </div>
                <div className="btn">
                    <button type='submit'> Create </button>
                </div>                 
            </form>
        </div>
        <div className="create">           
                <div>
                <span> Already have An Account? </span>
                <a href='/login' > Login here</a></div>            
        </div>
            </div>
        )}        
    </div>
  )}
export default SignUp
