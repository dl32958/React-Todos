import List from "@mui/material/List";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

// local storage to save
const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem("todos"));
  if (!data) return [];
  return data;
};


function TodoList() {
  const [todos, setTodos] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);

  // delete
  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    });
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id === id) {
          return { ...prevTodo, completed: !prevTodo.completed };
        } else {
          return prevTodo;
        }
      });
    });
  };

  // crypto.randomUUID() to create id
  const addTodo = (text) => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { text: text, id: crypto.randomUUID(), completed: false },
      ];
    });
  };

  return (
    // put all of content in the box, and justify the position
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        m: 3,
      }}
    >
      <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
        Todos
      </Typography>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todos.map((todo) => {
          return (
            <TodoItem todo={todo} key={todo.id} remove={removeTodo} toggle={() => toggleTodo(todo.id)} />
          )
        })}
        <TodoForm addTodo={addTodo} />
      </List>
    </Box>
  );
}

export default TodoList