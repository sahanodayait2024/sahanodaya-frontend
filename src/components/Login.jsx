import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export const Login = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);
 
  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, adminEmail, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    dispatch({type:"LOGIN", payload:user})
    console.log(user)
    navigate('/admin/dashboard')
  })
  .catch((error) => {
    setErrorMessage(error.message);
  });
  }

  return (
    <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
      <h1 className='text-4xl p-4 text-center font-bold'>Login</h1>
      <form onSubmit={handleSubmit}>
      <div className='mt-4'>
        <label for='adminemail' className='block text-base mb-2'>Email</label>
        <input
        type='email'
        id='adminemail'
        value={adminEmail}
        onChange={(e)=> setAdminEmail(e.target.value)}
        className='border w-full rounded-lg px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 '
        required
        />
      </div>
      <div className='mt-4'>
        <label for='password' className='block text-base mb-2'>Password</label>
        <input
        type='password'
        id='password'
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        className='border w-full rounded-lg px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 '
        required
        />
      </div>
      <div className='mt-4'>
        {errorMessage ? <div className='text-red-700'>{errorMessage}</div>: <div></div>}
      </div>
      <button type='submit' className='mt-6 bg-orange-500 px-3 py-2 rounded-xl'>Sign In</button>
      </form>
    </div>
  )
}
