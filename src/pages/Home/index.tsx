import { HandPalm, Play } from 'phosphor-react';
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContex';


export interface NewCycleFormData {
    task: string;
    minutesAmount: number;
}

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Type your task'),
    minutesAmount: zod.number().min(5).max(60),
});


export function Home() {
    const { 
        activeCycle, 
        createNewCycle, 
        interrutCurrentCycle 
    } = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });
    
    const { watch, reset, handleSubmit } = newCycleForm;

    const task = watch('task');
    const isSubmitDisabled = !task;

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data);
        reset();
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
             
                { activeCycle ? (
                    <StopCountDownButton type="button" onClick={interrutCurrentCycle}>
                        <HandPalm size={24} />
                        Stop
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Start
                    </StartCountDownButton>
                )
            }
            </form>
        </HomeContainer>
    );
}