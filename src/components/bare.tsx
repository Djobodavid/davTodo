
import { useEffect, useState } from "react";
import TodoItems from "./todoItems";
import { Construction } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse"

type todo ={
    id: number;
    texte: string;
    priority:Priority
}

export const Bare = ()=>{
    const[input , setInput]= useState<string>("")
    const[priority , setPriority]= useState<Priority>("Moyenne")
    const savedTodos = localStorage.getItem("todos")
    const initialTodos = savedTodos ? JSON.parse(savedTodos):[]
    const[todos , setTodos]=useState<todo[]>(initialTodos)

    useEffect(()=>{
        localStorage.setItem("todos" , JSON.stringify(todos))
    } , [todos])

    function addTodo(){
        if(input.trim() === ""){
            return
        }

        const newTodo: todo = {
            id: Date.now(),
            texte: input.trim(),
            priority:priority

        }

        const newTodos = [newTodo, ...todos]
        setTodos(newTodos)
        setInput("")
        setPriority("Moyenne")
        console.log(todos)
        console.log(newTodos)
    }
    const [filter , setFilter] = useState<Priority | "Tous" >("Tous")

    let filteredTodo :todo[] = []

    if(filter==="Tous"){
        filteredTodo=todos
    }else{
        filteredTodo=todos.filter((todos)=>(todos.priority===filter))
    }

    const urgentCount = todos.filter((t)=>t.priority==="Urgente").length
    const moyenneCount = todos.filter((t)=>t.priority==="Moyenne").length
    const basseCount = todos.filter((t)=>t.priority==="Basse").length
    const totolCount = todos.length

    function deleteTodo (id: number){
        const newTodo = todos.filter((todo)=>todo.id!==id)
        setTodos(newTodo)
    }

    const [selectedTodo , setSelectedTodo]=useState<Set<number>>(new Set())

    function toggleSelectTodo (id:number){
        const newSelected= new Set(selectedTodo)
        if(newSelected.has(id)){
            newSelected.delete(id)
        } else{
            newSelected.add(id)
        }
        setSelectedTodo(newSelected)
    }

    function finishedSelected (){
        const newTodos = todos.filter((todo)=>{
            if(selectedTodo.has(todo.id)){
                return false
            }else{
                return true
            }
        })
        setTodos(newTodos)
        setSelectedTodo(new Set())
    }

    return(
        <>
        <div className="flex flex-col sm:flex-row gap-3">
            <input 
                type="text"
                className="input w-full"
                placeholder="ajouter une tache..."
                aria-label="text"
                value={input}
                onChange={(e)=>{setInput(e.target.value)}}
            />
            <select
            className="select w-full"
            aria-label="text"
            value={priority}
            onChange={(e)=>{setPriority(e.target.value as Priority)}}


            >
                <option value="Urgente">Urgente</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
            </select>
            <button onClick={addTodo} className="btn btn-primary">
                Ajouter
            </button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
            <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-4">
                <button 
                className={`btn btn-soft ${filter=== "Tous" ? "btn-primary" : ""}`}
                onClick={()=>setFilter("Tous")}
                >
                    Tous({totolCount})
                </button>
                <button 
                className={`btn btn-soft ${filter=== "Urgente" ? "btn-primary" : ""}`}
                onClick={()=>setFilter("Urgente")}
                >
                    Urgente({urgentCount})
                </button>
                <button 
                className={`btn btn-soft ${filter=== "Moyenne" ? "btn-primary" : ""}`}
                onClick={()=>setFilter("Moyenne")}
                >
                    Moyenne({moyenneCount})
                </button>
                <button 
                className={`btn btn-soft ${filter=== "Basse" ? "btn-primary" : ""}`}
                onClick={()=>setFilter("Basse")}
                >
                    Basse({basseCount})
                </button>
            </div>
            <button
                onClick={finishedSelected}
                className="btn btn-primary"
                disabled={selectedTodo.size ===0 }
                >
                    Finir la selection({selectedTodo.size})
                </button>
            </div>
            {filteredTodo.length > 0 ? (
                <ul className="divide-y divide-primary/20">
                    {filteredTodo.map((todo)=>(
                        <li
                        key={todo.id}
                        >
                            <TodoItems 
                            todo={todo}
                            ondelete={() => deleteTodo(todo.id)}
                            isSelected={selectedTodo.has(todo.id)}
                            onToggleSelect= {toggleSelectTodo}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex justify-center items-center flex-col p-5">
                    <div>
                        <Construction strokeWidth={1} className="w-40 h-40 text-primary"/>
                    </div>
                    <p className="text-sm">Aucune tache pour ce filtre</p>
                </div>
            )}
        </div>
        </>
    )
}
export default Bare