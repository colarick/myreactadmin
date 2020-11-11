import React, {
  Component
} from "react";

import "./index.less";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card
} from 'antd';
class Login extends Component {
  render() {
    return <Card
      title="QF ADMIN登录"
      className="qf-login-wrapper"
    >
      <div className="test" onClick={this.toMain}>1233hahha</div>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>

          <Input
            disabled={this.props.isLoading}
           
            placeholder="用户名"
          />

        </Form.Item>
        <Form.Item>

          <Input
            disabled={this.props.isLoading}
            
            type="password"
            placeholder="密码"
          />

        </Form.Item>
        <Form.Item>
          <Checkbox disabled={this.props.isLoading}>记住我</Checkbox>)
        <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
            登录
        </Button>
        </Form.Item>
      </Form>
    </Card>
  }
  toMain = () => {
    this.props.history.push({
      pathname: '/main'
    })
  }
}

export default Login;