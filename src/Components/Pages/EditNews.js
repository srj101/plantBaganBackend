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

const UPDATE_NEWS = gql`
mutation($updateNewsId: String!, $updateNewsTitle: String, $updateNewsFeaturedImage: String, $updateNewsDescription: String) {
  updateNews(id: $updateNewsId,title: $updateNewsTitle,featuredImage: $updateNewsFeaturedImage,description: $updateNewsDescription) {
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

function EditNews() {
    const {newsId} = useParams();
    const [form] = Form.useForm();
    const editor = useRef(null);
    const [updateNews, { data, loading, error }] = useMutation(UPDATE_NEWS);
    

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
        await updateNews({
            variables:{
                updateNewsId: newsId,
                updateNewsTitle:values.title,
                updateNewsFeaturedImage: values.image,
                updateNewsDescription:values.description
            }
        });
        window.location.reload(false)
    }

  return (
    <>
        <figure class="text-center">
            <blockquote className="blockquote">
                <p><b>NEWS List</b></p>
            </blockquote>
            <figcaption className="blockquote-footer">
                <cite title="Source Title">Update News</cite>
            </figcaption>
            </figure>
    <Form
        {...formItemLayout}
        form={form}
        name="editNews"
        onFinish={onFinish}
        className="col-8"
        scrollToFirstError
    >
        
        <Form.Item
        name="title"
        label="Title"
        >
        <Input />
        </Form.Item>

        <Form.Item
        name="image"
        label="Featured Image"
        >
        <Input />
        </Form.Item>



        <Form.Item
        name="description"
        label="Description"
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
        <Button type="primary" htmlType="submit" disabled={loading}>
            Update
        </Button>
        </Form.Item>
    </Form>
    </>
  )
}

export default EditNews