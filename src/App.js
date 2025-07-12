import GeneralWellInfoForm from './Forms/GeneralWellInfoForm';
import MonthlySafetyStandDownForm from './Forms/MonthlySafetyStandDownForm';
import BasicWellDesignForm from './Forms/BasicWellDesignForm';
import Last12HoursForm from './Forms/Last12HoursForm';
import CumulativeForm from './Forms/CumulativeForm';
import { Typography } from '@mui/material';
import { RigUWIProvider } from './contexts/RigUWIContext';
import { AdapterMoment  } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <RigUWIProvider>
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            General Well Info
          </Typography>
          <GeneralWellInfoForm></GeneralWellInfoForm>
          <br/>
          <br/>
          <br/>
          <Typography variant="h3" gutterBottom>
            Monthly Safety Stand Down
          </Typography>
          <MonthlySafetyStandDownForm></MonthlySafetyStandDownForm>
          <br/>
          <br/>
          <br/>
          <Typography variant="h3" gutterBottom>
            Basic Well Design
          </Typography>
          <BasicWellDesignForm></BasicWellDesignForm>
          <br/>
          <br/>
          <br/>
          <Typography variant="h3" gutterBottom>
            Last 12 Hours
          </Typography>
          <Last12HoursForm></Last12HoursForm>
          <br/>
          <br/>
          <br/>
          <Typography variant="h3" gutterBottom>
            Cumulative
          </Typography>
          <CumulativeForm></CumulativeForm>
        </div>
      </RigUWIProvider>
    </LocalizationProvider>
  );
}

export default App;
