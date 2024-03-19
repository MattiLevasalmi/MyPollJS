import { createContext, useContext } from "react";


export interface auth {
    authToken: string,
    setAuthToken: (value: string) => void,
    type: string,
    setType: (value: string) => void,
    polls: poll[],
    setPolls: (value: poll[]) => void
}

export type question = {
    question: string,
    answers: {answer: string, count: number}[]
}

export type poll = {
    pollName: string,
    pollId: number
    pollDesc: string,
    questions: question[]
}


export const authContext = createContext<auth>({
    authToken: "",
    setAuthToken: () => {},
    type: "",
    setType: () => {},
    polls: [],
    setPolls: () => {}
});

export const useAuthContext = () => useContext(authContext);