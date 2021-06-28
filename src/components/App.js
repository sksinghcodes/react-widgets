import React, {useState} from 'react';
import Accordion from './Accordion';
import Search from './Search';
import Dropdown from './Dropdown';
import Translate from './Translate';
import Route from './Route';
import Header from './Header';

// const showComponent = (route, component) => {
//     return window.location.pathname === route
//     ? component
//     :null
// }


const items = [
    {
        title: 'what is React?',
        content: 'React is a front end javascript framework',
    },
    {
        title: 'Why use React?',
        content: 'React makes easy work difficult',
    },
    {
        title: 'Why do you say that?',
        content: 'LOL!, kidding, it seems like a burden for small projects but it is a life saver when it comes to huge projects.',
    }
];

const options = [
    {
        label: 'Red',
        value: 'red',
    },
    {
        label: 'Yellow',
        value: 'yellow',
    },
    {
        label: 'Green',
        value: 'green',
    },
]

const App = () => {
    const [selected, setSelected] = useState(options[0])
    // return <Accordion items={items}/>
    // return <Search />

    return (
        <div>
            <Header />
            <Route path="/">
                <Accordion items={items}/>
            </Route>
            <Route path="/list">
                <Search />
            </Route>
            <Route path="/dropdown">
                <Dropdown
                    label='Select a color'
                    options={options}
                    selected={selected}
                    onSelectedChange={setSelected}
                />
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
        </div>
    )
}

export default App;