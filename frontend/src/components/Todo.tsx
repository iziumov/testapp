import { format } from 'date-fns';
import useTodoStore from '../store/useTodoStore';
import { FormEvent } from 'react';

const Todo = ({ todo }: { todo: Data }) => {
  const { deleteTodo } = useTodoStore();
  const { id, title, description, created_at, updated_at } = todo;

  const handleDelete = async (e: FormEvent, id: string) => {
    e.preventDefault();

    try {
      await deleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="shadow-xl rounded-md p-3 w-[300px]">
      <p>{title}</p>
      <p>{description || 'No description'}</p>
      <p>Created: {format(new Date(created_at!), 'PPpp')}</p>
      <p>Updated: {format(new Date(updated_at!), 'PPpp')}</p>
      {/* <button className="border-black border-2" onClick={onEdit}>
        Edit
      </button> */}
      <button
        className="mt-3 px-2 py-1 border-black border-2 rounded-md hover:opacity-50"
        onClick={(e) => handleDelete(e, id)}>
        Delete
      </button>
    </div>
  );
};

export default Todo;
