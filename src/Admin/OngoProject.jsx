import { Table, Modal, Button, Form, Input, InputNumber, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../firebase';

const OngoProject = () => {
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'Project Name',
      dataIndex: 'projectName',
    },
    {
      key: '3',
      title: 'Project Description',
      dataIndex: 'projectDescription',
    },
    {
      key: '4',
      title: 'Project Slug',
      dataIndex: 'projectSlug',
    },
    {
      key: '5',
      title: 'Image',
      dataIndex: 'Image',
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
        const querySnapshot = await getDocs(collection(db, "onGoingProjects"));
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
      const docRef = await addDoc(collection(db, "onGoingProjects"), {
       ...values
      });
      console.log("Document written with ID: ", docRef.id);
      setIsSubmitting(false);
      handleOk();
    }, 2000);
  };

  const onDeleteStudent =  async (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this Project?',
      okText:'Yes',
      okType:'danger',
      onOK: async () => {
        console.log(record.id)
        await deleteDoc(doc(db, "onGoingProject", record.id));
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
          <h1 className="text-center text-2xl font-bold">On Going Projects</h1>
          <Button className="bg-orange-700 rounded-lg px-2" onClick={showModal}>
            Add Course
          </Button>
          <Modal
            title="Project Form"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form layout="vertical" onFinish={onFinish}>
              {/* Course Name */}
              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[{ required: true, message: 'Please input the project name!' }]}
              >
                <Input />
              </Form.Item>

              {/* Course Fee */}
              <Form.Item
                label="Project Slug"
                name="projectSlug"
                rules={[{ required: true, message: 'Please input the project slug!' }]}
              >
                <Input />
              </Form.Item>

              {/* Course Description */}
              <Form.Item
                label="Project Description"
                name="projectDescription"
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

export default OngoProject;
