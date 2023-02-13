import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { redirect, useLoaderData } from "react-router";
import axoisInstance, { AxiosErrorResponseData } from "../axios";
import Title from "../components/Title";
import TodoAdder from "../components/TodoAdder";
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

  return (
    <main className="py-8">
      <Title text="TODO" />
      <TodoAdder onSubmit={handleTodoAdderSubmit} />
      <ul className="mt-4">
        {todoDatas.map((todoData) => (
          <TodoItem todoData={todoData} key={todoData.id} />
        ))}
      </ul>
    </main>
  );
};

export default Todo;
