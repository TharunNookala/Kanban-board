import React from 'react'

const Button = ({title, handleClick, isSubmitting, type, textColor, bgColor}) => {
  return (
    <button
    type={type || 'button'}
    disabled={isSubmitting}
    className={`flex items-center justify-center gap-3 px-3 py-2 font-medium rounded 
        ${textColor || 'text-black'} 
        ${isSubmitting ? 'bg-black/50' : bgColor 
        ? bgColor : 'bg-green-400'}`
    }
    onClick={handleClick}
    >  
        {title}
    </button>
  )
}

export default Button