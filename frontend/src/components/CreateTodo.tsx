import { useState } from 'react';
import useTodoStore from '../store/useTodoStore';

const CreateTodo = () => {
  const { createTodo, isLoading } = useTodoStore();
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newTodo.title.length < 2) {
      return;
    }

    try {
      console.log('data to send: ', newTodo);

      await createTodo(newTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
    }

    setNewTodo({
      title: '',
      description: '',
    });
  };

  return (
    <form
      className="flex flex-col items-center gap-3 border-black border-2 py-3"
      onSubmit={handleSubmit}>
      <h1>Create new todo</h1>
      <input
        name="title"
        className="p-2 border-black border-[1px] rounded-md"
        type="text"
        value={newTodo.title}
        onChange={(e) =>
          setNewTodo((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        placeholder="title"
      />
      <input
        name="description"
        className="p-2 border-black border-[1px] rounded-md"
        type="text"
        value={newTodo.description}
        onChange={(e) =>
          setNewTodo((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        placeholder="description"
      />
      <button
        className="rounded-md border-black border-[1px] px-5 hover:opacity-50"
        type="submit"
        disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Add'}
      </button>
    </form>
  );
};

export default CreateTodo;
