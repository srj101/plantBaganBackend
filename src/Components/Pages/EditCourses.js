import React, { useState, useRef } from 'react';
import { gql,useQuery ,useMutation} from '@apollo/client'
import JoditEditor from "jodit-react";
import { useParams } from 'react-router-dom';
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

const UPDATE_COURSE = gql`
    mutation UpdateCourse ($updateCourseId: String!,$updateCourseInput: CourseContents!){
        updateCourse(id: $updateCourseId,input: $updateCourseInput) {
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

const EditCourses = () => {
    const {courseId} = useParams();
    const [form] = Form.useForm();
    const editor = useRef(null);

    
    const { loading, errorr, data } = useQuery(GET_INSTRUCTORS,{
      errorPolicy:"all"
    });
    
    const [updateCourse, { dataa, loadingg, errors }] = useMutation(UPDATE_COURSE,{
      errorPolicy:"all"
    });
    
    const [content, setContent] = useState("Start writing");
    const config = {
      readonly: false,
      height: 400
    };
    const handleUpdate = (event) => {
      const editorContent = event.target.text;
      setContent(editorContent);
    };
    
   


  const onFinish = async(values) => {
    await updateCourse({
        variables:{
            updateCourseId: courseId,
            updateCourseInput:{...values}
        }
    });
    if(errorr) {
      notification.open({
        message: 'Error',
        description:
          errors.message,
      });
    }
    if(!errors){
      notification.open({
        message: 'Saved Course',
        description:
          'Course successfully updated!',
      });
    }else {
      
      notification.open({
        message: 'Error',
        description:
          errors.message,
      });
    }
    
  };

    if(loading|| loadingg ) {
        return "loading...";
    }
    
 
    


  return (
      <>
      <figure class="text-center">
            <blockquote className="blockquote">
                <p><b>Course Update</b></p>
            </blockquote>
            <figcaption className="blockquote-footer">
                <cite title="Source Title">Update Course in seconds</cite>
            </figcaption>
            </figure>
    <Form
      {...formItemLayout}
      form={form}
      name="update"
      onFinish={onFinish}
      className="col-8"
      scrollToFirstError
    >
        
      <Form.Item
        name="title"
        label="Title"

      >
        <Input/>
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

      >
        <InputNumber />
      </Form.Item>
     

      <Form.Item
        name="instructorId"
        label="Instructor ID"
        rules={[
          {
            whitespace: true,
          },
        ]}
      >
           <Select  placeholder="Select Instructor">
           {loading ? ("loading..."): data?.getInstructors?.map(instructor => (
              <Option value={instructor.id}>{instructor.fullName}</Option> 
          )) }
        </Select>
          
      </Form.Item>



      <Form.Item
        name="duration"
        label="Duration"

      >
        <Input />
      </Form.Item>




      <Form.Item
        name="level"
        label="Level"

      >
        <Select  placeholder="Select Level">
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
        <Input.TextArea showCount />
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
        <Button type="primary" htmlType="submit">
          Update Course
        </Button>
      </Form.Item>
    </Form>
    </>
  );

};

export default EditCourses