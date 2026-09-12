import { useState } from 'react';
import GeneralWellInfoForm from './Forms/GeneralWellInfoForm';
import BasicWellDesignForm from './Forms/BasicWellDesignForm';
import WellClassForm from './Forms/WellClassForm';
import Last12HoursForm from './Forms/Last12HoursForm';
import CumulativeForm from './Forms/CumulativeForm';
import MyAppBar from './MyAppBar';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { RigUWIProvider } from './contexts/RigUWIContext';
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const sections = [
  { title: 'General Well Info', left: '-360px', Form: GeneralWellInfoForm },
  { title: 'Basic Well Design', left: '-350px', Form: BasicWellDesignForm },
  { title: 'Well Class, Mud Weight, Pressure Testing', left: '-180px', Form: WellClassForm },
  { title: 'Last 12 Hours', left: '-383px', Form: Last12HoursForm },
  { title: 'Cumulative (this well)', left: '-320px', Form: CumulativeForm },
];

function App() {
  const [collapsed, setCollapsed] = useState(sections.map(() => true));

  const col = (c) => setCollapsed(prev => {
    const newCollapsed = [...prev];
    newCollapsed[c] = !newCollapsed[c];
    return newCollapsed;
  });

  return (
    <RigUWIProvider>
      <Box sx={{ flexGrow: 1 }}>
        <MyAppBar />
          <br/>
          <br/>
          <br/>
        <div id="pdf-container" style={{ padding: '10px', textAlign: 'center' }}>
          {sections.map(({ title, left, Form }, i) => (
            <div key={title}>
              <Button
                size="large"
                color="inherit"
                sx={{textTransform: 'lowercase', left}}
                onClick={() => col(i)}
                >
                  {collapsed[i] ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" />}
                  <Typography variant="h4" gutterBottom style={{position: 'relative', top: '9px'}}>
                    {title}
                  </Typography>
              </Button>
              <br/>
              {collapsed[i] && <Form />}
              <br/>
            </div>
          ))}
        </div>
      </Box>
    </RigUWIProvider>
  );
}

export default App;
