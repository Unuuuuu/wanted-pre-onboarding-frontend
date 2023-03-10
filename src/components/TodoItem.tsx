import { AxiosError } from "axios";
import clsx from "clsx";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import axoisInstance, { AxiosErrorResponseData } from "../axios";
import { useAccessToken } from "../context";
import { TodoData } from "../routes/todo";

interface TodoItemProps {
  todoData: TodoData;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todoData, onDelete } = props;
  const { id } = todoData;
  const [isCompleted, setIsCompleted] = useState(todoData.isCompleted);
  const [todo, setTodo] = useState(todoData.todo);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousTodoRef = useRef(todo);

  const { accessToken } = useAccessToken();

  const handleCheckboxChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    const { checked } = event.target;
    setIsCompleted(checked);
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

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTodo(event.target.value);
  };

  const handleModifyButtonClick = () => {
    inputRef.current?.select();
    previousTodoRef.current = todo;
    setIsModifyMode(true);
  };

  const handleDeleteButtonClick = async () => {
    await axoisInstance
      .delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        onDelete(id);
      })
      .catch((error: AxiosError<AxiosErrorResponseData>) => {
        toast(error.response?.data.message ?? "Something went wrong!");
      });
  };

  const handleSubmitButtonClick = async () => {
    await axoisInstance
      .put<TodoData>(
        `/todos/${id}`,
        {
          todo,
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setIsModifyMode(false);
      })
      .catch((error: AxiosError<AxiosErrorResponseData>) => {
        toast(error.response?.data.message ?? "Something went wrong!");
      });
  };

  const handleCancelButtonClick = () => {
    setTodo(previousTodoRef.current);
    setIsModifyMode(false);
  };

  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        className="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
      />
      <input
        type="text"
        value={todo}
        onChange={handleInputChange}
        className={clsx(
          "input input-sm focus:outline-none flex-1 w-full",
          isModifyMode && "input-bordered"
        )}
        readOnly={!isModifyMode}
        ref={inputRef}
      />
      {!isModifyMode ? (
        <>
          <button
            data-testid="modify-button"
            className="btn btn-sm no-animation"
            onClick={handleModifyButtonClick}
          >
            ??????
          </button>
          <button
            data-testid="delete-button"
            className="btn btn-sm no-animation btn-error"
            onClick={handleDeleteButtonClick}
          >
            ??????
          </button>
        </>
      ) : (
        <>
          <button
            data-testid="submit-button"
            className="btn btn-sm no-animation"
            onClick={handleSubmitButtonClick}
          >
            ??????
          </button>
          <button
            data-testid="cancel-button"
            className="btn btn-sm no-animation btn-error"
            onClick={handleCancelButtonClick}
          >
            ??????
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
