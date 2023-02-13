import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axoisInstance, { AxiosResponseData } from "../axios";
import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const accountSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type Account = z.infer<typeof accountSchema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Account>({
    resolver: zodResolver(accountSchema),
  });
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

  const isError = Object.keys(errors).length !== 0;

  return (
    <main className="py-8">
      <h1 className="text-4xl text-center mb-8">회원가입하기</h1>
      {axiosErrorMessage && (
        <div className="alert alert-error justify-center mb-4">
          <span>{axiosErrorMessage}</span>
        </div>
      )}
      <form className="mb-4" onSubmit={handleSubmit(onSubmit)} id="form">
        <div className="form-control">
          <label className="label">
            <span className="label-text">이메일</span>
          </label>
          <input
            data-testid="email-input"
            type="text"
            className="input input-bordered"
            {...register("email")}
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">비밀번호</span>
          </label>
          <input
            data-testid="password-input"
            type="text"
            className="input input-bordered"
            {...register("password")}
          />
          {errors.password && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.password.message}
              </span>
            </label>
          )}
        </div>
      </form>
      <button
        data-testid="signup-button"
        className={`btn w-full ${isError && "btn-disabled"}`}
        form="form"
        disabled={isError}
      >
        회원가입
      </button>
    </main>
  );
};

export default Signup;
