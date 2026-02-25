import { Trash } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse"

type todo ={
    id: number;
    texte: string;
    priority:Priority
}
type Props ={
    todo:todo
    ondelete: ()=>void
    isSelected:boolean
    onToggleSelect:((id : number)=> void)
}
const TodoItems = ({todo , ondelete , isSelected , onToggleSelect}:Props) => {
  return (
    <div className="p-3">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <input type="checkbox" 
                aria-label="text"
                className="checkbox checkbox-primary checkbox-sm"
                checked={isSelected}
                onChange={()=>(onToggleSelect(todo.id))} 
                />
                <span className="text-md font-bold">
                    <span>
                        {todo.texte}
                    </span>
                </span>
                <span
                className={`badge badge-sm badge-soft ${todo.priority==="Urgente" ? "badge-error" : todo.priority==="Moyenne" ? "badge-warning" : "badge-success"}`}
                >
                    {todo.priority}
                </span>
            </div>
            <button 
            aria-label="text"
            onClick={ondelete}
            className="btn btn-sm btn-error btn-soft"
            >
                <Trash className="w-4 h-4"/>
            </button>
        </div>
    </div>
  )
}

export default TodoItems
