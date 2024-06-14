import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";
import type { Billboard } from "./BookingContext";


//Uso de useContext para manejar estado Global


type BillBoardsType = Array<Billboard>;

interface BillBoardContextType {
    BillBoards: BillBoardsType;
    setBillBoards: Dispatch<SetStateAction<BillBoardsType>>;
}

const defaultValue: BillBoardContextType = {
    BillBoards: [],
    setBillBoards: () => { }
};

export const billBoardContext = createContext<BillBoardContextType>(defaultValue);

interface Provider {
    children: ReactNode;
}

export const BillBoardProvider: React.FC<Provider> = ({ children }) => {
    const [BillBoards, setBillBoards] = useState<BillBoardsType>([]);

    return (
        <billBoardContext.Provider value={{ BillBoards, setBillBoards }}>
            {children}
        </billBoardContext.Provider>
    );
};
