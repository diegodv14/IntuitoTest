import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";


//Uso de useContext para manejar estado Global

type Movie = {
    id: number;
    name: string;
    genre: 'ACTION' | 'ADVENTURE' | 'COMEDY' | 'DRAMA' | 'FANTASY' | 'HORROR' | 'MUSICALS' | 'MYSTERY' | 'ROMANCE' | 'SCIENCE_FICTION' | 'SPORTS' | 'THRILLER' | 'WESTERN';
    allowedAge: number;
    lengthMinutes: number;
    status: boolean;
};

type Billboard = {
    id: number;
    date: Date;
    startTime: string;
    endTime: string;
    movieID: number;
    roomID: number;
    status: boolean;
    Movie: Movie
};

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
