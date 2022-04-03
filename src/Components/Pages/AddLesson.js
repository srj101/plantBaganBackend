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

const GET_SECTIONS = gql`

query($getSectionsCourseId: String!){
  getSections(courseId: $getSectionsCourseId) {
    title
    id
  }
}

`;


const ADD_LESSON = gql`
mutation($sectionId: String!, $createLessonCourseId: String!, $createLessonTitle: String!, $video: String, $quizUrl: String){
  createLesson(sectionId: $sectionId, courseId: $createLessonCourseId,title: $createLessonTitle,video: $video,quizURL: $quizUrl) {
    title
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

function AddLesson() {
    const [getSections, sections] = useLazyQuery(GET_SECTIONS);
    const { loading, error, data } = useQuery(GET_COURSES);
    const [form] = Form.useForm();
    const [createLesson, lessonCreated] = useMutation(ADD_LESSON);
    const [getCourseID,setCourseID] = useState();
    const [getLessonType,setLessonType] = useState("0");
    

    const onFinish = async(values) => {
      
      await createLesson({
        variables: {
          createLessonCourseId: getCourseID,
          sectionId: values.sectionId,
          createLessonTitle:values.title,
          video:values.video,
          quizUrl:values.quizURL
        }
      })
    };
    useEffect(async()=> {
      if(getCourseID){
        await getSections({
        variables:{
         getSectionsCourseId:getCourseID
        }
      });
      }
      
    },[getCourseID]);
    const onCourseChange = (value) => {
      setCourseID(value);
    }
    const onTypeChange = (value) => {
      setLessonType(value);
    }


    if(error || sections.error) return "Error..";
  if(loading || lessonCreated.loading || sections.loading) return "loading...";
  return (
    <div className='lesson_area'> 
        <figure class="text-center">
        <blockquote className="blockquote">
            <p><b>Lesson List</b></p>
        </blockquote>
        <figcaption className="blockquote-footer">
            <cite title="Source Title">Add  Lesson</cite>
        </figcaption>
        </figure>


        <Form
      {...formItemLayout}
      form={form}
      name="addPlants"
      onFinish={onFinish}
      className="col-8"
      scrollToFirstError
    >
        


      <Form.Item
        name="title"
        label="Lesson Name"
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
           allowClear onChange={onCourseChange}>
           {loading ? ("loading..."): data.getCourses.map(course => (
              <Option value={course.id}>{course.title}</Option> 
          )) }
        </Select>

        
          
      </Form.Item>


      <Form.Item
        name="sectionId"
        label="Section"
        rules={[
          {
            required:true,
            whitespace: true,
          },
        ]}
      >
          <Select placeholder="Select Section">
           {sections.loading ? ("loading..."): sections.data?.getSections?.map(section => (
              <Option value={section.id}>{section.title}</Option> 
          )) }
        </Select>
          
      </Form.Item>


      <Form.Item
        name="lessonType"
        label="Lesson Type"
        rules={[
          {
            required:true,
            whitespace: true,
          },
        ]}
      >
          <Select placeholder="Select Type" onChange={onTypeChange}>
              <Option value="0">Video URL</Option> 
              <Option value="1">QUIZ URL</Option>
        </Select>
          
      </Form.Item>

      



      

        {
          getLessonType === "0" ? (
            <Form.Item
        name="video"
        label="Video URL"
      >
        <Input />
      </Form.Item>
          ): (
          <Form.Item
              name="quizURL"
              label="Quiz URL"
            >
              <Input />
            </Form.Item>
          )
        }

      


      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={lessonCreated.loading}>
          Add Lesson
        </Button>
      </Form.Item>
    </Form>



    </div>
  )
}

export default AddLesson