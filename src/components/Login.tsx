import { Button, Form, Input, Checkbox, Modal } from "antd";
import { login, logout } from "@/request/user";
import { register } from "@/request/register";
import docCookies from "@/utils/cookies.ts";

export default function Login() {
    const auth = docCookies.getItem("sessionId");
    const name = docCookies.getItem("name");

    const handleOk = () => {
        console.log("Debug__handleOk called");
        window.location.reload();
    };

    if (auth) {
        return (
            <Button style={{ float: "right", marginTop: 16 }} onClick={() => logout(() => handleOk())}>
                {name}退出登录
            </Button>
        );
    }

    const onFinish = ({
                          name,
                          password,
                          register_login,
                      }: {
        name: string;
        password: string;
        register_login: boolean;
    }) => {
        console.log("Success:", { name, password, register_login });

        if (register_login) {
            registerAndLogin({ name, password });
        } else {
            login({ name, password }, () => {
                console.log("Login success callback");
                handleOk();
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const registerAndLogin = (values: { name: string; password: string }) => {
        register(values, () => {
            console.log("Register success callback");
            login(values, () => {
                console.log("Login success callback after register");
                handleOk();
            });
        });
    };

    return (
        <Modal title="注册与登录" open={true} closable={false} footer={[]}>
            <p className="red">登录之后才能使用</p>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="name"
                    rules={[{ required: true, message: "Please input your name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="register_login"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 7 }}
                >
                    <Checkbox className="register">注册并登录</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
