import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import TaskItem from "./TaskItem";

const TaskList = ({listTitle, categoryId,handleEdit, handleDelete, categories, data, setData}) => {
    const[isEdit, setIsEdit] = useState(false);
    const [editedTitle, setEditeditle] = useState(listTitle);
    const [addNew, setAddNew] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [tasks, setTasks] = useState(categories.find(category => category.id === categoryId).tasks);

    const handleSave = () => {
        handleEdit(categoryId, editedTitle);
    setIsEdit(false);
    }
    const handleAddTask = () => {
        setAddNew(true);
        if (newTaskTitle.trim() !== "") {
            const newTask = {
                id: Date.now(), 
                title: newTaskTitle,
                status: "pending", 
                points: 5, 
            };
            setTasks(prevTasks => [...prevTasks, newTask]);
            setNewTaskTitle("");
        }
    };
    const handleStatusChange = (taskId, newStatus) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setTasks(updatedTasks);
    };
  return (
    <section className='border border-black min-w-[300px] h-full overflow-y-scroll'>
        <header className='bg-gray-500 px-2 py-1 text-white flex items-center justify-between'>
        {isEdit ?
        <input type="text" className="p-1 rounded border text-black border-slate-500 outline-none" value={editedTitle} onChange={(e)=>setEditeditle(e.target.value)}/> :
        <p className="text-center">{listTitle}</p>
        }
        <div className="p-2 flex gap-2">
            {isEdit || <button onClickCapture={handleAddTask}><CiCirclePlus size={23}/></button>}
            {isEdit ? <button onClick={handleSave}><MdDone size={23}/></button> : 
            <button onClick={()=>setIsEdit(true)}><MdEdit fill="skyblue" size={23}/></button>
            }
            <button onClick={handleDelete}><MdDelete fill="red" size={23}/></button>
        </div>
        </header>
    <div className="p-2 w-full flex flex-col gap-2">
    {addNew && (
                <div className="p-2">
                    <input
                        type="text"
                        className="p-1 rounded border text-black border-slate-500 outline-none"
                        placeholder="Enter new task title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                </div>
            )}
            {categories
                    .filter(category => category.id === categoryId)
                    .map(category => (
                        category.tasks.map(task => (
                            <TaskItem key={task.id} task={task} handleStatusChange={handleStatusChange}/>
                        ))
                    ))} 
    </div> 
    </section>
  )
}

export default TaskList