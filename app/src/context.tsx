import { createContext, useContext } from "react";


export interface auth {
    authToken: string,
    setAuthToken: (value: string) => void,
    type: string,
    setType: (value: string) => void,
    polls: poll[]
}

export type question = {
    question: string,
    answers: {answer: string, count: number}
}

export type poll = {
    id: number,
    questions: question[]
}


export const authContext = createContext<auth>({
    authToken: "",
    setAuthToken: () => {},
    type: "",
    setType: () => {},
    polls: []
});

export const useAuthContext = () => useContext(authContext);