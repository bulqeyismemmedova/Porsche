import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayouts from './layouts/MainLayouts'
import AdminLayouts from './layouts/AdminLayouts'
import Home from './pages/Home'
import Admin from './pages/Admin'
import  { Toaster } from 'react-hot-toast';
import Error from './components/Error'
import SignUp from './pages/SignUp'
import RegisterLayouts from './layouts/RegisterLayouts'
import SignIn from './pages/SignIn'
import UserProfil from './pages/UserProfil'
import Model from './pages/Model'
import Compare from './pages/Compare'
import Basket from './pages/Basket'
import BuiltYourOwn from './pages/BuiltYourOwn'
import Detail from './pages/Detail'
import CarOwnBuilt from './pages/CarOwnBuilt'




function App() {
  return (
    <>
    <Toaster
  position="top-right"
  reverseOrder={false}/>
  
        <Routes>

            <Route path='/' element={<MainLayouts/>}>
                <Route index element={<Home/>}/>
                <Route path='models/:modelName' element={<Model/>}/>
                <Route path='models/:modelName/:carName' element={<Detail/>}/>
                <Route path='compare' element={<Compare/>}/>
                <Route path='built' element={<BuiltYourOwn/>}/>
                <Route path='/built/:modelName' element={<CarOwnBuilt/>}/>
                <Route path='basket' element={<Basket/>}/>
                <Route path='*' element={<Error/>}/>
            </Route>


            <Route path='/admin' element={<AdminLayouts/>}>
              <Route index element={<Admin/>}/>
            </Route>


            <Route path='/register' element={<RegisterLayouts/>}>
              <Route path='signup' element={<SignUp/>}/>
              <Route path='signin' element={<SignIn/>}/>
              <Route path='profil' element={<UserProfil/>}/>
            </Route>
            
        </Routes>
    </>
  )
}

export default App