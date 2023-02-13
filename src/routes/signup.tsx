import { SubmitHandler } from "react-hook-form";
import axoisInstance, { AxiosErrorResponseData } from "../axios";
import { AxiosError } from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import AccountForm, { Account } from "../components/AccountForm";
import { toast } from "react-hot-toast";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../constants";

export async function loader() {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  if (accessToken !== null) {
    toast("이미 로그인되어 있습니다.");
    return redirect("/todo");
  }

  return null;
}

const Signup = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Account> = async (data) => {
    await axoisInstance
      .post("/auth/signup", data)
      .then(() => {
        toast("회원가입이 완료되었습니다.");
        navigate("/signin");
      })
      .catch((error: AxiosError<AxiosErrorResponseData>) => {
        toast(error.response?.data.message ?? "Something went wrong!");
      });
  };

  return (
    <main className="py-8">
      <Title text="회원가입" />
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
