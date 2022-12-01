import './App.css';
import './Component/Table'
import React, { useMemo, useState, useEffect } from 'react';
import Table from './Component/Table';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import favIcon from './favorite-border.256x225.png'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MuiMenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function App() {
  const [data, setData] = useState([]);
  const [tableVal, setTableVal] = useState(20)
  const [options, setOptions] = useState([]);
  const [faits, setFaits] = useState('INR');
  const [favcolor,setFavColor] = useState('#ef77')
  const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(4),
      backgroundColor: `${favcolor}`
    },
  }));
  
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
              {marC > 0 ? `${marC}m` : ""}
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
              {vol > 0 ? `${vol}k` : ""}
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
              {vol > 0 ? `${vol}k` : ""}
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
    setFaits(e.target.value)
  }
  const handleFavColor = () =>{
    setFavColor(prev=>{
      if(prev === '#ef77'){
        return '#e00d0d'
      }
      else{
        return '#ef77'
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
        {/* <select className='selectOption' onChange={handleOption} placeholder="INR" value={faits}>
        <img src={favIcon} alt="No"/>
          {options.map((option) => (
            <option data-content={<img src={favIcon} alt="No"/>} key={option.name} value={option.name}>{option.name}
            <IconButton
              key="heart"
              sx={{ color: "white" }}
            >
      <FavoriteBorderIcon />
      <img src={favIcon} alt="No"/>
    </IconButton>
            </option>
          ))}
        </select> */}
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={faits}
          onChange={handleOption}
          className='selectOption'
          placeholder="INR"
        >
          {options.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              <FavoriteBorderIcon onClick={handleFavColor} />
              {option.name}
            </MenuItem>
          ))}
        </Select>
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
