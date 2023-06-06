import { Play } from "phosphor-react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form>
                <FormContainer>
                    <label>I'll work</label>
                    <TaskInput 
                        id="task" 
                        placeholder="Give a name for your task"
                        list="task-suggestions"
                    />

                    <datalist id="task-suggestions">
                        <option>opcao1</option>
                        <option>opcao2</option>
                        <option>opcao3</option>
                    </datalist>

                    <label htmlFor="minutesAmount">during</label>

                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                    />

                    <span>minutes.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton disabled type="submit">
                    <Play size={24} />
                    Start
                </StartCountDownButton>
            </form>
        </HomeContainer>
    );
}