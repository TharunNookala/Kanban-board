import React, { useState } from 'react';

const TaskItem = ({ task, handleStatusChange }) => {
    const [edit, setEdit] = useState(false)
    const [taskData, setTaskData] = useState({
        title: task.title,
        storyPoints: task.storyPoints,
        description: task.description,
        status: task.status,
        subtasks : task.subtasks,
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
                        edit ? <input type="number" name="storyPoints" value={taskData.storyPoints} onChange={handleTaskDataChange} className='p-1 outline-none'/>
                             : <span>Story points : {taskData.storyPoints}</span>
                    }
                    {edit || <select value={taskData.status} onChange={handleStatusSelect} className='bg-transparent'>
                        <option value="Dev in progress">Dev in progress</option>
                        <option value="QA in progress">QA In Progress</option>
                        <option value="Rework">Rework</option>
                        <option value="Closed">Closed</option>
                    </select>}
                </p>
                {
                edit ? <textarea name="description" placeholder='Add description here...' value={taskData.description} onChange={handleTaskDataChange} className='outline-none w-full p-2'/>
                     :  <p className='w-full p-1'>{taskData.description}</p>
                }
                <ul className='p-2 flex flex-col justify-center gap-1'>
                {task.subtasks.map(subtask => (
                  <li key={subtask} className='flex gap-3 items-center'>
                    <p className='text-sm bg-slate-400 px-1 rounded'>{subtask}</p>
                    {edit && <button className='text-xs bg-slate-200 rounded-full px-1'>x</button>}
                </li>
                ))}
              </ul>
        </div>
    );
};

export default TaskItem;
