import React from 'react';
import { gql ,useMutation} from '@apollo/client'
import {
    Form,
    Select,
    notification,
    Button,
  } from 'antd';
import { useParams } from 'react-router-dom';

const UPDATE_USER = gql`
    mutation updateUserAdmin($updateUserId: String!, $role: String!, $userType: String) {
        updateUserAdmin(id: $updateUserId, role: $role,userType: $userType)
    }
`;
const { Option } = Select;

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

function EditUser() {

    const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
    const [form] = Form.useForm();
    const {userId} = useParams();

    const onFinish = async(values) => {
        await updateUser({
            variables:{
                updateUserId: userId,
                role:values.role,
                userType:values.userType,
            }
        });
        notification.open({
            message: 'Updated User',
            description:
              'User successfully Promoted!',
          });
          window.location.reload(false);
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
      name="updateUser"
      onFinish={onFinish}
      className="col-8"
      scrollToFirstError
    >
        
        <Form.Item
        name="userType"
        label="User Type"

      >
        <Select  placeholder="Update User Type">
            <Option value="instructor">Instructor</Option>
            <Option value="subscriber">Student</Option>
            <Option value="blogger">Writter</Option>
        </Select>
      </Form.Item>


      <Form.Item
        name="role"
        label="Role"

      >
        <Select  placeholder="Update User Role">
            <Option value="admin">Admin</Option>
            <Option value="visitor">Visitor</Option>
        </Select>
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

export default EditUser