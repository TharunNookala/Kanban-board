import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDone } from "react-icons/md";
import TaskItem from "./TaskItem";

const TaskList = ({listTitle, categoryId,handleEdit, handleDelete, categories}) => {
    const[isEdit, setIsEdit] = useState(false);
    const [editedTitle, setEditeditle] = useState(listTitle);

    const handleSave = () => {
        handleEdit(categoryId, editedTitle);
    setIsEdit(false);
    };
  return (
    <section className='border border-black min-w-[300px] min-h-[250px]'>
        <header className='bg-gray-500 px-2 py-1 text-white flex items-center justify-between'>
        {isEdit ?
        <input type="text" className="p-1 rounded border text-black border-slate-500 outline-none" value={editedTitle} onChange={(e)=>setEditeditle(e.target.value)}/> :
        <p className="text-center">{listTitle}</p>
        }
        <div className="p-2 flex gap-2">
            {isEdit ? <button onClick={handleSave}><MdDone size={23}/></button> : 
            <button onClick={()=>setIsEdit(true)}><MdEdit fill="skyblue" size={23}/></button>
            }
            <button onClick={handleDelete}><MdDelete fill="red" size={23}/></button>
        </div>
        </header>
    <div className="p-2 flex flex-col gap-2">
            {categories
                    .filter(category => category.id === categoryId)
                    .map(category => (
                        category.tasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    ))} 
    </div> 
    </section>
  )
}

export default TaskList