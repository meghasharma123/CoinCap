import './App.css';
import './Component/Table'
import React, { useMemo, useState, useEffect } from 'react';
import Table from './Component/Table';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Select,{ components } from 'react-select'

function App() {
  const [data, setData] = useState([]);
  const [tableVal, setTableVal] = useState(20)
  const [options, setOptions] = useState([]);
  const [faits, setFaits] = useState('INR');
  const [favName,setFavName] = useState('general')
  const [selectedValue, setSelectedValue] = useState([]);
  const { Option } = components;

 const CustomOption = props => (
  <Option {...props}>
    <span>{<FavoriteBorderIcon onClick={handleFavColor} className={favName} style={{marginRight:'12px'}}/>}</span>
    {
       props.data.symbol+"\t"+props.data.name
    }
  </Option>
);

  
  const columns = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "rank"
      },
      {
        Header: "Name",
        accessor: "name"
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
              {marC > 0 ? `${marC}m` : "0"}
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
              {vol > 0 ? `${vol}k` : "0"}
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
              {vol > 0 ? `${vol}k` : "0"}
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

  const handleViewMore = () => {
    setTableVal(prev => prev + 20);
  }

  const handleOption = (e) => {
    setFaits(e.name)
    setSelectedValue(e);
  }
  const handleFavColor = () =>{
    setFavName(prev=>{
      if(prev === 'general'){
        return 'fav'
      }
      else{
        return 'general'
      }
    })
  }

  useEffect(() => {
    fetch('https://api.coinstats.app/public/v1/coins?skip=0&limit=' + tableVal + '&currency=' + faits).then((ele) => ele.json()).then((ele) => setData(ele.coins))
  }, [tableVal, faits])

  useEffect(() => {
    fetch('https://api.coinstats.app/public/v1/fiats').then((ele) => ele.json()).then((ele) => setOptions(ele));
  }, [])

  return (
    <div className="App">
      <div className='dropDown'>
        <Select
          value={{label : faits}}
          onChange={handleOption}
          className='selectOption'
          placeholder="INR"
          options={options}
          components={{ Option: CustomOption }}
          option= {(provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#192E49' : 'inherit',
            '&:hover': { backgroundColor: state.isSelected ? '#192E49' : 'rgb(222, 235, 255)' }
          })}
        />
      </div>
      <div className='table'>
        {
          data.length > 0 ? <Table data={data} columns={columns} /> : ''
        }
      </div>
      <div className='viewMore'>
        <button onClick={handleViewMore}>View More</button>
      </div>
    </div>
  );
}

export default App;
