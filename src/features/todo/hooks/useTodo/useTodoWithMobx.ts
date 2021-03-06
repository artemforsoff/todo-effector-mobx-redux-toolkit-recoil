import { todoApi } from 'shared/api';
import { todoStore } from 'stores/mobx';
import { UseTodo } from './types';

export const useTodoWithMobx: UseTodo = (todo) => {
    const handleChange–°ompleted = (completed: boolean) => {
        return todoStore.fetchUpdateTodo({
            ...todo,
            completed,
        });
    };

    const updateTodo = (payload: Parameters<typeof todoApi.updateTodo>['0']) => {
        return todoStore.fetchUpdateTodo({
            ...todo,
            ...payload,
        });
    };

    const handleDelete = () => todoStore.fetchDeleteTodo(todo.id);

    return {
        handleChange–°ompleted,
        updateTodo,
        handleDelete,
    };
};
