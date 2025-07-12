import { Fragment, useContext } from 'react';
import {
  TextField,
  Box,
} from '@mui/material';
import { RigUWIContext } from '../contexts/RigUWIContext';

export default function Last12HoursForm() {
  const { formData4, setFormData4 } = useContext(RigUWIContext);
  console.log(formData4);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData4((prev) => ({ ...prev, [name]: value }));
  };

  const textFields = [
    { 
      label: 'Meters drilled (m)', 
      name: 'metersDrilled', 
      help: 'EX: Leg #3 1235-1837m'
    },
    {
      label: 'Formation/Cycle/Facies Drilled', 
      name: 'formationDrilled',
      help: 'EX: BFS, Peace River, Harmon, Falher A,B,C,D,E,F,F shale cap, Wilrich'
    },
    {
      label: 'Off bottom torque (ftlbs) in good hole', 
      name: 'offBottomTorque',
      help: 'Measured off bottom w/ stationary pipe in good hole conditions & smooth torque (tourly)'
    },
    {
      label: '80% of weakest BHA connection',
      name: 'weakestBHAConnection',
      help: 'Verify with directional hand (tourly)'
    },
    {
      label: 'Top Drive Set Point (ftlbs)',
      name: 'topDriveSetPoint',
      help: 'WSS to verify maximum top drive torque setting (tourly)'
    },
    {
      label: 'Actual Peak Drilling torque (ftlbs)',
      name: 'actualPeakTorque',
      help: 'Measured on bottom drilling (on-going)'
    },
    { 
      label: 'Operational Torque Buffer (ftlbs)', 
      name: 'operationalTorqueBuffer', 
      help: 'No negative numbers allowed!!!'
    },
    {
      label: 'Avg. slide ROP (m/hr)', 
      name: 'avgSlideROP',
      help: '' 
    },
    {
      label: 'Avg. rotary ROP (m/hr)', 
      name: 'avgRotaryROP',
      help: '' 
    },
    {
      label: 'Mud Type (Invert/water/other)', 
      name: 'mudType',
      help: ''
    },
    {
      label: 'Mud weight (kg/m3)',
      name: 'mudWeight',
      help: ''
    },
    {
      label: 'Mud Losses (m3)',
      name: 'mudLosses',
      help: ''
    },
    {
      label: '# of red task procedures followed (minimum 1/shift)',
      name: 'redTaskProcedures',
      help: 'Ask crews  what will be doing on this shift that requires a red task procedure. Expectation is 14/week/rig'
    },
    { 
      label: 'Safety Incidents (describe)', 
      name: 'safetyIncidents', 
      help: ''
    },
    {
      label: 'Downhole BHA/Mud Problems (describe)', 
      name: 'bhaMudProblems',
      help: 'EX: Mud weight is 50 kg higher than normal' 
    },
    {
      label: 'Downhole Reservoir/Placement Problems (describe)', 
      name: 'reservoirPlacementProblems',
      help: 'EX: High in the reservoir, Drilling 70 gamma, normally drill 90-100 gamma'
    },
    {
      label: 'Surface Problems (describe)',
      name: 'surfaceProblems',
      help: 'EX: Mud pump 2 is down due to belt problem'
    },
    {
      label: 'Performance limiters (describe)',
      name: 'performanceLimiters',
      help: 'EX: Drilling 50% slower than normal. Suspect motor is the problem'
    },
  ];

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 3, width: 1024}}
    >
      {textFields.map(({ label, name, help }) => (
        <Fragment key={name}>
          <TextField
            disabled={name == "topDriveSetPoint" || name == "operationalTorqueBuffer"}
            sx={{ width: '32%' }}
            name={name+'2'}
            label={label}
            value={formData4[name+'2']}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            sx={{ width: '64%' }}
            name={name}
            value={formData4[name]}
            onChange={handleChange}
            fullWidth
            helperText={help}
          />
        </Fragment>
      ))}
    </Box>
  );
}
