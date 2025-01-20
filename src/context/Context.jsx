import React, { createContext, useState } from "react";
import run from "../congig/gemini";

export const Context = createContext();


const ContextProvider = (props)=>{


    const [input, setInput] = useState("");
    const [recentPrompt , setRecentPrompt] = useState("");
    const [prevPrompts , setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")

    const delayPara = (index, word) => {
        setTimeout(() => {
            setResultData((prev) => prev + word);
        }, 75 * index);
    };

    const newChat = ()=>{
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt != undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }
        setLoading(false);

        let responseArray = response.split("**");
        let formattedResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                formattedResponse += responseArray[i];
            } else {
                formattedResponse += `<b>${responseArray[i]}</b>`;
            }
        }
    
        let finalResponse = formattedResponse.split("*").join("</br>");
        let words = finalResponse.split(" "); 
        for (let i = 0; i < words.length; i++) {
            delayPara(i, words[i] + " ");
        }
    };
    
    
    const ContextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }


    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider;