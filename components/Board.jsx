'use client';
import TaskList from '@/components/TaskList';
import React, { useEffect, useState } from 'react';
// import {data} from '@/utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '@/store/taskSlice';

const Board = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const {data, isLoading } = useSelector(state=>state.task);
  const tasksArr = data?.data?.tasks;

  useEffect(()=>{
      dispatch(getTasks());     
  },[dispatch]);
  useEffect(() => {
    // if (data && data?.data && tasksArr.length>0 ) {
      setCategories(tasksArr);
    // }
  }, [tasksArr]);

  console.log("Tasks:", categories)
  const handleAdd = () => {
    if (newCategory.trim() !== "") {
        const newCategoryId = Date.now();
        const newCategoryObj = { categoryId: newCategoryId, category: newCategory, tasks: [] };
        setCategories(prevCategories => [...prevCategories, newCategoryObj]);
        setNewCategory("");
        setIsAdd(false);
    }
  };
  const handleEdit = (categoryId, editedTitle) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.categoryId  === categoryId ? { ...category, category: editedTitle } : category
      )
    );
  };

  const handleDelete = (categoryId) => {
    setCategories(prevCategories =>
      prevCategories.filter(category => category.categoryId !== categoryId)
    );
  };

  return (
    <section className='w-full min-h-screen h-full p-5 flex flex-col items-start justify-start gap-4'>
      <div className='w-full flex items-center gap-2'>
        <button onClick={()=>setIsAdd(!isAdd)} className='bg-gray-200 p-2 text-end'>{isAdd ? "cancel" :"Add Category"}</button>
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
      {categories?.map((category) =>(
          <TaskList
          listTitle={category?.category}
          categories={category.tasks}
          key={category?.categoryId}
          categoryId={category?.categoryId}
          handleEdit={handleEdit}
          handleDelete={() => handleDelete(category?.categoryId)}
        />
      ))}
      </div>
    </section>
  )
}

export default Board