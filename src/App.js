import { useState } from 'react';
import GeneralWellInfoForm from './Forms/GeneralWellInfoForm';
import MonthlySafetyStandDownForm from './Forms/MonthlySafetyStandDownForm';
import BasicWellDesignForm from './Forms/BasicWellDesignForm';
import Last12HoursForm from './Forms/Last12HoursForm';
import CumulativeForm from './Forms/CumulativeForm';
import CumulativeForm2 from './Forms/Cumulative2Form';
import MyAppBar from './MyAppBar';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { RigUWIProvider } from './contexts/RigUWIContext';
import { AdapterMoment  } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function App() {
  const [collapsed, setCollapsed] = useState([true,true,true,true,true,true]);

  const col = (c) => setCollapsed(prev => {
    const newCollapsed = [...prev];
    newCollapsed[c] = !newCollapsed[c];
    return newCollapsed;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <RigUWIProvider>
        <Box sx={{ flexGrow: 1 }}>
          <MyAppBar />
            <br/>
            <br/>
            <br/>
          <div id="pdf-container" style={{ padding: '10px', textAlign: 'center' }}>
            <Button
              size="large"
              color="inherit"
              sx={{textTransform: 'lowercase'}}
              onClick={() => col(0)}
              >
                {collapsed[0] ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                <Typography variant="h4" gutterBottom style={{position: 'relative', top: '9px'}}>
                  General Well Info
                </Typography>
            </Button>
            <br/>
            <br/>
            {collapsed[0] && <GeneralWellInfoForm></GeneralWellInfoForm>}
            <br/>
            <br/>
            <Button
              size="large"
              color="inherit"
              sx={{textTransform: 'lowercase'}}
              onClick={() => col(1)}
              >
                {collapsed[1] ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                <Typography variant="h4" gutterBottom style={{position: 'relative', top: '9px'}}>
                  Monthly Safety Stand Down
                </Typography>
            </Button>
            <br/>
            <br/>
            {collapsed[1] && <MonthlySafetyStandDownForm></MonthlySafetyStandDownForm>}
            <br/>
            <br/>
            <Button
              size="large"
              color="inherit"
              sx={{textTransform: 'lowercase'}}
              onClick={() => col(2)}
              >
                {collapsed[2] ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                <Typography variant="h4" gutterBottom style={{position: 'relative', top: '9px'}}>
                  Basic Well Design
                </Typography>
            </Button>
            <br/>
            <br/>
            {collapsed[2] && <BasicWellDesignForm></BasicWellDesignForm>}
            <br/>
            <br/>
            <Button
              size="large"
              color="inherit"
              sx={{textTransform: 'lowercase'}}
              onClick={() => col(3)}
              >
                {collapsed[3] ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                <Typography variant="h4" gutterBottom style={{position: 'relative', top: '9px'}}>
                  Last 12 Hours
                </Typography>
            </Button>
            <br/>
            <br/>
            {collapsed[3] && <Last12HoursForm></Last12HoursForm>}
            <br/>
            <br/>
            <Button
              size="large"
              color="inherit"
              sx={{textTransform: 'lowercase'}}
              onClick={() => col(4)}
              >
                {collapsed[4] ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                <Typography variant="h4" gutterBottom style={{position: 'relative', top: '9px'}}>
                  Cumulative (this well)
                </Typography>
            </Button>
            <br/>
            <br/>
            {collapsed[4] && <CumulativeForm></CumulativeForm>}
            <br/>
            <br/>
            <Button
              size="large"
              color="inherit"
              sx={{textTransform: 'lowercase'}}
              onClick={() => col(5)}
              >
                {collapsed[5] ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                <Typography variant="h4" gutterBottom style={{position: 'relative', top: '9px'}}>
                  Cumulative (this well)
                </Typography>
            </Button>
            <br/>
            <br/>
            {collapsed[5] && <CumulativeForm2></CumulativeForm2>}
          </div>
        </Box>
      </RigUWIProvider>
    </LocalizationProvider>
  );
}

export default App;
