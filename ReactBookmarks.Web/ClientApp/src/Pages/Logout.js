import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useBookmarksContext } from '../BookmarksContext';

const Logout = () => {
    const history = useHistory();
    const { setUser } = useBookmarksContext();

    useEffect(() => {
        const doLogout = async () => {
            setUser(null);
            await axios.post('/api/bookmarks/logout');
        }

        doLogout();
        history.push('/');

    }, []);

    return <></>
}

export default Logout;