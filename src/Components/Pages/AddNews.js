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

const CREATE_NEWS = gql`
mutation($createNewsTitle: String!, $createNewsDescription: String!, $featuredImage: String) {
  createNews(title: $createNewsTitle, description: $createNewsDescription,featuredImage: $featuredImage) {
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

function AddNews() {

    const [createNews, createdNews] = useMutation(CREATE_NEWS);

    // Editor
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

    // Form submission
    const [form] = Form.useForm();
    const onFinish = async(values) => {
        await createNews({
            variables:{
                createNewsTitle:values.title,
                createNewsDescription:values.description,
                featuredImage:values.image
            }
        });
        notification.open({
            message: 'Saved News',
            description:
            'News successfully saved!',
        });
        window.location.reload(false)
    };


  return (
    <>
      <figure class="text-center">
            <blockquote className="blockquote">
                <p><b>NEWS List</b></p>
            </blockquote>
            <figcaption className="blockquote-footer">
                <cite title="Source Title">Add News</cite>
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
        label="Featured Image"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
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
        <Button type="primary" htmlType="submit" disabled={createdNews.loading}>
          Add News
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default AddNews