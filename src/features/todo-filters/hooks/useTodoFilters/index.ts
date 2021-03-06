import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ACTIVE_STATE_MANAGER, Filter, StateManager } from 'shared/constants';
import { UseTodoFiltersResponse } from './types';
import { useTodoFiltersWithEffector } from './useTodoFiltersWithEffector';
import { useTodoFiltersWithMobx } from './useTodoFiltersWithMobx';
import { useTodoFiltersWithReduxToolkit } from './useTodoFiltersWithReduxToolkit';
import { useTodoFiltersWithRecoil } from './useTodoFiltersWithRecoil';

const hooks: Record<StateManager, () => UseTodoFiltersResponse> = {
    effector: useTodoFiltersWithEffector,
    mobx: useTodoFiltersWithMobx,
    'redux-toolkit': useTodoFiltersWithReduxToolkit,
    recoil: useTodoFiltersWithRecoil,
};

export const useTodoFilters = () => {
    const form = useForm<{ filter: Filter }>({
        defaultValues: {
            filter: Filter.all,
        },
    });

    const { clearAllCompleted, filterBy } = hooks[ACTIVE_STATE_MANAGER]();

    const { watch } = form;

    useEffect(() => {
        const subscription = watch(({ filter }) => {
            if (filter) filterBy(filter);
        });
        return () => subscription.unsubscribe();
    }, [filterBy, watch]);

    return { form, clearAllCompleted };
};
