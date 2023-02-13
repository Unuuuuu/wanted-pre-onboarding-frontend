import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import axoisInstance, { AxiosErrorResponseData } from "../axios";
import { useAccessToken } from "../context";
import { TodoData } from "../routes/todo";

const schema = z.object({
  todo: z.string().min(1, "빈 문자열은 안됩니다."),
});

type Schema = z.infer<typeof schema>;

interface TodoAdderProps {
  onSubmit: (data: TodoData) => void;
}

const TodoAdder: React.FC<TodoAdderProps> = (props) => {
  const { onSubmit: onSubmitFromProps } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { accessToken } = useAccessToken();

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    await axoisInstance
      .post<TodoData>(
        "/todos",
        { todo: data.todo },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        onSubmitFromProps(res.data);
        reset();
      })
      .catch((error: AxiosError<AxiosErrorResponseData>) => {
        toast(error.response?.data.message ?? "Something went wrong!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            data-testid="new-todo-input"
            className="input input-bordered w-full"
            {...register("todo")}
          />
          <button
            data-testid="new-todo-add-button"
            className="btn no-animation"
            type="submit"
          >
            추가
          </button>
        </div>
        {errors.todo && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.todo.message}
            </span>
          </label>
        )}
      </div>
    </form>
  );
};

export default TodoAdder;
