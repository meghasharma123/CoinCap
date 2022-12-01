import './App.css';
import './Component/Table'
import React, { useRef, useState, useEffect } from 'react';
import Table from './Component/Table';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Select,{ components } from 'react-select'

function App() {
  const [data, setData] = useState([]);
  const [tableVal, setTableVal] = useState(20)
  const [options, setOptions] = useState([]);
  const [faits, setFaits] = useState('INR');
  const [selectedValue, setSelectedValue] = useState([]);
  const { Option } = components;

 const CustomOption = props => {
  return <Option {...props}>
    <span>{<FavoriteBorderIcon style={{cursor:'pointer',marginRight:'12px',fill:selectedValue.includes(props.data.name)?'#F92665':'inherit'}}/>}</span>
    {
       props.data.symbol+"\t"+props.data.name
    }
  </Option>
 }
 const customStyles = () => ({
  option: (provided, state) => ({
    ...provided,
    alignItems: "baseline",
    backgroundColor: "#fff",
    color:'#000'
  })
});

  
  const columns = useRef(
     [
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
    if(selectedValue.length<3){
      setSelectedValue(prev=>[...prev,e.name]);
    }
    if(selectedValue.includes(e.name)){
      setSelectedValue(prev=>prev.filter((val)=>val !== e.name));
    }
  }
  useEffect(()=>{
    let temp = [];
    options.map((e)=>{
      if(selectedValue.includes(e.name)){
        temp.unshift(e)
      }
      else{
        temp.push(e);
      }
    })
    setOptions(temp);
  },[selectedValue])

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
          styles={customStyles()}
        />
      </div>
      <div className='tableComponent'>
        {
          data.length > 0 ? <Table data={data} columns={columns.current} /> : ''
        }
      </div>
      <div className='viewMore'>
        <button onClick={handleViewMore}>View More</button>
      </div>
    </div>
  );
}

export default App;
