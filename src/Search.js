import React, { useEffect, useState } from 'react';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Search({ hideButtons = false }) {

    const [{term}, dispatch] = useStateValue();
    const [input, setInput] = useState('');
    const history = useHistory();
    const {
      transcript,
      listening,
    } = useSpeechRecognition();

    console.log(term);

    const search = (e) => {
        e.preventDefault();

        console.log("You inputted: ", input)

        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term: input
        })

        history.push('/search')
    };

    useEffect(()=>{
    setInput(transcript);
    console.log(transcript);
    }, [transcript]);
    return (
        <form className='search'>
            
            <div className='search_input'>
                <SearchIcon className='search_inputIcon' />
                <input value={input} onChange={e => setInput(e.target.value)} />
                <MicIcon
                  color={listening ? "secondary" : "primary"}
                  onTouchStart={SpeechRecognition.startListening}
                  onTouchEnd={SpeechRecognition.stopListening}
                  onMouseDown={SpeechRecognition.startListening}
                  onMouseUp={SpeechRecognition.stopListening}
                  style={{cursor: 'pointer'}}
                />
            </div>

            {!hideButtons ? (
            
            <div className='search_buttons'>
                <Button type='submit' onClick={search} variant='outlined'>Google Search</Button>
                <Button variant='outlined'>I'm Feeling Lucky</Button>
            </div>
            
            ): (
                
            <div className='search_buttons'>
                <Button className='search_buttonsHidden' type='submit' onClick={search} variant='outlined'>Google Search</Button>
                <Button className='search_buttonsHidden' variant='outlined'>I'm Feeling Lucky</Button>
            </div>
            
            )}

            
        </form>
    )
}

export default Search
