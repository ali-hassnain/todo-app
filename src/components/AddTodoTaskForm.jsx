import {useForm} from "react-hook-form";

const AddToDoTaskForm = ({isModalOpen,onSubmit,closeModal, formRef }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            todoTitle: isModalOpen.todo?.title ?? "",
            todoDescription: isModalOpen.todo?.description ?? "",
        },})

    return (
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
                <div className="bg-white rounded-lg p-4 max-w-sm">
                    <h2 className="text-xl font-semibold mb-4">{isModalOpen.todo?._id ? "Edit Todo" : "Add Todo"}</h2>
                    <input
                        type="text"
                        placeholder="Todo task name"
                        className="border border-gray-300 w-full rounded px-4 py-2 mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        {...register("todoTitle",{ required: {
                                value: true,
                                message: `title is required`
                            } })}
                    />
                    {errors.todoTitle && <span className={"text-red-500 text-sm mt-1"}>{errors.todoTitle.message}</span>}
                    <textarea
                        placeholder="Todo task description"
                        className="border border-gray-300 w-full rounded px-4 py-2 mb-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        {...register("todoDescription",{ required:{
                                value: true,
                                message: `description is required`
                            }})}
                    />
                    {errors.todoDescription && <span className={"text-red-500 text-sm mt-1"}>{errors.todoDescription.message}</span>}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 focus:outline-none"
                        >
                            Add
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-4 py-2 ml-2 focus:outline-none"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddToDoTaskForm
