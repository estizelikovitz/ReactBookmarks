import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BookmarksContext = createContext();

const BookmarksContextComponent = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get('/api/bookmarks/getcurrentuser');
            setUser(data);
        }

        getUser();
    }, []);


    return <BookmarksContext.Provider value={{ user, setUser }}>
        {children}
    </BookmarksContext.Provider>

}

const useBookmarksContext = () => useContext(BookmarksContext);


export { BookmarksContextComponent, useBookmarksContext };