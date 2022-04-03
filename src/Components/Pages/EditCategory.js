import React from 'react';
import { gql ,useMutation} from '@apollo/client'
import {
    Form,
    Input,
    notification,
    Button,
  } from 'antd';
import { useParams } from 'react-router-dom';

  const UPDATER_CATEGORY = gql`
    mutation updateCategory($updateCategoryId: String!, $updateCategoryName: String, $updateCategoryImage: String, $updateCategoryDescription: String) {
  updateCategory(id: $updateCategoryId,name: $updateCategoryName,image: $updateCategoryImage,description: $updateCategoryDescription) {
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

function EditCategory() {
    const [updateCategory, updatedCategory] = useMutation(UPDATER_CATEGORY);
    const [form] = Form.useForm();
    const {catId} = useParams();
    const onFinish = async(values) => {
        await updateCategory({
            variables:{
                updateCategoryId: catId,
                updateCategoryName:values.name,
                updateCategoryImage:values.image,
                updateCategoryDescription: values.description
            }
        });
        notification.open({
            message: 'Updated Category',
            description:
              'Category successfully Updated!',
          });
      };
    

  return (
    <>
      <figure class="text-center">
            <blockquote className="blockquote">
                <p><b>Category List</b></p>
            </blockquote>
            <figcaption className="blockquote-footer">
                <cite title="Source Title">Update  Categories</cite>
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
        <Button type="primary" htmlType="submit" disabled={updatedCategory.loading}>
          Update
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default EditCategory