import { Table, Modal, Button, Form, Input, InputNumber, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../firebase';

const Courses = () => {
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'Course Name',
      dataIndex: 'courseName',
    },
    {
      key: '3',
      title: 'Course Description',
      dataIndex: 'courseDescription',
    },
    {
      key: '4',
      title: 'Course Fee',
      dataIndex: 'courseFee',
    },
    {
      key: '5',
      title: 'Course Duration',
      dataIndex: 'courseDuration',
    },
    {
      key:'6',
      title:'Actions',
      render: (record) => {
        return (
          <>
            <button className='text-blue-500'>Edit</button>
            <button className='text-red-600 ml-12' onClick={() => {
              onDeleteStudent(record)
              }}>Delete</button>
          </>
        )
      }
    }
  ];

  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(()=> {
    const fetcData = async () => {
      try {
        let list = [];
        const querySnapshot = await getDocs(collection(db, "courses"));
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setIsSubmitting(true);

    setTimeout( async () => {
      message.success('Course added successfully!');
      console.log('Form Values:', values);
      const docRef = await addDoc(collection(db, "courses"), {
       ...values
      });
      console.log("Document written with ID: ", docRef.id);
      setIsSubmitting(false);
      handleOk();
    }, 2000);
  };

  const onDeleteStudent =  async (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this Course?',
      okText:'Yes',
      okType:'danger',
      onOK: async () => {
        console.log(record.id)
        await deleteDoc(doc(db, "courses", record.id));
        setData(pre=>{
          return pre.filter(course => course.id !== record.id)
        })
      }
    })
  }

  return (
    <div>
      <div className="border p-4">
        <div className="flex justify-between">
          <h1 className="text-center text-2xl font-bold">Courses</h1>
          <Button className="bg-orange-700 rounded-lg px-2" onClick={showModal}>
            Add Course
          </Button>
          <Modal
            title="Course Form"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null} // Custom footer handled by form
          >
            <Form layout="vertical" onFinish={onFinish}>
              {/* Course Name */}
              <Form.Item
                label="Course Name"
                name="courseName"
                rules={[{ required: true, message: 'Please input the course name!' }]}
              >
                <Input />
              </Form.Item>

              {/* Course Fee */}
              <Form.Item
                label="Course Fee"
                name="courseFee"
                rules={[{ required: true, message: 'Please input the course fee!' }]}
              >
                <InputNumber
                  min={0}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              {/* Course Duration */}
              <Form.Item
                label="Course Duration (in weeks)"
                name="courseDuration"
                rules={[{ required: true, message: 'Please input the course duration!' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>

              {/* Course Description */}
              <Form.Item
                label="Course Description"
                name="courseDescription"
                rules={[{ required: true, message: 'Please input the course description!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Courses;
