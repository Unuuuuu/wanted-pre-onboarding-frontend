import { SubmitHandler } from "react-hook-form";
import axoisInstance, { AxiosResponseData } from "../axios";
import { useState } from "react";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import AccountForm, { Account } from "../components/AccountForm";

const Signup = () => {
  const [axiosErrorMessage, setAxiosErrorMessage] = useState<string>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Account> = async (data) => {
    try {
      await axoisInstance.post("/auth/signup", data);
    } catch (error) {
      setAxiosErrorMessage(
        (error as AxiosError<AxiosResponseData>).response?.data.message
      );
      return;
    }

    navigate("/signin");
  };

  return (
    <main className="py-8">
      <Title text="회원가입하기" />
      {axiosErrorMessage && (
        <div className="alert alert-error justify-center mb-4">
          <span>{axiosErrorMessage}</span>
        </div>
      )}
      <AccountForm onSubmit={onSubmit} buttonText="회원가입" />
      <p className="mt-4 text-center">
        이미 계정이 있으신가요?{" "}
        <Link to="/signin" className="underline">
          로그인하기
        </Link>
      </p>
    </main>
  );
};

export default Signup;
