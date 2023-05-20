import { createContext, useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import Header from './components/Header';
import TaskList from './components/TaskList';
export const DeleteHandlerContext = createContext();
export const EditHandlerContext = createContext();
const App = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editedText, setEditedText] = useState('');
    const [toggleEditMode, setToggleEditMode] = useState(true);
    useEffect(() => {
        // getting data
        getData();
    }, []);
    // getting into server data
    const getData = async () => {
        try {
            const res = await fetch(
                'https://nettle-grizzled-biology.glitch.me/task'
            );
            if (!res.ok) throw new Error('somthing wont wrong');
            const data = await res.json();
            setTasks(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
        }
    };
    // delete event
    const handleDelete = (id) => {
        // delete data
        deleteData(id);
        // set updated tasks
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const deleteData = async (id) => {
        await fetch(`https://nettle-grizzled-biology.glitch.me/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        });
    };
    // editing event
    const handleEdit = (id) => {
        const [editableTarget] = tasks.filter((task) => task.id === id);
        editableTarget.isEditable = true;
        setEditedText(editableTarget.text);
        setTasks([...tasks]);
        setToggleEditMode(false);
        // re-arrange
        tasks
            .filter((taks) => taks.id !== id)
            .map((targetedEl) => (targetedEl.isEditable = false));
    };
    // editing task form handler
    const handleEditSubmitter = (e, id) => {
        e.preventDefault();
        setToggleEditMode(!toggleEditMode);
        const editPersistance = {
            id: id,
            text: editedText,
        };
        // put request
        puttingRequest(id, editPersistance);
        const [editableTarget] = tasks.filter((task) => task.id === id);
        editableTarget.isEditable = false;
        editableTarget.text = editPersistance.text;

        setTasks([...tasks]);
    };
    // putting request server into data
    const puttingRequest = async (id, newData) => {
        await fetch(`https://nettle-grizzled-biology.glitch.me/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
    };
    return (
        <div className="Wraper bg-gradient-to-t from-gray-900  to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10 font-medium">
            <DeleteHandlerContext.Provider value={handleDelete}>
                <EditHandlerContext.Provider value={handleEdit}>
                    <Header />
                    <AddTask tasks={tasks} setTasks={setTasks} />
                    <TaskList
                        tasks={tasks}
                        error={error}
                        loading={loading}
                        handleEditSubmitter={handleEditSubmitter}
                        editedText={editedText}
                        setEditedText={setEditedText}
                    />
                    <Footer />
                </EditHandlerContext.Provider>
            </DeleteHandlerContext.Provider>
        </div>
    );
};

export default App;
