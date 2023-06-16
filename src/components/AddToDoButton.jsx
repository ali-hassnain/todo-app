const AddToDoButton = ({openModal}) => {
    return (
        <div className="flex flex-col m-10">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mt-2 focus:outline-none"
                onClick={openModal}
            >
                Add Todo
            </button>
        </div>
    )
}

export default AddToDoButton
