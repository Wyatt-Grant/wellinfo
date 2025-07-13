import { Fragment, useContext } from 'react';
import {
  TextField,
  Box,
} from '@mui/material';
import { RigUWIContext } from '../contexts/RigUWIContext';

export default function CumulativeForm() {
  const { formData5, setFormData5 } = useContext(RigUWIContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData5((prev) => ({ ...prev, [name]: value }));
  };

  const textFields = [
    { 
      label: 'Mud Losses (m3)', 
      name: 'mudLosses', 
      help: 'Start at "zero" for any new mud system type and/or hole section'
    },
    { 
      label: 'Mud Losses (m3/100m)', 
      name: 'mudLossesPer100m', 
      help: ''
    },
    { 
      label: 'Water hauled… Water base drilling only (m3)', 
      name: 'waterHauled', 
      help: ''
    },
    { 
      label: 'Cumulative Lost time (hrs)', 
      name: 'cumulativeLostTime', 
      help: ''
    },
    { 
      label: 'Lost time #1', 
      name: 'lostTime1', 
      help: 'EX: Hit Gravel @ 65m, circ and condition mud. Jul 06 F/ 18:45 - 19:30'
    },
    { 
      label: 'Lost time #2', 
      name: 'lostTime2', 
      help: ''
    },
    { 
      label: 'Lost time #3', 
      name: 'lostTime3', 
      help: ''
    },
    { 
      label: 'Lost time #4', 
      name: 'lostTime4', 
      help: ''
    },
    { 
      label: 'Lost time #5', 
      name: 'lostTime5', 
      help: ''
    },
    { 
      label: 'Lost time #6', 
      name: 'lostTime6', 
      help: ''
    },
    { 
      label: 'Lost time #7', 
      name: 'lostTime7', 
      help: ''
    },
    { 
      label: 'Lost time #8', 
      name: 'lostTime8', 
      help: ''
    },
    { 
      label: 'Lost time #9', 
      name: 'lostTime9', 
      help: ''
    },
    { 
      label: 'Wait on Cementers (Lost time #10)', 
      name: 'waitOnCementers', 
      help: ''
    },
    { 
      label: 'Directional - MWD Failure (Lost time #11)', 
      name: 'directionalMWDFailure', 
      help: 'EX: Troubleshoot MWD due to weak signal. Jul 11 F/ 02:00 - 02:30'
    },
    { 
      label: 'Directional- Rotor/Stator Failure (Lost time #12)', 
      name: 'directionalRotorStatorFailure', 
      help: ''
    },
    { 
      label: 'Directional - Drive Shaft Failure (Lost time #13)', 
      name: 'directionalDriveShaftFailure', 
      help: ''
    },
  ];

  const total = parseFloat(formData5['lostTime1'] == '' ? 0 : formData5['lostTime1'])
              + parseFloat(formData5['lostTime2'] == '' ? 0 : formData5['lostTime2'])
              + parseFloat(formData5['lostTime3'] == '' ? 0 : formData5['lostTime3'])
              + parseFloat(formData5['lostTime4'] == '' ? 0 : formData5['lostTime4'])
              + parseFloat(formData5['lostTime5'] == '' ? 0 : formData5['lostTime5'])
              + parseFloat(formData5['lostTime6'] == '' ? 0 : formData5['lostTime6'])
              + parseFloat(formData5['lostTime7'] == '' ? 0 : formData5['lostTime7'])
              + parseFloat(formData5['lostTime8'] == '' ? 0 : formData5['lostTime8'])
              + parseFloat(formData5['lostTime9'] == '' ? 0 : formData5['lostTime9'])
              + parseFloat(formData5['waitOnCementers'] == '' ? 0 : formData5['waitOnCementers'])
              + parseFloat(formData5['directionalMWDFailure'] == '' ? 0 : formData5['directionalMWDFailure'])
              + parseFloat(formData5['directionalRotorStatorFailure'] == '' ? 0 : formData5['directionalRotorStatorFailure'])
              + parseFloat(formData5['directionalDriveShaftFailure'] == '' ? 0 : formData5['directionalDriveShaftFailure']);

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1, width: 1024}}
    >
      {textFields.map(({ label, name, help }) => (
        <Fragment key={name}>
          <TextField
            type={label.includes('Lost time') ? 'number' : 'text'}
            disabled={name=='cumulativeLostTime'}
            sx={{
              width: '48%',
              '& .MuiInputBase-root': {
                backgroundColor: (name == "cumulativeLostTime") ? '#fff9c4' : '#ffffff',
              }
            }}
            name={name}
            value={name=='cumulativeLostTime' ? total : formData5[name]}
            onChange={handleChange}
            fullWidth
            helperText={help}
            label={label}
            size="small"
            margin="dense" 
          />
          <TextField
            type={'text'}
            sx={{ width: '48%' }}
            name={name+'2'}
            value={formData5[name+'2']}
            onChange={handleChange}
            fullWidth
            helperText={help}
            // label={label}
            size="small"
            margin="dense" 
          />
        </Fragment>
      ))}
    </Box>
  );
}
