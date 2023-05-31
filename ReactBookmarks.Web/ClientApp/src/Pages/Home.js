import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBookmark from '../Components/TopBookmark';

const Home = (props) => {
    const [topbookmarks, setTopbookmarks] = useState([]);
    useEffect(() => {

        const getTopbookmarks = async () => {
            const { data } = await axios.get(`/api/bookmarks/gettopbookmarks`);
            setTopbookmarks(data);
        }
        getTopbookmarks();
    }, []);

    return (

        <>


            <div>
                
                    <br />
                    <br />
                    <br />
                    <br />
                <h1>Welcome to the React Bookmark Application.</h1>
                <h3>Top 5 most bookmarked links</h3>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Url</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topbookmarks.map(tb => <TopBookmark topbookmark={tb} />)}
                    </tbody>
                </table>
            </div>

        </>
    )
}
export default Home;