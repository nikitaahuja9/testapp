import React, {useState, useEffect} from 'react';

import TabNavigator from './TabNavigator';

import News from './News';
import Loading from '../models/Loading';

import { getNewsHeadLines } from '../services/HTTPClient';
import { shuffle } from 'lodash';

const screen_height = window.innerHeight;
const screen_width = window.innerWidth;

export default function Home() {

    const [headlines, setNewsHeadlines] = useState([]);

    const [page,setPage] = useState(null);

    const [currentState, setCurrentState] = useState({
        loading: true,
        error: false
    });

    useEffect(() => {
        setCurrentState(a => ({...a, loading: true }));
        getNewsHeadLines(page)
            .then(response => {
                if (response && response.data && response.data.status === 'ok') {
                    setNewsHeadlines(shuffle(response.data.articles));
                }
            }, error => {
                console.log(error);
                setCurrentState(a => ({...a, error: true }));
            })
            .finally(_ => {
                setCurrentState(a => ({...a, loading: false }));
            });
    }, [page]);

    return (
        <div style={{
            height: screen_height,
            width: screen_width,
            backgroundColor: "#24292E"
        }}>
            <TabNavigator changePage={(page) => setPage(page)} />

            { currentState.loading ? 
                <Loading/> 
                : 
                <News headlines = {headlines}/> 
            }
        </div>
    )
}