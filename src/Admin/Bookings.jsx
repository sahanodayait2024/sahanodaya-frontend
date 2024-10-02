import { Table } from 'antd'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
const Bookings = () => {
  const [data, setData] = useState([]);

  useEffect(()=> {
    const fetcData = async () => {
      try {
        let list = [];
        const querySnapshot = await getDocs(collection(db, "bookings"));
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        list.push({id: doc.id, ...doc.data()})
      });
      setData(list)
      } catch (err) {
        console.log(err)
      }
    }
    fetcData();
  }, [])


  const columns = [
    {
      key:'1',
      title:'ID',
      dataIndex:'id'
    },
    {
     key:'2',
     title:'First Name',
     dataIndex:'firstname'
    },
    {
      key:'3',
      title:'Last Name',
      dataIndex:'lastname'
    },{
      key:'4',
      title:'Email',
      dataIndex:'email',
    },
    {
      key:'5',
      title:'Phone Number',
      dataIndex:'phonenumber'
    }
  ]
  return (
    <div>
      <div className='border p-4'> 
        <h1 className='text-center text-2xl font-bold'>Counseling Programme</h1>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data}
         />
      </div>
    </div>
  )
}

export default Bookings