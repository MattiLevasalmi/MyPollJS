import { createContext, useContext } from "react";


export interface auth {
    authToken: string,
    setAuthToken: (value: string) => void,
    type: string,
    setType: (value: string) => void
}

export const authContext = createContext<auth>({
    authToken: "",
    setAuthToken: () => {},
    type: "",
    setType: () => {}
});

export const useAuthContext = () => useContext(authContext);