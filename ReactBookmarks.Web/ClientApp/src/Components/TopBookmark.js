import React from 'react';
import { Link } from 'react-router-dom';



const TopBookmark = ({ topbookmark }) => {

    const { count, url } = topbookmark;


    return (
        <>
            <tr>
                <td><a href={url} target="_blank">
                    {url}
                </a></td>

                <td>{count}</td>
            </tr>
        </>
    )
}


export default TopBookmark;