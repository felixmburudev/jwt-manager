import{BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import withAuth from './service/withAuth'
import Home from './pages/Home'
function App() {
  const ProtectedComp = withAuth(Home)

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<ProtectedComp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      
      
     </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
