import { Fragment, useContext } from 'react';
import {
  TextField,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { RigUWIContext } from '../contexts/RigUWIContext';
import Delete from '@mui/icons-material/Delete';
import { cumulativeLostTime } from '../calculations';

export default function CumulativeForm() {
  const { formData5, setFormData5 } = useContext(RigUWIContext);

  const numericFields = [
    'lostTimes',
    'miscLostTime',
    'waitOnCementers',
    'directionalMWDFailure',
    'directionalRotorStatorFailure',
    'directionalDriveShaftFailure',
  ];

  // Keep only digits and a single decimal point.
  const numericOnly = (value) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const firstDot = cleaned.indexOf('.');
    if (firstDot === -1) return cleaned;
    return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const value = numericFields.includes(name) ? numericOnly(e.target.value) : e.target.value;
    setFormData5((prev) => ({ ...prev, [name]: value }));
  };

  const handleLostTimeChange = (e, index) => {
    const { name } = e.target;
    const value = numericFields.includes(name) ? numericOnly(e.target.value) : e.target.value;

    setFormData5((prev) => ({
      ...prev,
      [name]: prev[name].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  // Number goes in `name` (middle column of the report); the "Describe" box
  // goes in `name + '2'` (right column of the report).
  const textFields = [
    {
      label: 'Mud Losses (m3)',
      name: 'mudLosses',
      help: 'Invert/KCL/Silicate/Lateral mud. Start at "zero" for any new mud system type and/or hole section',
      noDescribe: true,
    },
    {
      label: 'Mud Losses (m3/100m)',
      name: 'mudLossesPer100m',
      help: 'Invert/KCL/Silicate/Lateral mud',
      noDescribe: true,
    },
    {
      label: 'Cumulative Lost time (hrs)',
      name: 'cumulativeLostTime',
      help: 'This is the sum of lost time entries below',
      computed: true,
    },
    {
      label: 'Misc. Lost time',
      name: 'miscLostTime',
      help: 'EX: Detail is entered in WellView as individual "PSP" (Problem, Solution, Proposed Solution)'
    },
    {
      label: 'Wait on Cementers (Lost time)',
      name: 'waitOnCementers',
      help: ''
    },
    {
      label: 'Directional - MWD Failure (Lost time)',
      name: 'directionalMWDFailure',
      help: 'EX: Troubleshoot MWD due to weak signal. Jul 11 F/ 02:00 - 02:30'
    },
    {
      label: 'Directional- Rotor/Stator Failure (Lost time)',
      name: 'directionalRotorStatorFailure',
      help: ''
    },
    {
      label: 'Directional - Drive Shaft Failure (Lost Time)',
      name: 'directionalDriveShaftFailure',
      help: ''
    },
    {
      label: 'Lost time',
      name: 'lostTimes',
      help: 'EX: Hit Gravel @ 65m, circ and condition mud. Jul 06 F/ 18:45 - 19:30'
    },
  ];

  if (formData5 === null) {
    return;
  }

  const totalLostTime = cumulativeLostTime(formData5);

  const addLostTime = () => {
    setFormData5((prev) => ({
      ...prev,
      lostTimes: [...prev.lostTimes, ''],
      lostTimes2: [...prev.lostTimes2, ''],
    }));
  }

  const removeLostTime = (index) => {
    setFormData5((prev) => ({
      ...prev,
      lostTimes: prev.lostTimes.filter((_, i) => i !== index),
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
      {textFields.map(({ label, name, help, computed, noDescribe }) => {
        if (name === "lostTimes") {
          if (formData5[name].length === 0) {
            return (<Fragment key={name}>
              <Button onClick={addLostTime}>Add Lost time</Button>
              <div style={{ width: '48%' }}></div>
            </Fragment>);
          }
          return formData5[name].map((item, index) => (
            <Fragment key={index}>
              <TextField
                type="number"
                sx={{ width: '44%' }}
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
                value={formData5[`${name}2`][index] || ''}
                onChange={(e) => handleLostTimeChange(e, index)}
                fullWidth
                label={'Describe'}
                helperText={help}
                size="small"
                margin="dense"
                multiline
              />
              <IconButton onClick={() => removeLostTime(index)}><Delete fontSize="large" /></IconButton>
              {formData5[name].length === index+1 && (<>
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
              disabled={computed}
              sx={{
                width: (computed || noDescribe) ? '32%' : '48%',
                '& .MuiInputBase-root': {
                  backgroundColor: computed ? '#fff9c4' : '#ffffff',
                }
              }}
              name={name}
              value={computed ? totalLostTime : formData5[name]}
              onChange={handleChange}
              fullWidth
              label={label}
              helperText={(computed || noDescribe) ? help : undefined}
              size="small"
              margin="dense"
              multiline
            />
            {!computed && !noDescribe &&
            <TextField
              type={'text'}
              sx={{ width: '48%' }}
              name={name+'2'}
              value={formData5[name+'2']}
              onChange={handleChange}
              fullWidth
              helperText={help}
              label={'Describe'}
              size="small"
              margin="dense"
              multiline
            />}

          </Fragment>
      )})}
    </Box>
  );
}
