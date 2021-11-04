import React, {useEffect, useState} from 'react';
import './App.css'
import axios from "axios";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Link from "@mui/material/Link";

const BASE_URL = `http://hn.algolia.com/api/v1/search?query=`;

const App = () => {
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('react');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageQty, srtPageQty] = useState(0);

    useEffect(() => {
        axios(BASE_URL + query + `&page=${currentPage}`)
            .then(({data}) => {
                console.log(data)
                setCurrentPage(data.page);
                srtPageQty(data.nbPages);
                setPosts(data.hits)
            })
    }, [query, currentPage]);
    return (
        <Container sx={{marginTop: 2}}>
            <TextField fullWidth id="filled-basic" label="Search" variant="filled" value={query}
                       onChange={e => {
                           setCurrentPage(1)
                           setQuery(e.target.value)}}/>
            <Stack spacing={2}>
                {!!posts && <ul>
                    {posts.map(post => post.title && <li key={post.objectID}><Link href={post.url}>{post.title}</Link></li>)}
                </ul>}
                {!!pageQty && (
                    <Pagination
                        count={pageQty}
                        page={currentPage}
                        onChange={(_, num) => setCurrentPage(num)}
                        showFirstButton
                        showLastButton
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}/>
                )}
            </Stack>
        </Container>
    );
};

export default App;