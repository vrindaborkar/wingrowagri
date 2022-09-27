import React , {useState , useEffect , useMemo} from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import {Line} from 'react-chartjs-2';
// import StallsData from "./StallsData";
import VendorsData from "./VendorsData";
// import { Link } from 'react-router-dom'
import './Admin.css';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import moment from 'moment';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Revenue',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

const config = {
  type: 'line',
  data: chartData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  },
};


const colors = {
  green: '#4CAF50',
  red: '#DB190C',
  purple: '#8624DB',
  white: '#fff',
  orange: '#FF9066'
}

const Adminpage = () => {
  const [inwardData, setinwardData] = useState([])
  const [outwardData, setoutwardData] = useState([])
  const [selects,setSelects]= useState("");
  const [startDate, setStartDate]= useState(new Date());

  
const setSel=(event)=>{
  console.log("value",event.target.value,startDate);
  setSelects(event.target.value)
}




const farmerMarkets = []
const farmers = []
let TotalPurchaseQty = 0
let TotalPurchaseAmount = 0




inwardData.forEach((e)=>{
  const {data} = e
  farmerMarkets.push(e.farmers_market)
  farmers.push(e.farmer_name)
  TotalPurchaseAmount+=e.total_cummulative_purchase
  data.forEach((e)=>{
    TotalPurchaseQty+=e.purchase_quantity
  })
})


let totalSalesQty = 0
let totalSalesAmount = 0

outwardData.forEach((e)=>{
  totalSalesAmount+=e.total_cummulative_sales
  const {data} = e
  data.forEach((e)=>{
    totalSalesQty+=e.sales_quantity
  })
})


const finalMarketsArr = [...new Set(farmerMarkets)]
const finalNamesArr = [...new Set(farmers)]
console.log(finalMarketsArr,finalNamesArr)




let maxmarkets = 100;
let maxFarmers = 1000;
let maxPurchaseQty = 100000;
let maxPurchaseAmount = 5000000;
let maxSalesAmount = 5000000;
let maxSalesQty = 100000;



const data = {
    summary: [
        {
            title: 'Farmers Markets',
            subtitle: 'Total Farmers Markets',
            value: finalMarketsArr.length, 
            percent: (finalMarketsArr.length*100)/maxmarkets
            
        },
        {
            title: 'Farmers',
            subtitle: 'Total No. of Farmers',
            value: finalNamesArr.length,
            percent: (finalNamesArr.length*100)/maxFarmers
            
        },
        {
            title: 'Purched Quantity',
            subtitle: 'Total Quantity Purched',
            value: TotalPurchaseQty,
            percent: (TotalPurchaseQty*100)/maxPurchaseQty
        },
        {
            title: 'Purchase',
            subtitle: 'Total Purchase Amount',
            value: TotalPurchaseAmount,
            percent: (TotalPurchaseQty*100)/maxPurchaseAmount
        },
        {
            title: 'Sales Quantity',
            subtitle: 'Total Sales Quantity',
            value: totalSalesQty,
            percent: (totalSalesQty*100)/maxSalesQty
        },
        {
            title: 'Sales',
            subtitle: 'Total Sales Amount',
            value: totalSalesAmount,
            percent: (totalSalesAmount*100)/maxSalesAmount
        }
    ]
     
  
    
}


  useEffect(() => {
    fetch("/inward")
    .then((res)=>res.json())
    .then(res=>{
      setinwardData(res);
      
    })
  }, [])


  useEffect(() => {
    
    fetch("/outward")
    .then((res)=>res.json())
    .then(res=>{
      setoutwardData(res);
    })
  }, [])



const handleClick=(e)=>{
  e.preventDefault();
  console.log(selects,startDate, moment(startDate).format("DD-MM-yyyy"));
  
  marketinwardData();
  marketoutwardData();
                      
  
}



const marketinwardData=(e)=>{
  

  const selectDate = moment(startDate).format("DD-MM-yyyy");
  console.log(selectDate,typeof(selectDate))
axios.get(`/showinwarddata/${selects}/${selectDate}`)  
.then(response => {
    console.log(response.data,response.data.length,typeof(response.data));
   
    
    

    if(response.data.length >= 1 && typeof(response.data)=='object'){
      setinwardData(response.data);
      
      
    }
    else{
        alert(response.data)
    }
    
})
}

const marketoutwardData=(e)=>{
  

  const selectDate = moment(startDate).format("DD-MM-yyyy");
  console.log(selectDate,typeof(selectDate))
axios.get(`/showoutwarddata/${selects}/${selectDate}`)  
.then(response => {
    console.log(response.data,response.data.length,typeof(response.data));
   
    
    

    if(response.data.length >= 1 && typeof(response.data)=='object'){
      setoutwardData(response.data);
      
      
    }
    else{
        alert(response.data)
    }
    
})
}


  const handleChange =(date)=>{
        
    console.log(date);
    setStartDate(date)
}




  return (
    <div className='admin_main'>
        {/* <Link to={"./stalls"} className="stalls">Stalls</Link>
        <Link to={"./overalldata"} className="overalldata">Overall Data</Link>
        <Link to={"./vendorsdata"} className="vendorsdata">Vendors Data</Link> */}
        <div className='admin_sub_overalldata'>
        {
          data.summary.map((item, index) => {
            return(<div key={`summary-${index}`} className="sub_overalldata">
                {
                  <>
                  <span>{item.title}</span>
                  <span>{item.subtitle}</span>
                  <span>{item.value}</span>
                  <CircularProgressbarWithChildren
                        className='circularbar'
                        value={item.percent}
                        strokeWidth={6}
                        styles={buildStyles({
                            pathColor: item.percent < 50 ? colors.red : colors.purple,
                            trailColor: '#d3d3d3',
                            strokeLinecap: 'round'
                        })}
                    >
                      <br/>
                        <div className="summary-box__chart__value">
                            {item.percent}%
                        </div>
                    </CircularProgressbarWithChildren>
                  </>
                }
            </div>)
})
        } 
        </div>

        <div className='admin_sub_revenue'>
          <div className='sub_graph'>
          <Line
            data={chartData}
            options={config}
          />
          </div>
        </div>

        <div className='admin_sub_markets'>
          <div className='sub_markets'>
            {/* <label>
                Choose Market
              <select>
              <StallsData/>
              </select>
            </label> */}
            {/* <label  >
                Choose Market
                <select 
                // option ={option}
                value={setselectedMarket}
                onChange={changeHandler}  >
                <option  name="market" class="form-control" >Select the Market</option>

                <option value="HADAPSAR">HADAPSAR</option>
                <option value="KARVE NAGAR">KARVE NAGAR</option>
                <option value="AMANORA TOWN CITY">AMANORA TOWN CITY</option>
                <option value="WANWADI">WANWADI</option>
                <option value="PRABHAT ROAD">PRABHAT ROAD</option>
                <option value="BRAMHASUN CITY">BRAMHASUN CITY</option>
                <option value="KHARADI IT PARK">KHARADI IT PARK</option>
                <option value="MAGARPATTA">MAGARPATTA</option>

                </select>
                
              </label> */}
              <label className='choosemarket'>
                Choose Market
                {/* <select value={selects} onChange={e=> setSelects(e.target.value)}  > */}
                <select value={selects} onChange={setSel}  >

                <option  name="market" >Select the Market</option>
                <option value="HADAPSAR" key="HADAPSAR">HADAPSAR</option>
                <option value="KARVE NAGAR" key="KARVE NAGAR">KARVE NAGAR</option>
                <option value="AMANORA TOWN CITY" key="AMANORA TOWN CITY">AMANORA TOWN CITY</option>
                <option value="WANWADI" key="WANWADI">WANWADI</option>
                <option value="PRABHAT ROAD" key="PRABHAT ROAD">PRABHAT ROAD</option>
                <option value="BRAMHASUN CITY" key="BRAMHASUN CITY">BRAMHASUN CITY</option>
                <option value="KHARADI IT PARK" key="KHARADI IT PARK">KHARADI IT PARK</option>
                <option value="MAGARPATTA" key="MAGARPATTA">MAGARPATTA</option>
                </select>
              </label>



            <br></br>
            <br></br>
            <br></br>


            <div className='form-group'>
            <DatePicker 
              selected = {startDate}
              onChange = {handleChange}
              value = {startDate}
              name='startDate'
              // format={"dd/MM/yyyy"}
              // format='dd/MM/yyyy'
              />
            <br></br>
            <br></br>

            <button className='btn btn-primary' onClick={handleClick}  disabled={!selects} >
              Show Data
            </button>

            {/* {onbutton == '2' ?<p>{selects} abddf</p> : <p>shOff</p>   }
            <p>{selects}</p>  */}
          </div>
          {/* <p>{startDate}</p> */}
          </div>
          
        </div>

        
         
       

        <div className='admin_sub_sales'>
          <div className='sub_sales'>
            <VendorsData/>
            </div>
        </div>
    </div>
  )

}

export default Adminpage