import { ReactNode, createContext, useReducer, useState } from "react";
import { Cycle, CyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";


interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interrutCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
    children: ReactNode;
}


export const CyclesContext = createContext({} as CyclesContextType);

export function CycleContextProvider({ children }: CyclesContextProviderProps) {
    const [cycleState, dispatch] = useReducer(CyclesReducer, {
        cycles: [],
        activeCycleId: null,
    });
    
    const { cycles, activeCycleId } = cycleState;

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }    

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle));

        setAmountSecondsPassed(0);
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction());
    }

    function interrutCurrentCycle() {
        dispatch(interruptCurrentCycleAction());
    }

    return (
        <CyclesContext.Provider 
            value={{ 
                cycles,
                activeCycle, 
                amountSecondsPassed,
                markCurrentCycleAsFinished, 
                setSecondsPassed,
                createNewCycle,
                interrutCurrentCycle
            }}
        > 
            {children}
        </CyclesContext.Provider>
    )
    
}