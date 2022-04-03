import React, { useEffect, useState } from 'react';
import { gql,useQuery ,useMutation,useLazyQuery} from '@apollo/client'
import {
  Form,
  Input,
  Select,
  Steps,
  Button,
} from 'antd';

const { Option } = Select;

const GET_COURSES = gql`
query getCourses{
  getCourses {
    id
    title
  }
}
`;

const ADD_SECTION = gql`
mutation($courseId: String!, $title: String, $shortDescription: String){
  createSection(courseId: $courseId,title: $title,shortDescription: $shortDescription) {
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

function AddSection() {
    const [form] = Form.useForm();
    const courses = useQuery(GET_COURSES);
    const [createSection, { data, loading, error }] = useMutation(ADD_SECTION);

    const onFinish = async(values) => {
        await createSection({
            variables:{
                title:values.title,
                shortDescription: values.shortDescription,
                courseId: values.courseId
            }
        });
    }

  return (
    <div className='section_area'> 
        <figure class="text-center">
        <blockquote className="blockquote">
            <p><b>Section List</b></p>
        </blockquote>
        <figcaption className="blockquote-footer">
            <cite title="Source Title">Add  Section</cite>
        </figcaption>
        </figure>


        <Form
      {...formItemLayout}
      form={form}
      name="addSections"
      onFinish={onFinish}
      className="col-8"
      scrollToFirstError
    >
        


      <Form.Item
        name="title"
        label="Section Name"
        rules={[
            {
              required:true,
              whitespace: true,
            },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="courseId"
        label="Course"
        rules={[
          {
            required:true,
            whitespace: true,
          },
        ]}
      >
           <Select placeholder="Select Course"
           allowClear>
           {courses.loading ? ("loading..."): courses.data?.getCourses?.map(course => (
              <Option value={course.id}>{course.title}</Option> 
          )) }
        </Select>

        
          
      </Form.Item>




      

      <Form.Item
        name="shortDescription"
        label="Short Intro"
      >
        <Input />
      </Form.Item>


      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Add Section
        </Button>
      </Form.Item>
    </Form>



    </div>
  )
}

export default AddSection