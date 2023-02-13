import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import axoisInstance, { AxiosErrorResponseData } from "../axios";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../constants";
import { TodoData } from "../routes/todo";

interface TodoItemProps {
  todoData: TodoData;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todoData } = props;
  const { id, todo, isCompleted } = todoData;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    const { checked } = event.target;
    await axoisInstance
      .put<TodoData>(
        `/todos/${id}`,
        {
          todo,
          isCompleted: checked,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error: AxiosError<AxiosErrorResponseData>) => {
        toast(error.response?.data.message ?? "Something went wrong!");
      });
  };

  return (
    <li className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{todo}</span>
        <input
          type="checkbox"
          className="checkbox"
          defaultChecked={isCompleted}
          onChange={handleChange}
        />
      </label>
    </li>
  );
};

export default TodoItem;
