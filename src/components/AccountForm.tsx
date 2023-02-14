import clsx from "clsx";
import { useState } from "react";

export interface AccountFormValues {
  email: string;
  password: string;
}

interface ValidateData {
  isError: boolean;
  errors: {
    email?: { message: string };
    password?: { message: string };
  };
}

const validateFormValues = (formValues: AccountFormValues): ValidateData => {
  const isValidEmail = formValues.email.includes("@");
  const isValidPassword = formValues.password.length >= 8;

  const errors: ValidateData["errors"] = {};
  if (!isValidEmail) {
    errors.email = { message: "@를 포함해야 합니다." };
  }
  if (!isValidPassword) {
    errors.password = { message: "8자 이상이어야 합니다." };
  }

  const isError = Object.keys(errors).length !== 0;

  return { isError, errors };
};

interface AccountFormProps {
  buttonText: string;
  onSubmit: (formValues: AccountFormValues) => void | Promise<void>;
}

const AccountForm: React.FC<AccountFormProps> = (props) => {
  const { buttonText, onSubmit } = props;
  const [formValues, setFormValues] = useState<AccountFormValues>({
    email: "",
    password: "",
  });
  const [formState, setFormState] = useState<{
    isSubmitted: boolean;
    isSubmitting: boolean;
  }>({ isSubmitted: false, isSubmitting: false });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    setFormState((prev) => ({
      ...prev,
      isSubmitted: true,
      isSubmitting: true,
    }));

    const { isError } = validateFormValues(formValues);
    if (isError) {
      return;
    }

    await onSubmit(formValues);
    setFormState((prev) => ({ ...prev, isSubmitting: false }));
  };

  const handleEmailInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFormValues((prev) => ({ ...prev, email: event.target.value }));
  };

  const handlePasswordInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setFormValues((prev) => ({ ...prev, password: event.target.value }));
  };

  let validateData: ValidateData = {
    isError: false,
    errors: {},
  };
  if (formState.isSubmitted) {
    validateData = validateFormValues(formValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">이메일</span>
        </label>
        <input
          data-testid="email-input"
          type="text"
          className="input input-bordered"
          value={formValues.email}
          onChange={handleEmailInputChange}
        />
        {validateData.errors.email && (
          <label className="label">
            <span className="label-text-alt text-error">
              {validateData.errors.email.message}
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
          value={formValues.password}
          onChange={handlePasswordInputChange}
        />
        {validateData.errors.password && (
          <label className="label">
            <span className="label-text-alt text-error">
              {validateData.errors.password.message}
            </span>
          </label>
        )}
      </div>
      <button
        data-testid="signup-button"
        className={clsx(
          "btn w-full mt-4",
          validateData.isError && "btn-disabled",
          formState.isSubmitting && "loading"
        )}
        disabled={validateData.isError}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AccountForm;
