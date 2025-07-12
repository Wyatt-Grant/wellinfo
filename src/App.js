import GeneralWellInfoForm from './Forms/GeneralWellInfoForm';
import MonthlySafetyStandDownForm from './Forms/MonthlySafetyStandDownForm';
import BasicWellDesignForm from './Forms/BasicWellDesignForm';
import Last12HoursForm from './Forms/Last12HoursForm';
import CumulativeForm from './Forms/CumulativeForm';
import CumulativeForm2 from './Forms/Cumulative2Form';
import { Typography } from '@mui/material';
import { RigUWIProvider } from './contexts/RigUWIContext';
import { AdapterMoment  } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';
import Button from '@mui/material/Button';

function App() {
  const handleSavePDF = () => {
      var element = document.getElementById('pdf-container');

      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Edmonton' };
      const formatted = today.toLocaleDateString('en-US', options);

      html2pdf(element).save('WellInfo - ' + formatted + '.pdf');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <RigUWIProvider>
        <div id="pdf-container" style={{ padding: '10px', textAlign: 'center' }}>
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
            Cumulative (this well)
          </Typography>
          <CumulativeForm></CumulativeForm>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Typography variant="h3" gutterBottom>
            Cumulative (Project)
          </Typography>
          <CumulativeForm2></CumulativeForm2>
        </div>
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <br/>
          <br/>
          <br/>
          <Button variant="contained" onClick={handleSavePDF}> Download as PDF</Button>
        </div>
      </RigUWIProvider>
    </LocalizationProvider>
  );
}

export default App;
