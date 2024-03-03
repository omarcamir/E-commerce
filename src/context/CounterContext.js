import { createContext, useContext, useState } from "react";

const CounterContext = createContext();

function CounterContextProvider ({children}){
    const [counter, setCounter] = useState(0);
    function increment() {
        setCounter(counter+1)
    }
    function decrement() {
        counter > 0 && setCounter(counter-1)
    }
    return(
        <CounterContext.Provider value={{counter , increment , decrement }}>
            {children}
        </CounterContext.Provider>
    )
}

function useCounter() {
    const context = useContext(CounterContext);
    if (context === undefined) return("useCounter must be used within a CounterContextProvider")
    return context;
}

export {CounterContextProvider , useCounter}