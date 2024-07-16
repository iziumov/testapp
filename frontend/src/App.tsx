import { useEffect } from 'react';
import useTodoStore from './store/useTodoStore';
import { CreateTodo, Todo } from './components';

const App = () => {
  const { todos, isLoading, isError, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return (
    <div className="p-1 max-w-screen-xl mx-auto">
      <h1 className="mb-1 text-2xl mb-4">Todo App</h1>
      <CreateTodo />
      <div className="flex flex-col gap-3">
        <h1 className="my-3 text-xl pb-3 border-b-[1px]">Tasks: </h1>
        <div className="grid grid-cols-4 gap-3">
          {isLoading ? 'Loading' : todos.map((el) => <Todo key={el.id} todo={el} />)}
        </div>
      </div>
    </div>
  );
};

export default App;
