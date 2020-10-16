import React, {useEffect} from 'react';

import '../styles/TabNavigator.css';
import { data } from '../util/Data';

export default function TabNavigator({changePage}) {

    const [Menu, setMenu] = React.useState(data[0]);
    useEffect(() => {
        document.title = `INews | ${Menu}`
    }, [Menu]);

    const click = (item) => {
        setMenu(item);
        changePage(item == 'Trending' ? null : item);
    }

    const menu = data.map(item =>
        <li className={Menu == item ? 'active' : null} key={item}>
            <button onClick={() => click(item)}>{item}</button>
        </li>
    );

    return (
        <div className="container">

            <h1 className="title_style">
                <button className="title_style" 
                    onClick={() => click('Trending')}>
                    INews
                </button>
            </h1>

            <ul children={menu} />
        </div>
    )
}