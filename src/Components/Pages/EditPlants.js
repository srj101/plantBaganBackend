import React, { useState, useRef, useEffect } from 'react';
import { gql,useQuery ,useMutation,useLazyQuery} from '@apollo/client'
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
const GET_CATEGORIES = gql`
   query getCategories {
    getCategories {
            id
            name
        }
    }
`;

const UPDATE_PLANT = gql`
    mutation($updatePlantId: String!,$updatePlantInput: PlantContents!){
    updatePlant(id: $updatePlantId,input: $updatePlantInput) {
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

const EditPlants = () => {
    const {plantId} = useParams();


    
    const [form] = Form.useForm();
    const editor = useRef(null);
    
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    
    const [updatePlant, { dataa, loadingg, errorr }] = useMutation(UPDATE_PLANT);
    
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
    console.log('Received values of form: ', values);
    await updatePlant({
        variables:{
            updatePlantId: plantId,
            updatePlantInput:{...values}
        }
    });
    notification.open({
        message: 'Updated Plant',
        description:
          'Plant successfully updated!',
      });
  };

    if(loading|| loadingg  ) {
        return "loading...";
    }
    if(error ){
        return error.message;
    }
    if(errorr){
        return errorr.message
    }
 
    


  return (
      <>
      <figure class="text-center">
            <blockquote className="blockquote">
                <p><b>Plant Update</b></p>
            </blockquote>
            <figcaption className="blockquote-footer">
                <cite title="Source Title">Update Plant information in seconds</cite>
            </figcaption>
            </figure>
            <Form
      {...formItemLayout}
      form={form}
      name="editPlants"
      onFinish={onFinish}
      className="col-8"
      scrollToFirstError
    >
        
      <Form.Item
        name="name"
        label="Plant Name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="SKU"
        label="SKU"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="stock"
        label="Stock"
      >
        <InputNumber    />
      </Form.Item>


      <Form.Item
        name="price"
        label="Price"
      >
        <InputNumber    />
      </Form.Item>
     

      <Form.Item
        name="categoryId"
        label="Category"
        rules={[
          {
            required:true,
            whitespace: true,
          },
        ]}
      >
           <Select placeholder="Select Category">
           {loading ? ("loading..."): data.getCategories.map(category => (
              <Option value={category.id}>{category.name}</Option> 
          )) }
        </Select>
          
      </Form.Item>



      <Form.Item
        name="image"
        label="Image URL"
      >
        <Input />
      </Form.Item>







      <Form.Item
        name="tags"
        label="Tags"
      >
        <Input placeholder='Comma Seperate Tags'/>
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
        <Button type="primary" htmlType="submit" disabled={loadingg}>
          Edit Plant
        </Button>
      </Form.Item>
    </Form>
    </>
  );

};

export default EditPlants