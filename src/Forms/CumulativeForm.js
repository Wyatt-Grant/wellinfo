import { Fragment, useContext } from 'react';
import {
  TextField,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { RigUWIContext } from '../contexts/RigUWIContext';
import Delete from '@mui/icons-material/Delete';

export default function CumulativeForm() {
  const { formData5, setFormData5 } = useContext(RigUWIContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData5((prev) => ({ ...prev, [name]: value }));
  };

  const handleLostTimeChange = (e, index) => {
    const { name, value } = e.target;

    setFormData5((prev) => ({
      ...prev,
      [name]: prev[name].map((item, i) =>
        i === index ? value : item
      ),
    }));
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
    // { 
    //   label: 'Lost time #1', 
    //   name: 'lostTime1', 
    //   help: 'EX: Hit Gravel @ 65m, circ and condition mud. Jul 06 F/ 18:45 - 19:30'
    // },
    // { 
    //   label: 'Lost time #2', 
    //   name: 'lostTime2', 
    //   help: ''
    // },
    // { 
    //   label: 'Lost time #3', 
    //   name: 'lostTime3', 
    //   help: ''
    // },
    // { 
    //   label: 'Lost time #4', 
    //   name: 'lostTime4', 
    //   help: ''
    // },
    // { 
    //   label: 'Lost time #5', 
    //   name: 'lostTime5', 
    //   help: ''
    // },
    // { 
    //   label: 'Lost time #6', 
    //   name: 'lostTime6', 
    //   help: ''
    // },
    // { 
    //   label: 'Lost time #7', 
    //   name: 'lostTime7', 
    //   help: ''
    // },
    // { 
    //   label: 'Lost time #8', 
    //   name: 'lostTime8', 
    //   help: ''
    // },
    // { 
    //   label: 'Lost time #9', 
    //   name: 'lostTime9', 
    //   help: ''
    // },
    { 
      label: 'Lost times', 
      name: 'lostTimes', 
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

  if (formData5 === null) {
    return;
  }
  


  const total = parseFloat(formData5['waitOnCementers'] == '' ? 0 : formData5['waitOnCementers'])
              + parseFloat(formData5['directionalMWDFailure'] == '' ? 0 : formData5['directionalMWDFailure'])
              + parseFloat(formData5['directionalRotorStatorFailure'] == '' ? 0 : formData5['directionalRotorStatorFailure'])
              + parseFloat(formData5['directionalDriveShaftFailure'] == '' ? 0 : formData5['directionalDriveShaftFailure']);
  
  const totalLostTime = formData5.lostTimes.reduce(
    (sum, val) => sum + parseFloat(val || 0),
    0
  ) + total;

  console.log("totalLostTime: " + totalLostTime);

            
  const addLostTime = () => {
    setFormData5((prev) => ({
      ...prev,
      lostTimes: [...prev.lostTimes, ''],
    }));
    setFormData5((prev) => ({
      ...prev,
      lostTimes2: [...prev.lostTimes2, ''],
    }));
  }

  const removeLostTime = (index) => {
    setFormData5((prev) => ({
      ...prev,
      lostTimes: prev.lostTimes.filter((_, i) => i !== index),
    }));
    setFormData5((prev) => ({
      ...prev,
      lostTimes2: prev.lostTimes2.filter((_, i) => i !== index),
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1, width: 1024}}
    >
      {textFields.map(({ label, name, help }) => {
        let multiFiled = false;
        if (name == "mudLossesPer100m"
          || name == "waterHauled"
          || name == "cumulativeLostTime") {
          multiFiled = true;
        }

        if (name == "lostTimes") {
          if (formData5[name].length == 0) {
            return (<>
              <Button onClick={addLostTime}>Add Lost time</Button>
              <div style={{ width: '48%' }}></div>
            </>);
          }
          return formData5[name].map((item, index) => (
            <Fragment key={index}>
              <TextField
                type="number"
                disabled={name === 'cumulativeLostTime'}
                sx={{
                  width: '44%',
                  '& .MuiInputBase-root': {
                    backgroundColor: name === 'cumulativeLostTime' ? '#fff9c4' : '#ffffff',
                  },
                }}
                name={name}
                value={item}
                onChange={(e) => handleLostTimeChange(e, index)}
                fullWidth
                label={label}
                size="small"
                margin="dense"
                multiline
              />
              <TextField
                type="text"
                sx={{ width: '48%' }}
                name={`${name}2`}
                value={formData5[`${name}2`][index]}
                onChange={(e) => handleLostTimeChange(e, index)}
                fullWidth
                helperText={help}
                size="small"
                margin="dense"
                multiline
              />
              <IconButton onClick={() => removeLostTime(index)}><Delete fontSize="large" /></IconButton>
              {formData5[name].length == index+1 && (<>
                <Button onClick={addLostTime}>Add Lost time</Button>
                <div style={{ width: '48%' }}></div>
              </>)}
            </Fragment>
          ));
        }

        return (
          <Fragment key={name}>
            <TextField
              type={label.includes('Lost time') ? 'number' : 'text'}
              disabled={name=='cumulativeLostTime'}
              sx={{
                width: multiFiled ? '32%' : '48%',
                '& .MuiInputBase-root': {
                  backgroundColor: (name == "cumulativeLostTime") ? '#fff9c4' : '#ffffff',
                }
              }}
              name={name}
              value={name=='cumulativeLostTime' ? totalLostTime : formData5[name]}
              onChange={handleChange}
              fullWidth
              label={label}
              size="small"
              margin="dense" 
              multiline
            />
            {!multiFiled &&
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
              multiline
            />}
          </Fragment>
      )})}
    </Box>
  );
}
