import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const accountSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export type Account = z.infer<typeof accountSchema>;

interface AccountFormProps {
  onSubmit: SubmitHandler<Account>;
  buttonText: string;
}

const AccountForm: React.FC<AccountFormProps> = (props) => {
  const { onSubmit, buttonText } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Account>({
    resolver: zodResolver(accountSchema),
  });

  const isError = Object.keys(errors).length !== 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button
        data-testid="signup-button"
        className={`btn w-full mt-4 ${isError && "btn-disabled"} ${
          isSubmitting && "loading"
        }`}
        disabled={isError}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AccountForm;
