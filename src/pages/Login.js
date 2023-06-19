import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase.js";
import { Button, Checkbox, Form, Input, Modal } from "antd";

const Login = ({ setFBName, setFBEmail, setFBUid }) => {
  // Link, NavLink, useNavigate = 페이지 이동
  const navigate = useNavigate();
  // 로그인 기능
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const onFinish = async values => {
    // console.log("Success:", values);
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      const user = firebase.auth().currentUser;
      console.log(user);
      setFBName(user.displayName);
      setFBEmail(user.email);
      setFBUid(user.uid);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setIsModalOpen(true);
        setModalMessage("올바른 이메일 형식이 아닙니다.");
      } else if (error.code === "auth/wrong-password") {
        setIsModalOpen(true);
        setModalMessage("올바르지 않은 비밀번호 입니다.");
      } else if (error.code === "auth/user-not-found") {
        setIsModalOpen(true);
        setModalMessage("가입되지 않은 사용자 입니다.");
      } else if (error.code === "auth/missing-email") {
        setIsModalOpen(true);
        setModalMessage("이메일이 입력되지 않았습니다.");
      } else {
        setModalMessage("로그인에 실패했습니다.");
      }
      showModal();
    }
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  // Modal 기능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMassage, setModalMessage] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 m-auto mt-5 shadow rounded-md bg-white">
      <h2>Login</h2>

      {/* AntD Modal */}
      <Modal
        title="Login Error"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalMassage}</p>
      </Modal>

      {/* AntD Form */}
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
              validator: async (_, password) => {
                if (!password || password.length < 6) {
                  return Promise.reject(new Error("At least 6 passengers"));
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
        {...tailLayout}
          // wrapperCol={{
          //   offset: 8,
          //   span: 16,
          // }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff", marginRight:"8px"}}
          >
            Login
          </Button>
          <Button
            htmlType="button"
            style={{}}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>

      {/* 
  1. emotion 을 활용하여 tag 의 용도를 구분한다. 
  2. css 도 함께 적용한다
  */}
    </div>
  );
};
export default Login;
