const FormField = ({type, state, placeholder, isTextArea, setState}) => {
  return (
    <div className="flex flex-col items-center justify-start w-full gap-4">
        {
            isTextArea ? (
            <textarea 
            placeholder={placeholder}
            value={state}
            required
            className="p-2 rounded border bg-transparent border-slate-500 outline-none"
            onChange={(e)=>setState(e.target.value)}
            />) : 
            <input 
            type={type || "text"}
            placeholder={placeholder}
            value={state}
            required
            className="p-2 rounded border bg-transparent border-slate-500 outline-none"
            onChange={(e)=>setState(e.target.value)}
            />
        }
    </div>
  )
}

export default FormField