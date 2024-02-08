'use client';
import TaskList from '@/components/TaskList';
import React, { useState } from 'react';
import {data} from '@/utils/data';

const Dashboard = () => {
  const [categories, setCategories] = useState(data);
  const [isAdd, setIsAdd] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const handleAdd = () => {
    if (newCategory.trim() !== "") {
      setCategories(prevCategories => [...prevCategories, { id: Date.now(), title: newCategory }]);
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
      <div className='flex items-center justify-start gap-4 p-2'>
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

export default Dashboard