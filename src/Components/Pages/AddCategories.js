import React from 'react';
import { gql ,useMutation} from '@apollo/client'
import {
    Form,
    Input,
    notification,
    Button,
  } from 'antd';

  const CREATE_CATEGORY = gql`
    mutation($name: String!, $image: String, $description: String) {
      createCategory(name: $name,image: $image,description: $description) {
                id
                name
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

function AddCategories() {
    const [createCategory, addedCategory] = useMutation(CREATE_CATEGORY);
    const [form] = Form.useForm();

    const onFinish = async(values) => {
        await createCategory({
            variables:{
                name:values.name,
                image:values.image,
                description: values.description
            }
        });
        notification.open({
            message: 'Saved Category',
            description:
              'Category successfully saved!',
        });
        window.location.reload(false)
      };
    

  return (
    <>
      <figure class="text-center">
            <blockquote className="blockquote">
                <p><b>Category List</b></p>
            </blockquote>
            <figcaption className="blockquote-footer">
                <cite title="Source Title">Add  Categories</cite>
            </figcaption>
            </figure>
    <Form
      {...formItemLayout}
      form={form}
      name="addCategory"
      onFinish={onFinish}
      className="col-8"
      scrollToFirstError
    >
        
      <Form.Item
        name="name"
        label="Category Name"
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
        label="Banner Image URL"
      >
        <Input />
      </Form.Item>

      

      <Form.Item
        name="description"
        label="Description"
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={addedCategory.loading}>
          Add Category
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default AddCategories