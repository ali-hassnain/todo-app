import {COMPLETED} from "../helper.js";

const ToDoCard = ({todo,handleEditTodo,handleDeleteTodo,handleCheckboxChange}) => {
    return(
        <div className="bg-white rounded-lg shadow-md p-4 mt-2 mb-2">
            <div className="flex justify-between items-center mb-2">
                <h3 className={`text-lg font-semibold ${todo.status === COMPLETED ? "line-through" : ""}`}>
                    {todo.title}
                </h3>
                <div>
                    <button
                        className="text-blue-500 hover:text-blue-900 mr-2 cursor-pointer"
                        onClick={() => handleEditTodo(todo)}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-500 hover:text-red-900 cursor-pointer"
                        onClick={() => handleDeleteTodo(todo)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <p className={`text-gray-600 mb-4 ${todo.status === COMPLETED ? "line-through" : ""}`}>
                {todo.description}
            </p>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="form-checkbox mr-2 cursor-pointer"
                    checked={todo.status === COMPLETED}
                    onChange={(event) => handleCheckboxChange(event, todo)}
                />
                <label className="text-gray-600">Completed</label>
            </div>
        </div>
    )
}

export default ToDoCard
