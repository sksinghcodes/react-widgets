import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Search = () => {
    const [term, setTerm] = useState("programming");
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    console.log(term)

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    useEffect(() => {
        const search = async () => {
            const { data } = await axios('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                }
            });
            setResults(data.query.search)
        }
        if(term) {
            search();
        }
    }, [debouncedTerm]);

    // useEffect(async () => {
    //     await axios('gcvjgvl'); 
    // }, [term]);
    // we cant pass an async function into an another function

    // #### methods to deal with the issue
    // ##1 pass the async function in a normal function and pass that normal funtion instead
    // useEffect(() => {
    //     const search = async () => {
    //         const { data } = await axios('https://en.wikipedia.org/w/api.php', {
    //             params: {
    //                 action: 'query',
    //                 list: 'search',
    //                 origin: '*',
    //                 format: 'json',
    //                 srsearch: debouncedTerm,
    //             }
    //         });
    //         setResults(data.query.search)
    //     }
    //     search();
    // }, [debouncedTerm]);

    // ##2 we can use immidiately invoked function instead of naming it
    // useEffect(() => {
    //     (async () => {
    //         await axios('https://nl.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=');
    //     })();
    // }, [term]);

    // ##3 use promise
    // useEffect(() => {
    //     axios.get('https://nl.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=')
    //         .then(response => {
    //             console.log(response.data);
    //         })
    // }, [term]);

    //########### fro understanding
    // useEffect(() => {
    //     console.log("initial render or term was changed");

    //     return () => {
    //         console.log("second");
    //     }/* returned function */
    // }/* passed fuction */, [term])

    const renderedList = results.map(result => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a 
                        className="ui button"
                        target="_blank"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                        rel="noreferrer"
                    >Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {/* {result.snippet} */}
                    {/* ## this won't render string as html */}

                    <span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
                    {/* ## this would */}
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input"
                    />
                </div>
            </div>

            <div className="ui celled list">
                {renderedList}
            </div>
        </div>
    )
}

export default Search;