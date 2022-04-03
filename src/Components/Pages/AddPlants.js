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
import {useNavigate} from 'react-router-dom';
const { Option } = Select;
const GET_CATEGORIES = gql`
   query getCategories {
    getCategories {
            id
            name
        }
    }
`;
const CREATE_PLANT = gql`
    mutation($createPlantInput: PlantContents!){
    createPlant(input: $createPlantInput) {
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

function AddPlants(){
    const navigate = useNavigate()
    const [createPlant, { dataa, loadingg, errorr }] = useMutation(CREATE_PLANT,{
        errorPolicy:"all"
    });
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
    const [form] = Form.useForm();

    const { loading, error, data } = useQuery(GET_CATEGORIES);
  

  const onFinish = async(values) => {
   const tags = values.tags.replace(/\s/g, "").split(",");
    await createPlant({
        variables:{
            createPlantInput:{...values,tags:tags}
        }
    });

    if(errorr) {
        notification.open({
            message: 'Error',
            description:
              error.message,
          });
      }else {
          notification.open({
        message: 'Saved Plant',
        description:
          'Plant successfully Added!',
      });
      navigate('/plants');
      }
    

      

  };

   
  if(loadingg) {
      return "loading...";
  }

  return (
      <>
      <figure class="text-center">
            <blockquote className="blockquote">
                <p><b>Plant List</b></p>
            </blockquote>
            <figcaption className="blockquote-footer">
                <cite title="Source Title">Add  Plants</cite>
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
        name="name"
        label="Plant Name"
        rules={[
            {
              required: true,
            },
        ]}
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
        rules={[
            {
              required: true,
            },
        ]}
      >
        <InputNumber    />
      </Form.Item>


      <Form.Item
        name="price"
        label="Price"
        rules={[
            {
              required: true,
            },
        ]}
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
        rules={[
          {
            required: true,
          },
        ]}
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
          Add Plant
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};
export default AddPlants