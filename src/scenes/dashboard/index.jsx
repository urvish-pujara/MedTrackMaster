import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ExamplePdf from './example.zip';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [website, setWebsite] = React.useState('');

  const handleChange = (event) => {
    setWebsite(event.target.value);
  };


  const [sliderValue, setSliderValue] = React.useState(30); 
  const downloadZip = () => {
    const zip = new JSZip();

    // Generate the zip file content
    zip.generateAsync({type:"blob"}).then(function(content) {
      // Use FileSaver to save the generated zip file
      saveAs(content, "empty.zip");
    });


  }

  const getDownloadAttributes = () => {
    const websiteName = website ? website : 'default';
    const fileName = `${websiteName}_${sliderValue}.zip`;
    return {
      href: ExamplePdf, // Assuming ExamplePdf is the path to the file you want to download
      download: fileName,
    };
  };
  


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
      {/* Make a DropDown */}
      <Box
          gridColumn="span 12"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

            <FormControl width="25%" variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Select Website</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={website}
                label="Website"
                onChange={handleChange}
                // set color of label
                sx={{
                  color: colors.grey[100],
                  '& .MuiInput-underline:before': {
                    borderBottomColor: colors.grey[100],
                  },
                  '& .MuiInput-underline:hover:before': {
                    borderBottomColor: colors.grey[100],
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: colors.grey[100],
                  },
                }}
              >
            <MenuItem value={"ManaHealth"}>ManaHealth</MenuItem>
            <MenuItem value={"healthtipstelugu"}>healthtipstelugu</MenuItem>
            <MenuItem value={"polyglotclub"}>polyglotclub</MenuItem>
            <MenuItem value={"telugu.boldsky"}>telugu.boldsky</MenuItem>
            <MenuItem value={"telugu.samayam"}>telugu.samayam</MenuItem>
            <MenuItem value={"teluguone"}>teluguone</MenuItem>
            <MenuItem value={"tv9telugu"}>tv9telugu</MenuItem>
              </Select>
            </FormControl>
        </Box>


        <Box
          gridColumn="span 12"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

<Slider
  value={sliderValue}
  onChange={(e, newValue) => setSliderValue(newValue)}
  valueLabelDisplay="auto"
  defaultValue={30}
  step={10}
  marks
  min={10}
  max={100}
  style={{
    width: '25%',
    color: colors.greenAccent[600],
  }}
/>

        </Box>
        <Box
        gridColumn="span 12"
        gridRow="span 1"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        >
          <Button
  sx={{
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    '& a': { // Targeting the <a> tag inside the button
      textDecoration: 'none', // This removes the underline from the link
      color: 'inherit' // This makes the color the same as the button's text color
    }
  }}
>
  <a
    {...getDownloadAttributes()}
    target="_blank"
    rel="noopener noreferrer"
  >
    <DownloadOutlinedIcon sx={{ justifyContent: 'center', alignContent: 'center' }} />
    Download Raw data
  </a>
</Button>




          </Box>      
      </Box>
    </Box>
  );
};

export default Dashboard;