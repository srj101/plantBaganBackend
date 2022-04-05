import React, { useEffect, useState,useRef } from 'react';
import { gql,useQuery ,useMutation,useLazyQuery} from '@apollo/client'
import {
  Form,
  Input,
  Select,
  Button,
  Switch
} from 'antd';
import JoditEditor from "jodit-react";
import { useParams } from 'react-router-dom';

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


const UPDATE_LESSON = gql`
mutation($updateLessonId: String!, $updateLessonSectionId: String, $updateLessonCourseId: String, $updateLessonTitle: String, $updateLessonVideo: String, $updateLessonQuizUrl: String, $content: String, $updateLessonLocked: Boolean) {
  updateLesson(id: $updateLessonId, sectionId: $updateLessonSectionId, courseId: $updateLessonCourseId,title: $updateLessonTitle,video: $updateLessonVideo,quizURL: $updateLessonQuizUrl,content: $content,locked: $updateLessonLocked) {
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

function EditLesson() {
    const {lessonId} = useParams();
    const [getSections, sections] = useLazyQuery(GET_SECTIONS);
    const { loading, error, data } = useQuery(GET_COURSES);
    const [form] = Form.useForm();
    const [createLesson, lessonCreated] = useMutation(UPDATE_LESSON);
    const [getCourseID,setCourseID] = useState();
    const [getLessonType,setLessonType] = useState("0");
    const [input, setInput] = useState(true);
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
    const onFinish = async(values) => {
      
      await createLesson({
        variables: {
            updateLessonId: lessonId,
            updateLessonCourseId: getCourseID,
          updateLessonSectionId: values.sectionId,
          updateLessonTitle:values.title,
          updateLessonVideo:values.video,
          updateLessonQuizUrl:values.quizURL,
          content:values.content,
          updateLessonLocked: values.locked
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
            <cite title="Source Title">Update  Lesson</cite>
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
            whitespace: true,
          },
        ]}
      >
          <Select placeholder="Select Type" onChange={onTypeChange}>
              <Option value="0">Video URL</Option> 
              <Option value="1">QUIZ URL</Option>
        </Select>
          
      </Form.Item>

      


      <Form.Item
        name="locked"
        label="Locked"
      >
          <Switch
          name="locked"
          checked={input}
          onChange={() => {
            setInput(!input);
          }}
        />
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

        
      <Form.Item
        name="content"
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
        <Button type="primary" htmlType="submit" disabled={lessonCreated.loading}>
          Update Lesson
        </Button>
      </Form.Item>
    </Form>



    </div>
  )
}

export default EditLesson