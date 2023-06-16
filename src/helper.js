import {useMutation, useQueryClient} from "@tanstack/react-query";

export function useTodoQueryClient() {
    const queryClient = useQueryClient();

    const deleteTodo = useMutation(async (todoId) => {
    const response = await fetch(`http://localhost:3005/api/todo?id=${todoId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
}, {
    onSuccess: () => {
        queryClient.invalidateQueries('todos');
    },
});

    const postTodo = useMutation(async (data) => {
    const response = await fetch('http://localhost:3005/api/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to add todo');
    }
},{
    onSuccess: () => {
        queryClient.invalidateQueries('todos');
    },
});

    const updateTodo = useMutation(async (todo) => {
    const response = await fetch(`http://localhost:3005/api/todo`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: todo?._id ?? '',
            title: todo?.title ?? '',
            description: todo?.description ?? '',
            status: todo?.status ?? '',
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
}, {
    onSuccess: () => {
        queryClient.invalidateQueries('todos');
    },
})
    return { deleteTodo, postTodo, updateTodo };
};

export const getTodos = async () => {
    const response = await fetch('http://localhost:3005/api/todo');
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}

export const COMPLETED = "COMPLETED"
export const PENDING = "PENDING"
