import { create } from 'zustand';
import axios from 'axios';

interface TodoStoreType {
  todos: Data[];
  isLoading: boolean;
  isError: null | string;
  fetchTodos: () => Promise<void>;
  createTodo: (todo: Data) => Promise<void>;
  updateTodo: (id: string, updatedTodo: Data) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const useTodoStore = create<TodoStoreType>((set) => ({
  todos: [],
  isLoading: false,
  isError: null,

  fetchTodos: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get('http://127.0.0.1:8080/api/todos');
      const todos = response.data;

      set({ todos });
    } catch (error) {
      console.error('Error fetching todos:', error);
      set({ isError: 'Error fetching todos' });
    } finally {
      set({ isLoading: false });
    }
  },

  createTodo: async (todo) => {
    try {
      set({ isLoading: true });
      const response = await axios.post('http://127.0.0.1:8080/api/todos', todo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      const newTodo = response.data;
      console.log('New Todo', newTodo);

      set((state) => ({
        todos: [...state.todos, newTodo],
      }));
    } catch (error) {
      console.error('Error adding todo:', error);
      set({ isError: 'Error adding todo' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTodo: async (id, updatedTodo) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`http://127.0.0.1:8080/api/todos/${id}`, updatedTodo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? response.data : todo)),
      }));
    } catch (error) {
      console.error('Error updating todo:', error);
      set({ isError: 'Error updating todo' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTodo: async (id) => {
    try {
      set({ isLoading: true });
      await axios.delete(`http://127.0.0.1:8080/api/todos/${id}`);

      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting todo:', error);
      set({ isError: 'Error deleting todo' });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTodoStore;
