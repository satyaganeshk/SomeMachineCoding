import {useState, useEffect} from "react";
import {Checkbox} from "@mui/material";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "../helpers/useSnackbar";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const { showSnackbar, snackbarElement } = useSnackbar();
// store in the local storage
    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const handleAddTodo = (inputValue: string) => {
        console.log("Adding todo:", inputValue);
        // add it as a json so that we can store more information about the todo in the future
        if (inputValue.trim() !== "") {
            const newTodo = {
                id: Date.now().toString(),
                text: inputValue,
                completed: false
            };
            setTodos([...todos, newTodo]);
            setInputValue(""); // Clear the input field after adding
            localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
            showSnackbar("Todo added.", "success");
        }else {
            showSnackbar("Please enter a todo.", "error");
        }
    };
    const onDeleteTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        showSnackbar("Todo deleted.", "success");
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const todosToDisplay = showCompleted ? todos.filter((todo) => todo.completed) : todos;

    const completedTodos = todos.filter((todo) => todo.completed);
    const toggleTodoCompletion = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }


   return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#f5f5f5",
      p: 3,
    }}
  >
      <Card
      elevation={6}
      sx={{
        width: "100%",
        maxWidth: 500,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold", textAlign: "center", color: "primary.main" }}
        >
          📝 Todo List
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            label="Add a Todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleAddTodo(inputValue)
            }
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleAddTodo(inputValue)}
          >
            Add
          </Button>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ mb: 2, fontWeight: "bold", color: "text.secondary" }}
        >
          {completedTodos.length} of {todos.length} completed
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 , gap: 1, displaycontent: "center", justifyContent: "center"}}>
          <Checkbox
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "bold", color: "text.secondary" }}
        >
          Show completed todos
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setTodos([]);
            localStorage.removeItem("todos");
            showSnackbar("All todos deleted.", "success");
            setShowCompleted(false);
          }}
          >
          <DeleteIcon/> Delete All Todos
        </Button>
        </Box>

        <List>
          {todos.length === 0 ? (
            <Typography
              align="center"
              color="text.secondary"
              sx={{ mt: 3 }}
            >
              No todos yet 🎉
            </Typography>
          ) : (
            todosToDisplay.map((todo, index) => (
              <ListItem
                key={index}
                divider
                sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: "grey.100",
                "&:hover": {
                  bgcolor: "grey.200",
                  },
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={(e) =>{ 
                    e.stopPropagation(),
                    toggleTodoCompletion(index)
                  }}
                />
                <ListItemText primary={todo.text} sx={{ textDecoration: todo.completed ? "line-through" : "none" }} />
                 <IconButton
                    color="error"
                    onClick={(e) => { e.stopPropagation(); onDeleteTodo(index); }}
                  >
                    <DeleteIcon />
                  </IconButton>
              </ListItem>
            ))
          )}
        </List>
        </CardContent>
      </Card>
      {snackbarElement}
  </Box>
);
}


export default TodoList;
