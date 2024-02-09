'use client';
import TaskList from '@/components/TaskList';
import React, { useEffect, useState } from 'react';
// import {data} from '@/utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '@/store/taskSlice';

const Board = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state=>state.task)
  const [categories, setCategories] = useState(data);
  const [isAdd, setIsAdd] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(()=>{
      dispatch(getTasks());
  },[])
  console.log("Tasks:", data)
  const handleAdd = () => {
    if (newCategory.trim() !== "") {
        const newCategoryId = Date.now();
        const newCategoryObj = { id: newCategoryId, title: newCategory, tasks: [] };
        setCategories(prevCategories => [...prevCategories, newCategoryObj]);
        setNewCategory("");
        setIsAdd(false);
    }
  };
  const handleEdit = (categoryId, editedTitle) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId ? { ...category, title: editedTitle } : category
      )
    );
  };

  const handleDelete = (categoryId) => {
    setCategories(prevCategories =>
      prevCategories.filter(category => category.id !== categoryId)
    );
  };

  return (
    <section className='w-full min-h-screen h-full p-5 flex flex-col items-start justify-start gap-4'>
      <div className='w-full flex items-center gap-2'>
        <button onClick={()=>setIsAdd(p => !p)} className='bg-gray-200 p-2 text-end'>Add Category</button>
       { 
       isAdd &&
       <>
       <input type='text' 
          className="p-2 rounded border bg-transparent border-slate-500 outline-none placeholder:text-slate-500" 
          placeholder='Enter category to be added'
          value={newCategory}
          onChange={(e)=>setNewCategory(e.target.value)}
          />
       <button className='bg-gray-200 py-2 px-4' onClick={handleAdd}>add</button>
        </>
       }
      </div>
      <div className='flex w-full h-[95vh] items-start justify-start gap-4 p-2'>
      {categories.map((category) =>(
          <TaskList
          listTitle={category.title}
          categories={categories}
          key={category.id}
          categoryId={category.id}
          handleEdit={handleEdit}
          handleDelete={() => handleDelete(category.id)}
        />
      ))}
      </div>
    </section>
  )
}

export default Board