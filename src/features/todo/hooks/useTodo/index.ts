import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ACTIVE_STATE_MANAGER, StateManager } from 'shared/constants';
import { UseTodo } from './types';
import { useTodoWithEffector } from './useTodoWithEffector';
import { useTodoWithMobx } from './useTodoWithMobx';
import { useTodoWithReduxToolkit } from './useTodoWithReduxToolkit';
import { useTodoWithRecoil } from './useTodoWithRecoil';

const hooks: Record<StateManager, UseTodo> = {
    effector: useTodoWithEffector,
    mobx: useTodoWithMobx,
    'redux-toolkit': useTodoWithReduxToolkit,
    recoil: useTodoWithRecoil,
};

export const useTodo = (todo: app.Todo) => {
    const { handleChangeСompleted, handleDelete, updateTodo } = hooks[ACTIVE_STATE_MANAGER](todo);

    const [isOpenForm, setIsOpenForm] = useState(false);

    const form = useForm<{ title: app.Todo['title'] }>();

    const handleSubmit = form.handleSubmit(async ({ title }) => {
        const { status } = await updateTodo({
            ...todo,
            title,
        });

        if (status === 200) {
            setIsOpenForm(false);
        }
    });

    useEffect(() => {
        form.setValue('title', todo.title);
    }, [form, todo.title]);

    return {
        handleChangeСompleted,
        handleDelete,
        form: {
            ...form,
            handleSubmit,
        },
        isOpenForm,
        setIsOpenForm,
    };
};
