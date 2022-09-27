import React,{useState , useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        WingrowAgritech
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Outwardfarmer() {
  const navigate  = useNavigate()
  const [info, setInfo] = useState()
  const [ToggleBtn, setToggleBtn] = useState(false)
  const [Data, setData] = useState({
    commodity:"",
    sales_quantity:"",
    sales_rate:"",
    total_sales:""
  })
  const [farmersData, setFarmersData] = useState({
    farmers_market:"",
    farmer_name :"",
    mobile_num:"",
    data:[Data]
  })

  const callInfo = async() =>{
    try {
      const res = await fetch("/info",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })

      const data = await res.json();
      setInfo(data)

      if(!res.status === 200){
        throw new Error(res.error);
      }

    } catch (error) {
      navigate("./")
    }
  }

  useEffect(() => {
    callInfo();//eslint-disable-next-line
  }, [])

  useEffect(() => {
    setFarmersData((prevState)=>({
      ...prevState,
      data:Data
    }))
  }, [Data])


  const handleAddData = async(e) =>{
    const {farmers_market} = farmersData
    const {sales_quantity , sales_rate ,commodity} = Data
    const mul = sales_quantity*sales_rate;

    try {
      if(farmers_market && sales_quantity && sales_rate && commodity)
      {const res = await fetch("/outward" , {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
              farmers_market:farmersData.farmers_market.toUpperCase(),
              farmer_name:`${info.fname.toUpperCase()} ${info.lname.toUpperCase()}`,
              mobile_num:info.phone,
                data:[{
                commodity:Data.commodity.toUpperCase(),
                sales_quantity:Data.sales_quantity,
                sales_rate:Data.sales_rate,
                total_sales:mul
                      }]
          })
        });
        const data = await res.json()
        if(data){
          alert("data added succesfully")
        }else{
          alert("data not added")
        }
      }
    } catch (error) {
      alert("data not added")
      console.log(error)
    }

      setData(
        {
          commodity:"",
          sales_quantity:"",
          sales_rate:"",
          total_sales:""
        }
      )
      setFarmersData(
        {farmers_market:"",
        data:Data
      }
      )
  }


  // const options = [
  //   // Leaves
  //   { title: "Amaranthus" },
  //   { title: "Beet Root"},
  //   { title: "Chukka- sorrel Leaves" },
  //   { title: "Colocasia Leaves" },
  //   { title: "Coriander"},
  //   { title: "Curry Leaves" },
  //   { title: "Dill" },
  //   { title: "Fenugreek Leaves"},
  //   { title: "Green Amaranth" },
  //   { title: "Spinach" },
  //   { title: "Spring Onion"},
  //   { title: "Sufflower" },
  // // Wild-Antic
  //   { title: "Apple Gourd"},
  //   { title: "Ashgourd" },
  //   { title: "Chilli" },
  //   { title: " Colocasia Roots" },
  //   { title: "Cucumber Madras" },
  //   { title: "Kohlrabi" },
  //   { title: "Onion White-Pandhara Kanda" },
  //   { title: "Pointed Gourd" },
  //   { title: "Pumpkin" },
  //   { title: "Raw Jackfruit" },
  //   { title: "Raw Papaya" },
  //   { title: "Sambhar Kanda" },
  //   { title: "Snake Gourd"  },
  //   { title: "Spiny Gourd" },
  //   { title: "Sweet Potato" },
  //   { title: "Water Chestnuts" },
  //   { title: "Yam" },
  // // Exotic
  //   { title: "Asparagus" },
  //   { title: "Avocado" },
  //   { title: "Baby Corn" },
  //   { title: "Baby Potato" },
  //   { title: "Basil" },
  //   { title: "Broccoli" },
  //   { title: "Celery" },
  //   { title: "Cherry Tomato" },
  //   { title: "chinese Cabbage" },
  //   { title: "Coccinia" },
  //   { title: "Green Zucchini" },
  //   { title: "Iceberg Lettuce" },
  //   { title: "Parsley" },
  //   { title: "Red Cabbage" },
  //   { title: "Red Capsicum" },
  //   { title: "Romaine Lettuce" },
  //   { title: "Yellow Capsicum" },
  //   { title: "Yellow Zucchini" },
  //   { title: "Mushroom" },
  //   { title: "Sweet Corn" },
  //   { title: "Sweet Corn Grains" },
  // // Special stall
  //   { title: "Cabbage" },
  //   { title: "Cauliflower" },
  //   { title: "Onion" },
  //   { title: "Potato (Agra)" },
  //   { title: "Potato (Indore)" },
  //   { title: "Potato (Talegav)" },
  //   // Fruit Vegetables
  //   { title: "Apple Gourd" },
  //   { title: "Beans Double" },
  //   { title: "Bitter Gourd" },
  //   { title: "Brinjal Big" },
  //   { title: "Brinjal Green" },
  //   { title: "Brinjal Long Green" },
  //   { title: "Brinjal Purple" },
  //   { title: "Carrot" },
  //   { title: "Cauliflower" },
  //   { title: "Chavali Beans" },
  //   { title: "Chickpeas - Chana sprouts" },
  //   { title: "chilli - Bhavgagari Mirchi" },
  //   { title: "Chilli Green" },
  //   { title: "chilli Simple" },
  //   { title: "Cluster Beans" },
  //   { title: "Coccinia" },
  //   { title: "Coconut" },
  //   { title: "Colocasia Roots" },
  //   { title: "Coriander" },
  //   { title: "Cucumber" },
  //   { title: "Cucumder Madras" },
  //   { title: "Cucumber Madras- Sambar Kakadi" },
  //   { title: "Cucumber Polyhouse- English Kakadi" },
  //   { title: "Curry Leaves" },
  //   { title: "Drum Sticks" },
  //   { title: "Elaichi Banana" },
  //   { title: "Field Beans" },
  //   { title: "Fresh Peeled Green Peas" },
  //   { title: "Garlic" },
  //   { title: "Ginger" },
  //   { title: "Green Capsicum" },
  //   { title: "Green Mango" },
  //   { title: "Green Peas" },
  //   { title: "Groundnut Pods" },
  //   { title: "Tamarind" },
  //   { title: "Lady Finger" },
  //   { title: "Lemon" },
  //   { title: "Lemon Grass" },
  //   { title: "Mint" },
  //   { title: "Onion" },
  //   { title: "Onion Sambhar" },
  //   { title: "Lima Beans" },
  //   { title: "Peeled Garlic" },
  //   { title: "Potato" },
  //   { title: "Radish" },
  //   { title: "Ridgegourd" },
  //   { title: "Sponge Gourd" },
  //   { title: "Spring Onion" },
  //   { title: "Tomato" },
  //   { title: "Wal" },
  //   { title: "Wal Broad" },
  //   { title: "Wal surati" },
  //   { title: "Water Chestnuts" },
  //   // Fruit Export
  //   { title: "Apple Fuji" },
  //   { title: "Apple Green" },
  //   { title: "Apple Kinnaur" },
  //   { title: "Apple Red Delicious" },
  //   { title: "Apple Shimla Big" },
  //   { title: "Kiwi" },
  //   { title: "Litchi" },
  //   { title: "Strawberry" },
  //   // Fruit Summer
  //   { title: "Grapes Black" },
  //   { title: "Grapes Green" },
  //   { title: "Jambhul" },
  //   { title: "Mango Badami (For Juice)" },
  //   { title: "Mango Devgad Hapus" },
  //   { title: "Mango Keshar" },
  //   { title: "Mango Lalbag" },
  //   { title: "Mango Payri" },
  //   { title: "Mango Ratnagiri Hapus" },
  //   { title: "Mango Totapuri" },
  //   { title: "Muskmelon" },
  //   { title: "Watermelon Kiran" },
  //   { title: "Watermelon Regular" },
  //   // Fruit
  //   { title: "Amla" },
  //   { title: "Apple Gourd" },
  //   { title: "Ashgourd" },
  //   { title: "Banana" },
  //   { title: "Beet Root" },
  //   { title: "Custard-apple" },
  //   { title: "Elaichi Banana" },
  //   { title: "Figs" },
  //   { title: "Guava" },
  //   { title: "Jackfruit Peeled" },
  //   { title: "Jujube - Ber" },
  //   { title: "Lemon" },
  //   { title: "Orange Small" },
  //   { title: "Orange Kinnow" },
  //   { title: "Papaya" },
  //   { title: "Pear Imported" },
  //   { title: "Pomogranate" },
  //   { title: "Raw Banana" },
  //   { title: "Sapodilla" },
  //   { title: "Sugarcane" },
  //   { title: "Sweet Lime" },
  //   { title: "Tender" },
  // ];

  const handleFarmerData = (e)=>{
    const {name , value} = e.target
    setFarmersData(prevState => ({
      ...prevState,
      [name]:value
  }))
  }

  const handleInput=(e)=>{
    if(e.target.value!==""){
      setToggleBtn(true)
    }else{
      setToggleBtn(false)
    }
  }

  const handleFarmer = (e)=>{
    const {name , value} = e.target
    setData(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

  // const handleTypeSelect = e => {
  //   setSelectedOption(e.value);
  //   setData(prevState => ({
  //     ...prevState,
  //     'commodity':e.title
  //   }))
  //   console.log(e.title)
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  }



  return (
    <>
    {info?<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding:"30px",
            overflowX:"hidden"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Farmer Outward Data!!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, border: 0,padding:"30px",boxShadow:5,backgroundColor:"antiquewhite", opacity:0.9 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="farmer_name"
                  value={`${info.fname} ${info.lname}`}
                  required
                  fullWidth
                  id="farmer_name"
                  label="Farmer Name"
                  type="text"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="mobile_num"
                  label="Mobile Number"
                  value={info.phone}
                  type="number"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="farmers_market"
                  label="Farmers Market"
                  value={farmersData.farmers_market}
                  onChange={handleFarmerData}
                  onInput={handleInput}
                  type="text"
                  id="farmers_market"
                  autoComplete="new-farmers market"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="commodity"
                  value={Data.commodity}
                  onChange={handleFarmer}
                  label="Commodity"
                  type="text"
                  id="commodity"
                  autoComplete="new-commodity"
                />
                {/* <Select
                  id="commodity"
                  required
                  options={options}
                  name="commodity"
                  onChange={handleTypeSelect}
                  value={ selectedOption}
                  getOptionLabel={(option) => option.title}
                  label="Commodity"
                  placeholder='Commodity'
                  autoComplete="new-commodity"
              
                /> */}

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="sales_quantity"
                  value={Data.sales_quantity}
                  onChange={handleFarmer}
                  label="Sales Quantity"
                  type="number"
                  id="sales quantity"
                  autoComplete="new-sales quantity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="sales_rate"
                  value={Data.sales_rate}
                  onChange={handleFarmer}
                  label="Sales Rate"
                  type="number"
                  id="sales rate"
                  autoComplete="new-sales rate"
                />
              </Grid>
            </Grid>
            <Grid>
            {ToggleBtn?<Button
              type="submit"
              variant="contained"
              sx={{ m:2 }}
              onClick={handleAddData}
            >
              Add
            </Button>:<Button
              type="submit"
              disabled
              variant="contained"
              sx={{ m:2 }}
              onClick={handleAddData}
            >
              Add
            </Button>}
            </Grid>   
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>:<h1>Loading....</h1>}
    </>
  );
}