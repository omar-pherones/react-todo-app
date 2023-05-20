import { useRef, useState } from 'react';

const AddTask = ({ tasks, setTasks }) => {
    const [task, setTask] = useState('');
    const inputRef = useRef(null);
    // add Task Handaler Event
    const addTaskHandaler = (e) => {
        e.preventDefault();
        //  server posting data
        postData(task);
        // clear input fild
        inputRef.current.blur();
        setTask('');
    };
    // server posting data  function
    const postData = async (text) => {
        const res = await fetch(
            'https://nettle-grizzled-biology.glitch.me/task',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ text }),
            }
        );
        const data = await res.json();
        setTasks([...tasks, data]);
    };

    return (
        <form
            className="container mx-auto flex items-center justify-between p-10 bg-gray-900"
            onSubmit={addTaskHandaler}
        >
            <input
                ref={inputRef}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
                type="text"
                placeholder="What things to do?"
                className="bg-transparent outline-none border-b-2 py-3 px-5 border-gray-400 duration-300 focus:border-teal-500"
            />
            <button
                type="submit"
                className="bg-teal-900/30  py-2 px-6 border-2 border-teal-500 rounded-md text-teal-500 font-medium duration-300 hover:text-gray-900 hover:bg-teal-500 hover:border-teal-500"
            >
                Add Task
            </button>
        </form>
    );
};

export default AddTask;
