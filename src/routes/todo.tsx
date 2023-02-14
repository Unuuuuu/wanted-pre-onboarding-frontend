import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { redirect, useLoaderData } from "react-router";
import axoisInstance, { AxiosErrorResponseData } from "../axios";
import Title from "../components/Title";
import TodoAdderForm from "../components/TodoAdderForm";
import TodoItem from "../components/TodoItem";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../constants";

export interface TodoData {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export async function loader() {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  if (accessToken === null) {
    toast("로그인이 필요합니다.");
    return redirect("/signin");
  }

  const response = await axoisInstance
    .get<TodoData[]>("/todos", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch((error: AxiosError<AxiosErrorResponseData>) => {
      toast(error.response?.data.message ?? "Something went wrong!");
    });
  if (response === undefined) {
    return null;
  }

  const todoDatas = response.data;
  return todoDatas;
}

const Todo = () => {
  const [todoDatas, setTodoDatas] = useState<TodoData[]>(
    useLoaderData() as TodoData[]
  );

  const handleTodoAdderSubmit = (data: TodoData) => {
    setTodoDatas((prev) => [...prev, data]);
  };

  const handleTodoItemDelete = (id: number) => {
    setTodoDatas((prev) => prev.filter((value) => value.id !== id));
  };

  return (
    <main className="py-8">
      <Title text="TODO" />
      <TodoAdderForm onSubmit={handleTodoAdderSubmit} />
      {todoDatas.length === 0 ? (
        <p className="mt-4 text-center opacity-50">작성된 TODO가 없습니다.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {todoDatas.map((todoData) => (
            <TodoItem
              key={todoData.id}
              todoData={todoData}
              onDelete={handleTodoItemDelete}
            />
          ))}
        </ul>
      )}
    </main>
  );
};

export default Todo;
