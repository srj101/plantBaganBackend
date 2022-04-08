import React, { useState } from 'react';
import { gql ,useMutation} from '@apollo/client'
import {
  Form,
  Input,
  Select,
  Button,
  Switch
} from 'antd';
import { useParams } from 'react-router-dom';

const { Option } = Select;


const UPDATE_ORDER = gql`
mutation($updateOrderId: String!, $status: String, $completed: Boolean) {
  updateOrder(id: $updateOrderId,status: $status,completed: $completed) {
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

function EditOrder() {
    const [form] = Form.useForm();
    const {orderId} = useParams();
    const [updateOrder, orderUpdated] = useMutation(UPDATE_ORDER);
    const [input, setInput] = useState(false);
    const onFinish = async(values) => {
        await updateOrder({
            variables: {
                ...values,
                completed:input,
                updateOrderId:orderId
            }
        })
    }
  return (
    <div className='order_area'> 
        <figure class="text-center">
        <blockquote className="blockquote">
            <p><b>Order List</b></p>
        </blockquote>
        <figcaption className="blockquote-footer">
            <cite title="Source Title">Update  Order</cite>
        </figcaption>
        </figure>


        <Form
      {...formItemLayout}
      form={form}
      name="updateOrder"
      onFinish={onFinish}
      className="col-8"
      scrollToFirstError
    >
        



      <Form.Item
        name="status"
        label="Order Status"
        rules={[
          {
            whitespace: true,
          },
        ]}
      >
          <Select placeholder="Select Status" >
              <Option value="shipped">Shipped</Option> 
              <Option value="rejected">Rejected</Option> 

              <Option value="arrived">Arrived</Option> 

              <Option value="on-hold">On Hold</Option> 
              <Option value="cancelled">Cancelled</Option>
        </Select>
          
      </Form.Item>

      


      <Form.Item
        name="completed"
        label="Fullfillment"
      >
          <Switch
          name="completed"
          checked={input}
          onChange={() => {
            setInput(!input);
          }}
        />
      </Form.Item>

      
      


      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={orderUpdated.loading}>
          Update Order
        </Button>
      </Form.Item>
    </Form>



    </div>
  )
}

export default EditOrder