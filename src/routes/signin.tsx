import { SubmitHandler } from "react-hook-form";
import axoisInstance, { AxiosErrorResponseData } from "../axios";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import AccountForm, { Account } from "../components/AccountForm";
import { toast } from "react-hot-toast";

const Signin = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Account> = async (data) => {
    await axoisInstance
      .post<{ access_token: string }>("/auth/signin", data)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        toast("로그인이 완료되었습니다.");
        navigate("/todo");
      })
      .catch((error: AxiosError<AxiosErrorResponseData>) => {
        toast(error.response?.data.message ?? "Something went wrong!");
      });
  };

  return (
    <main className="py-8">
      <Title text="로그인하기" />
      <AccountForm onSubmit={onSubmit} buttonText="로그인" />
      <p className="mt-4 text-center">
        계정이 없으신가요?{" "}
        <Link to="/signup" className="underline">
          회원가입하기
        </Link>
      </p>
    </main>
  );
};

export default Signin;
