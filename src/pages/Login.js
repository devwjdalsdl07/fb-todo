import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Modal } from "antd";
// import { useLogin } from "../hooks/useFirebase";
import { useDispatch } from "react-redux";
import { asyncLoginFetch } from "../reducers/actions";
// import { useLogin } from "../hooks/useFirebase";

const Login = () => {
  // const { login } = useLogin();
  // Link, NavLink, useNaviage
  const navigate = useNavigate();
  // 로그인
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const dispatch = useDispatch();

  const onFinish = async values => {
    // console.log("Success:", values);
    // login(values.email, values.password);
    // dispatch 를 통해서 액션을 만들어/액션담거나
    await dispatch(
      asyncLoginFetch({ email: values.email, password: values.password }),
    ).unwrap();
    // 후속처리
    navigate("/");

    // Firebase 로그인
    // try {
    //   await firebase
    //     .auth()
    //     .signInWithEmailAndPassword(values.email, values.password);
    //   // 로그인 된 사용자 정보를 가지고 옮
    //   const user = firebase.auth().currentUser;
    //   setFBName(user.displayName);
    //   setFBEmail(user.email);
    //   setFBUid(user.uid);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error.code);

    //   if (error.code === "auth/invalid-email") {
    //     setModalMessage("올바른 이메일 형식이 아닙니다.");
    //   } else if (error.code === "auth/wrong-password") {
    //     setModalMessage("올바르지 않은 비밀번호입니다.");
    //   } else if (error.code === "auth/user-not-found") {
    //     setModalMessage("가입되지 않은 사용자 입니다.");
    //   } else if (error.code === "auth/missing-email") {
    //     setModalMessage("이메일이 입력되지 않았습니다.");
    //   } else {
    //     setModalMessage("로그인이 실패하였습니다.");
    //   }
    //   showModal();
    // }
  };
  const onFinishFailed = errorInfo => {
    // console.log("Failed:", errorInfo);
    const arr = errorInfo.errorFields;
    // console.log(arr);
    arr.forEach(item => {
      // console.log(item.errors);
    });
  };
  // Modal 기능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
    <div className="p-6 mt-5 shadow rounded-md bg-white">
      <h2>Login</h2>

      {/* AntD Modal */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalMessage}</p>
      </Modal>
      {/*  AntD form */}
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
        validateTrigger="onSubmit"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "",
            },
          ]}
          validateTrigger="onSubmit"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요!",
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

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff", marginRight: "8px" }}
          >
            로그인
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
    </div>
  );
};

export default Login;
