import React, { useState } from 'react';

const TaskItem = ({ task, handleStatusChange }) => {
    const [edit, setEdit] = useState(false)
    const [taskData, setTaskData] = useState({
        title: task.title,
        points: task.points,
        description: task.description,
        status: task.status
    });
    const handleStatusSelect = (e) => {
        const newStatus = e.target.value;
        handleStatusChange(task.id, newStatus);
        setTaskData(prevData => ({ ...prevData, status: newStatus }));
    };
    const handleTaskDataChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSave = () => {
        setEdit(false);
    };
    return (
        <div className='w-[300px] min-h-[200px] border border-black rounded-lg flex flex-col'>
            <header className='bg-gray-400 p-3 rounded-t-lg flex items-center justify-between'>
                { edit ? <input type="text" name="title" value={taskData.title} onChange={handleTaskDataChange} className='p-2 rounded border bg-transparent border-slate-500 outline-none'/> 
                       : <p className='ml-2'>{taskData.title}</p>
                }   
                {edit ? <button onClick={handleSave}>save</button> : <button onClick={()=>setEdit(true)}>edit</button>}
            </header>
                       
            <p className='flex items-center justify-between p-2'>
                    {
                        edit ? <input type="number" name="points" value={taskData.points} onChange={handleTaskDataChange} className='w-full outline-none'/>
                             : <span>Story points : {taskData.points}</span>
                    }
                    {edit || <select value={taskData.status} onChange={handleStatusSelect} className='bg-transparent'>
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed</option>
                    </select>}
                </p>
                {
                edit ? <textarea name="description" placeholder='Add description here...' value={taskData.description} onChange={handleTaskDataChange} className='w-full p-2'/>
                     :  <p className='w-full p-1'>{taskData.description}</p>
                }
        </div>
    );
};

export default TaskItem;
