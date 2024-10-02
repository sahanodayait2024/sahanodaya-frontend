import React, { useContext } from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { BellFilled, MailOutlined } from '@ant-design/icons'
import { Badge } from 'antd';

export const Header = () => {
    const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });

        localStorage.removeItem("user");
        navigate("/admin/login");

      })
      .catch((error) => {
        console.error("Logout failed: ", error.message);
      });
  };

  return (
    <div className='p-4 shadow-lg'>
        <div className='flex justify-between'>
            <h1 className='px-2 text-xl font-bold text-orange-600'>
                Sahanodaya Foundation
            </h1>
            <div className='flex justify-center items-center'>
                <div className='pr-4 flex gap-6'>
                    <Badge count={20}>
                        <MailOutlined />
                    </Badge>
                    <Badge count={10}>
                        <BellFilled />
                    </Badge>
                </div>
                <button className='hover:text-red-600' onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    </div>
  )
}
