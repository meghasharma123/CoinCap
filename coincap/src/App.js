import './App.css';
import './Component/Table'
import React,{useMemo,useState,useEffect} from 'react';
import Table from './Component/Table';

function App() {
  const [data,setData] = useState([]);
  const [tableVal,setTableVal ] = useState(20)
  const columns = useMemo(
    () => [
          {
            Header: "Rank",
            accessor: "rank"
          },
          {
            Header: "Price",
            accessor: "price",
            Cell: ({ cell: { value } }) => {
              const marC = (value / 1000).toFixed(5);
              return (
                <>
                  {`${marC}k`}
                </>
              );
            }
          },
          {
            Header: "Market Cap",
            accessor: "marketCap",
            Cell: ({ cell: { value } }) => {
              const marC = (value / 1000000).toFixed(2);
              return (
                <>
                  {marC > 0 ? `${marC}m`: ""}
                </>
              );
            }
          },
          {
            Header: "Volume",
            accessor: "volume",
            Cell: ({ cell: { value } }) => {
              const vol = (value / 1000).toFixed(2);
              return (
                <>
                  {vol > 0 ? `${vol}k`: ""}
                </>
              );
            }
          },
          {
            Header: "Supply",
            accessor: "totalSupply",
            Cell: ({ cell: { value } }) => {
              const vol = (value / 1000).toFixed(2);
              return (
                <>
                  {vol > 0 ? `${vol}k`: ""}
                </>
              );
            }
          },
          {
            Header: "Price Change(1h)",
            accessor: "priceChange1h"
          },
          {
            Header: "Price Change(1d)",
            accessor: "priceChange1d"
          },
          {
            Header: "Price Change(1w)",
            accessor: "priceChange1w"
          }
    ],
    []
  );
  const handleViewMore = ()=>{
    setTableVal(prev=>prev+20);
  }
  useEffect(()=>{
    fetch('https://api.coinstats.app/public/v1/coins?skip=0&limit='+tableVal+'&currency=EUR').then((ele)=>ele.json()).then((ele)=>setData(ele.coins))
  },[tableVal])
  console.log(data)
  return (
    <div className="App">
    <div className='table'>
      {
        data.length>0?<Table data={data} columns={columns}/>:''
      }
    </div>
    <div className='viewMore'>
      <button onClick={handleViewMore}>View More</button>
    </div>
    </div>
  );
}

export default App;
