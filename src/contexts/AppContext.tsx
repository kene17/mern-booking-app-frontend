import React, { useContext, useState } from "react";
import Toast from "../components/Toast";

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
}
//whenever the app loads up for the first time the context would always be undefined
const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => { setToast(toastMessage) },
        }}>
            {toast && (<Toast message={toast.message} onClose={() => setToast(undefined)} type={toast.type} />)}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}