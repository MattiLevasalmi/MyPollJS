import { createContext, useContext } from "react";


export interface auth {
    authToken: string,
    setAuthToken: (value: string) => void,
    ID: string,
    setID: (value: string) => void,
    polls: poll[],
    setPolls: (value: poll[]) => void
}

export type question = {
    question: string,
    answers: {answer: string, count: number}[]
}

export type poll = {
    pollName: string,
    _id: string,
    pollDesc: string,
    ownerId: string,
    questions: question[]
}


export const authContext = createContext<auth>({
    authToken: "",
    setAuthToken: () => {},
    ID: "",
    setID: () => {},
    polls: [],
    setPolls: () => {}
});

export const useAuthContext = () => useContext(authContext);