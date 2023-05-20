import { useContext, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { DeleteHandlerContext, EditHandlerContext } from '../App';

const TaskItem = ({ task, editedText, setEditedText, handleEditSubmitter }) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleDelete = useContext(DeleteHandlerContext);
    const handleEdit = useContext(EditHandlerContext);

    return (
        <div className="taskitem flex items-center justify-between  bg-gray-800 py-5 p-5 rounded-md duration-300 hover:bg-gradient-to-r hover:from-teal-900 hover:to-gray-800 group">
            <div className="taskitem-left flex items-center gap-3">
                <span>
                    <input
                        type="checkbox"
                        className="accent-teal-400 cursor-pointer"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                </span>
                {task.isEditable && (
                    <form onSubmit={(e) => handleEditSubmitter(e, task.id)}>
                        <input
                            className="bg-transparent outline-none border-b-2 pb-1 border-gray-500 focus:border-teal-500"
                            type="text"
                            required
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                        />
                    </form>
                )}
                {!task.isEditable && (
                    <p
                        className={`group-hover:text-teal-400 ${
                            isChecked
                                ? `line-through text-gray-500 group-hover:text-teal-600`
                                : null
                        }`}
                    >
                        {task.text}
                    </p>
                )}
            </div>
            <div className="taskitem-right flex items-center gap-3">
                <button
                    className="duration-300 hover:text-teal-500 cursor-pointer text-gray-500"
                    onClick={() => handleEdit(task.id)}
                >
                    <FiEdit />
                </button>
                <button
                    className="hover:text-rose-500 duration-300 cursor-pointer text-gray-500"
                    onClick={() => handleDelete(task.id)}
                >
                    <FiTrash />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
