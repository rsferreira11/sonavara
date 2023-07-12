import { useState, useEffect } from 'react';
import './App.css';

import vocabulary from './sonavara';

// mutable
function getItem(vocabulary) {
  const index = Math.floor(Math.random() * vocabulary.length);
  return vocabulary.splice(index, 1)[0];
}

const firstItem = getItem(vocabulary);

function App() {
  const [ wordDefinition, setWordDefinition ] = useState(firstItem);
  const [ extraDefinition, setExtraDefinition ] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch(`https://api.sonapi.ee/v1/${wordDefinition.word}`)
    .then(result => result.json())
    .then(result => {
      if (!ignore) {
        setExtraDefinition(result.wordForms);
      }
    });
    return () => {
      ignore = true;
    };
  }, [wordDefinition]);

  return (
    <div className="App" onClick={() => setWordDefinition(getItem(vocabulary))}>
      <header className="App-header">
        <h1>{wordDefinition.word}</h1>
        <pre style={{textAlign: 'left'}}>{JSON.stringify(extraDefinition, null, 2)}</pre>
      </header>
    </div>
  );
}

export default App;
