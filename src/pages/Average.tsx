import axios from 'axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Average() {
  const [history, setHistory] = React.useState<{listNumber:number[];listCalc:number[]}>({listNumber:[],listCalc:[]});
  
  const [number, setNumber] = React.useState<number>(0);
  const [calc, setCalc] = React.useState<number>(0);

  const getAll=()=>{
    axios.get('http://localhost:8000/all').then((res) => {
      console.log(res.data);
      setHistory(res.data);
    });
  }

  
  useEffect(() => {
    getAll();
    axios.post('http://localhost:8000/update', {reset:true})
  }, []);
  return (
    <div>
      <h1>Average</h1>
      <div>
        <h3>Input number:</h3>
        <input type="number" onChange={(e) => setNumber(Number(e.target.value))} />
        <button onClick={() => {
          axios.post('http://localhost:8000/update', {
            number
          }).then((res) => {
            console.log(res.data);
    
            setCalc(res.data);
          })
        }}>Add</button>
      </div>
      <div>
        <h3>Output calc: <span>{calc}</span></h3>
      </div>
      <h1>History</h1>
      <div>
        <h3>List numbers:</h3>
        {history.listNumber.map((number) => (
          <span>{number} &nbsp;</span>
        ))}
      </div>
      <div>
        <h3>List results:</h3>
        {history.listCalc.map((calc) => (
          <span>{calc} &nbsp;</span>
        ))}
      </div>
      <Link to={'/'}>Back</Link>
    </div>
  )
}

export default Average