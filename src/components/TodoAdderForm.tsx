import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axoisInstance, { AxiosErrorResponseData } from "../axios";
import { useAccessToken } from "../context";
import { TodoData } from "../routes/todo";

interface TodoAdderFormValues {
  todo: string;
}

interface ValidateData {
  isError: boolean;
  errors: {
    todo?: { message: string };
  };
}

const validateFormValues = (formValues: TodoAdderFormValues): ValidateData => {
  const isValidTodo = formValues.todo.length >= 1;

  const errors: ValidateData["errors"] = {};
  if (!isValidTodo) {
    errors.todo = { message: "1자 이상이어야 합니다." };
  }

  const isError = Object.keys(errors).length !== 0;

  return { isError, errors };
};

interface TodoAdderFormProps {
  onSubmit: (data: TodoData) => void;
}

const TodoAdderForm: React.FC<TodoAdderFormProps> = (props) => {
  const { onSubmit } = props;

  const [formValues, setFormValues] = useState<TodoAdderFormValues>({
    todo: "",
  });
  const [formState, setFormState] = useState<{
    isSubmitted: boolean;
    isSubmitting: boolean;
  }>({ isSubmitted: false, isSubmitting: false });

  const { accessToken } = useAccessToken();

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

    await axoisInstance
      .post<TodoData>(
        "/todos",
        { todo: formValues.todo },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        onSubmit(res.data);
        setFormValues((prev) => ({ ...prev, todo: "" }));
      })
      .catch((error: AxiosError<AxiosErrorResponseData>) => {
        toast(error.response?.data.message ?? "Something went wrong!");
      })
      .finally(() => {
        setFormState((prev) => ({
          ...prev,
          isSubmitted: false,
          isSubmitting: false,
        }));
      });
  };

  const handleTodoInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFormValues((prev) => ({ ...prev, todo: event.target.value }));
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
        <div className="input-group">
          <input
            type="text"
            data-testid="new-todo-input"
            className="input input-bordered w-full"
            value={formValues.todo}
            onChange={handleTodoInputChange}
          />
          <button
            data-testid="new-todo-add-button"
            className="btn no-animation"
            type="submit"
          >
            추가
          </button>
        </div>
        {validateData.errors.todo && (
          <label className="label">
            <span className="label-text-alt text-error">
              {validateData.errors.todo.message}
            </span>
          </label>
        )}
      </div>
    </form>
  );
};

export default TodoAdderForm;
