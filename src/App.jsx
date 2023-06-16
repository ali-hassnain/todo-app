import {useRef, useState} from "react";

import {
    useQuery,
} from '@tanstack/react-query'
import './App.css'
import {COMPLETED, getTodos, PENDING, useTodoQueryClient} from "./helper.js";
import AddToDoButton from "./components/AddToDoButton.jsx";
import AddToDoTaskForm from "./components/AddTodoTaskForm.jsx";
import ToDoCard from "./components/ToDoCard.jsx";

function App() {
    const [isModalOpen, setIsModalOpen] = useState({open:false,todo:null});
    const { deleteTodo, postTodo, updateTodo } = useTodoQueryClient();
    const formRef = useRef(null);

    const handleResetForm = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    const handleDeleteTodo = (todo) => {
        deleteTodo.mutate(todo?._id);
    };

    const handleEditTodo = (todo) => {
        setIsModalOpen({todo, open:true});
        handleResetForm({
            todoTitle: todo.title || "",
            todoDescription: todo.description || "",
        });
    };

    const onSubmit = async (data) => {
        try {
            if (isModalOpen.todo?._id) {
                await updateTodo.mutateAsync({
                    _id: isModalOpen.todo?._id,
                    title: data?.todoTitle,
                    description: data?.todoDescription,
                    status:isModalOpen.todo?.status
                });
            } else {
                await postTodo.mutateAsync({
                    title: data?.todoTitle,
                    description: data?.todoDescription,
                    status: PENDING,
                });
            }
            closeModal();
            handleResetForm()
        } catch (error) {
            console.log(error)
        }
    };

  const todosData = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  const todos = todosData?.data?.payload


    const handleCheckboxChange = async (event, todo) => {
        const { checked } = event.target;
        const updatedTodo = { ...todo, status: checked ? COMPLETED : PENDING };
        await updateTodo.mutateAsync(updatedTodo);
    };

    function openModal (){
        handleResetForm()
        setIsModalOpen({todo:null, open:true});
    };

    function closeModal (){
        setIsModalOpen({todo:null, open:false});
        handleResetForm()
    }

    if(todosData.isLoading){
        return (
            <div className="fixed top-0 left-0 right-0 flex justify-center mt-10">
                <div className="text-2xl font-bold">Loading...</div>
            </div>
        )
    }

    if(todosData.isError){
        return(
            <div className="bg-red-500 text-white p-4 text-center">
                Error: {todosData.error.message}
            </div>
        )
    }
    return (
    <>
        <AddToDoButton openModal={openModal}/>
        {isModalOpen.open && (
            <AddToDoTaskForm
                handleResetForm={handleResetForm}
                formRef={formRef}
                isModalOpen={isModalOpen}
                onSubmit={onSubmit}
                closeModal={closeModal}
                setIsModalOpen={setIsModalOpen}
            />
        )}
        <div className={"m-10"}>
            {todos?.length > 0 ? todos.map((todo)=>{
                return(
                    <ToDoCard
                        key={todo?._id}
                        todo={todo}
                        handleEditTodo={handleEditTodo}
                        handleDeleteTodo={handleDeleteTodo}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                )
            }) : null
            }
        </div>
    </>
  )
}

export default App
