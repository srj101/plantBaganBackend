import React, { useState, useRef } from 'react';
import { gql,useQuery ,useMutation} from '@apollo/client'
import JoditEditor from "jodit-react";
import {
  Form,
  Input,
  InputNumber,
  notification,
  Select,
  Button,
} from 'antd';
const { Option } = Select;
const GET_INSTRUCTORS = gql`
    query getInstructors{
        getInstructors {
            id
            fullName
        }
    }
`;
const CREATE_COURSE = gql`
    mutation CreateCourse ($createCourseInput: CourseContents!){
    createCourse(input: $createCourseInput) {
        id
    }
}
`;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddCourses = () => {
    const [createCourse, { dataa, loadingg, errorr }] = useMutation(CREATE_COURSE);
    const editor = useRef(null);
    const [content, setContent] = useState("Start writing");
    const config = {
      readonly: false,
      height: 400
    };
    const handleUpdate = (event) => {
      const editorContent = event.target.text;
      setContent(editorContent);
      
    };
    

    const { loading, error, data } = useQuery(GET_INSTRUCTORS);
  const [form] = Form.useForm();

  const onFinish = async(values) => {
    console.log('Received values of form: ', values);
    await createCourse({
        variables:{
            createCourseInput:{...values}
        }
    });
    notification.open({
        message: 'Saved Course',
        description:
          'Course successfully saved!',
      });
  };


  return (
      <>
      <figure class="text-center">
            <blockquote className="blockquote">
                <p><b>Course List</b></p>
            </blockquote>
            <figcaption className="blockquote-footer">
                <cite title="Source Title">Add Update Delete Courses</cite>
            </figcaption>
            </figure>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      className="col-8"
      scrollToFirstError
    >
        
      <Form.Item
        name="title"
        label="Title"
        rules={[
            {
              required: true,
            },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[
            {
              required: true,
            },
        ]}
      >
        <InputNumber   />
      </Form.Item>
     

      <Form.Item
        name="instructorId"
        label="Instructor ID"
        rules={[
          {
            required:true,
            whitespace: true,
          },
        ]}
      >
           <Select placeholder="Select Instructor">
           {loading ? ("loading..."): data.getInstructors.map(instructor => (
              <Option value={instructor.id}>{instructor.fullName}</Option> 
          )) }
        </Select>
          
      </Form.Item>



      <Form.Item
        name="duration"
        label="Duration"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>




      <Form.Item
        name="level"
        label="Level"
        rules={[
          {
              required:true,
          },
        ]}
      >
        <Select defaultValue="levelall"  placeholder="Select Level">
            <Option value="oLevel">Level O</Option>
            <Option value="aLevel">Level A</Option>
            <Option value="levelall">Level All</Option>
        </Select>
      </Form.Item>



      <Form.Item
        name="overview"
        label="Overview"
        rules={[
          {
            message: 'Please input Overview',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            message: 'Please input Description',
          },
        ]}
      >
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={handleUpdate}
            onChange={(newContent) => {}}
        />
      </Form.Item>

      


      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={loadingg}>
          Add Course
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};
export default AddCourses