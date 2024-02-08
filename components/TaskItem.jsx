import React from 'react'

const TaskItem = ({task}) => {
  return (
    <div className='w-[300px] min-h-[200px] border border-black p-2 rounded-lg'>
        <p>{task.title}</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam ducimus aspernatur illum quod hic aliquid quaerat ea deleniti eum pariatur! Dolores magnam consectetur ipsa doloribus facere sed fugit inventore hic.</p>
        <p>{task.status}</p>
    </div>
  )
}

export default TaskItem