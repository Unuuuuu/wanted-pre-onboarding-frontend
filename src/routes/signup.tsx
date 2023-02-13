import { SubmitHandler } from "react-hook-form";
import axoisInstance, { AxiosResponseData } from "../axios";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import AccountForm, { Account } from "../components/AccountForm";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Account> = async (data) => {
    try {
      await axoisInstance.post("/auth/signup", data);
    } catch (error) {
      toast(
        (error as AxiosError<AxiosResponseData>).response?.data.message ??
          "Something went wrong!"
      );
      return;
    }

    toast("회원가입이 완료되었습니다.");
    navigate("/signin");
  };

  return (
    <main className="py-8">
      <Title text="회원가입하기" />
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
