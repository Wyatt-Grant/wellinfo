import { Fragment, useContext } from 'react';
import {
  TextField,
  Box,
} from '@mui/material';
import { RigUWIContext } from '../contexts/RigUWIContext';

export default function Cumulative2Form() {
  const { formData6, setFormData6 } = useContext(RigUWIContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData6((prev) => ({ ...prev, [name]: value }));
  };

  const textFields = [
    { 
      label: 'DP cumulative meters since last inspection (m)', 
      name: 'dpCumulativeMeters', 
      help: 'EX: Planned 80,000m inspection frequency'
    },
    { 
      label: 'Wait on Cementers  (hrs)', 
      name: 'waitOnCementersHrs', 
      help: 'EX: 0 failure for this rig since project start on June, 2025 ( Trican)'
    },
    { 
      label: 'Directional - MWD Failure  (hrs)', 
      name: 'directionalMWDFailureHrs', 
      help: 'EX: 2 failure for this rig since project start on June, 2025'
    },
    { 
      label: 'Directional- Rotor/Stator Failure  (hrs)', 
      name: 'directionalRotorStatorFailureHrs', 
      help: 'EX: 0 failure for this rig since project start on June, 2025'
    },
    { 
      label: 'Directional - Drive Shaft Failure  (hrs)', 
      name: 'directionalDriveShaftFailureHrs', 
      help: 'EX: 0 failure for this rig since project start on June, 2025'
    },
  ];

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1, width: 1024}}
    >
      {textFields.map(({ label, name, help }) => {
        return (
        <Fragment key={name}>
          <TextField
            type="number"
            sx={{ width: '36%' }}
            name={name+'2'}
            value={formData6[name+'2']}
            onChange={handleChange}
            fullWidth
            label={label}
            size="small"
            margin="dense" 
          />
          <TextField
            sx={{ width: '60%' }}
            name={name}
            value={formData6[name]}
            onChange={handleChange}
            fullWidth
            helperText={help}
            size="small"
            margin="dense" 
          />
        </Fragment>
      )
      })}
    </Box>
  );
}
