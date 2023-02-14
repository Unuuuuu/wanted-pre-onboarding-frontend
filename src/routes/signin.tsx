import axoisInstance, { AxiosErrorResponseData } from "../axios";
import { AxiosError } from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import AccountForm, { AccountFormValues } from "../components/AccountForm";
import { toast } from "react-hot-toast";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../constants";
import { useAccessToken } from "../context";

export async function loader() {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  if (accessToken !== null) {
    toast("이미 로그인되어 있습니다.");
    return redirect("/todo");
  }

  return null;
}

const Signin = () => {
  const navigate = useNavigate();
  const { actions } = useAccessToken();

  const onSubmit = async (formValues: AccountFormValues) => {
    await axoisInstance
      .post<{ access_token: string }>("/auth/signin", formValues)
      .then((res) => {
        actions.update(res.data.access_token);
        toast("로그인이 완료되었습니다.");
        navigate("/todo");
      })
      .catch((error: AxiosError<AxiosErrorResponseData>) => {
        toast(error.response?.data.message ?? "Something went wrong!");
      });
  };

  return (
    <main className="py-8">
      <Title text="로그인" />
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
