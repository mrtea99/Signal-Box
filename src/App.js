import React from 'react';
import './App.css';

import MakeBatch from './components/MakeBatch/MakeBatch.js';
import BatchList from './components/BatchList/BatchList.js';
import BatchEditor from './components/BatchEditor/BatchEditor.js';

const defaultBatchData = [
  {
    batchInfo: {
      batchId: 1,
      startDate: '2020-01-01',
      manufacturer: 'John',
      quantity: 5
    },
    prep: {
      startTime: null,
      endTime: null
    }
  },
  {
    batchInfo: {
      batchId: 2,
      startDate: '2020-02-01',
      manufacturer: 'John',
      quantity: 10
    },
    prep: {
      startTime: null,
      endTime: null
    }
  }
]

function App() {
  const savedBatchData = () => JSON.parse(window.localStorage.getItem('batchData')) || defaultBatchData
  //const savedBatchData = () => defaultBatchData

  const [batchData, setBatchData] = React.useState(savedBatchData)
  const [currentBatchUid, setCurrentBatchUid] = React.useState(null)

  React.useEffect(() => {
    window.localStorage.setItem('batchData', JSON.stringify(batchData));
  },[batchData])

  return (
    <main className="app-wrap">
      <section>
        <BatchList
          batchData={batchData}
          setBatchData={setBatchData}
          setCurrentBatchUid={setCurrentBatchUid} 
        />
        <MakeBatch
          batchData={batchData}
          setBatchData={setBatchData}
        />
      </section>
      <BatchEditor 
        setCurrentBatchUid={setCurrentBatchUid}
        setBatchData={setBatchData}
        batchData={batchData}
        currentBatchUid={currentBatchUid} />
    </main>
  );
}

export default App;
