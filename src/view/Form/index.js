
import React,{Component} from "react";
import { Form, Input, Button,Select,Space} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const {Option} = Select;
const layout = {
    labelCol:{
        span:8
    },
    wrapperCol:{
        span:8
    }

}
const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 8,
    },
  };

const formItemLayout = {
labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
},
wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
},
};
const formItemLayoutWithOutLabel = {
wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
},
};




export default class Myform extends Component {
    constructor(){
        super()
        this.onFinish= this.onFinish.bind(this);
        this.onFinish2=this.onFinish2.bind(this);
        this.onFinish3=this.onFinish3.bind(this);

    }
    formRef= React.createRef();
    onFinish(value){
        console.log(value,'onfinish');
        
    }
    onFinish2(value){
        console.log('2',value)
    }
    onFinish3 = values => {
        console.log('Received values of form:', values);
    };
    onGenderChange = (value) => {
        this.formRef.current.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
      } 
      onReset = () => {
        this.formRef.current.resetFields();
      };
      onFill = () => {
        this.formRef.current.setFieldsValue({
          note: 'Hello world!',
          gender: 'male',
        });
      };
    
    render(){
        return <div>
            {/* 1.基本使用：基本的表单数据域控制展示，包含布局、初始化、验证、提交。 */}
            <Form {...layout} name="id" initialValues={{username:'pgy'}} onFinish={this.onFinish}>
                <Form.Item label="Username" rules={[
                    {required:true,
                     message:'please input your username'
                    }
                ]}name="username">
                    <Input/>
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[
                    {
                        required:true,
                        message:'please input your password'
                    }
                ]}>
                    <Input.Password/>
                </Form.Item>
                    <Button  type="primary" htmlType="submit">submit</Button>
                <Form.Item>
            </Form.Item>
            </Form>
                {/*  对表单数据域进行交互 */}
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish2}>
                    <Form.Item name="note" label="Note" rules={[{required:true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={this.onGenderChange}
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                        >
                        {({ getFieldValue }) => {
                            return getFieldValue('gender') === 'other' ? (
                            <Form.Item
                                name="customizeGender"
                                label="Customize Gender"
                                rules={[
                                {
                                    required: true,
                                },
                                ]}
                            >
                            <Input />
                        </Form.Item>
                        ) : null;
                    }}
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={this.onReset}>
                            Reset
                        </Button>
                        <Button type="link" htmlType="button" onClick={this.onFill}>
                            Fill form
                        </Button>
                    </Form.Item>
                </Form>
                {/* 动态增减表单项 动态增加、减少表单项。add 方法参数可用于设置初始值。 */}
                <Form name='dynamic_form' {...formItemLayoutWithOutLabel} onFinish={this.onFinish3}>
                <Form.List name="users">
                   
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item
                    {...field}
                    name={[field.name, 'first']}
                    fieldKey={[field.fieldKey, 'first']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'last']}
                    fieldKey={[field.fieldKey, 'last']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    }
}