import TaskItem from './TaskItem';

const TaskList = ({tasks,error,loading, editedText,setEditedText,handleEditSubmitter}) => {
    return (
        <div className="bg-gray-900 container mx-auto p-10 gap-3 flex flex-col ">
            {
             loading? <p className='text-center'>{error? error:'Loading...'}</p>:tasks.length===0&& <p className='text-center'>No task here!</p>
            }
               {
                tasks.map((task)=>  <TaskItem  task= {task} key={task.id} editedText={editedText} setEditedText={setEditedText} handleEditSubmitter={handleEditSubmitter}/>)
               }
        </div>
    );
};

export default TaskList;
