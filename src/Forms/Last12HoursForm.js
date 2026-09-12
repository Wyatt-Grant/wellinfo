import { Fragment, useContext } from 'react';
import {
  TextField,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { RigUWIContext } from '../contexts/RigUWIContext';
import { torqueBuffer } from '../calculations';

export default function Last12HoursForm() {
  const { formData4, setFormData4 } = useContext(RigUWIContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData4((prev) => ({ ...prev, [name]: value }));
  };

  // Number goes in `name + '2'` (middle column of the report); the optional
  // "Describe" box goes in `name` (right column of the report).
  const textFields = [
    {
      label: 'Meters drilled (m)',
      name: 'metersDrilled',
      help: 'EX: 923',
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
      help: 'Top drive set to stall at'
    },
    {
      label: 'Actual Peak Drilling torque (ftlbs)',
      name: 'actualPeakTorque',
      help: 'Measured on bottom drilling (on-going)'
    },
    {
      label: 'Set vs. Actual Torque Buffer (ftlbs)',
      name: 'torqueBuffer',
      help: 'Top Drive Set Point - Actual Peak drilling Torque (Negative number here is BAD!!!)',
      computed: true,
    },
    {
      label: 'RCD Element (In/Out)',
      name: 'rcdElement',
      type: 'radio',
      options: ['In', 'Out'],
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
      help: 'Invert/KCL/Silicate/Lateral mud',
      describe: true,
    },
    {
      label: '# of red task procedures followed (minimum 1/shift)',
      name: 'redTaskProcedures',
      help: '"OBE Corporate" Requirement. Ask crews what will be doing on this shift that requires a red task procedure. Expectation is 14/week/rig'
    },
    {
      label: 'LIR (minimum 1/shift)',
      name: 'lir',
      help: '"OBE Corporate" Requirement'
    },
    {
      label: 'Monthly Safety Package (When sent to rigs)',
      name: 'monthlySafetyPackage',
      help: '"OBE Corporate" Requirement'
    },
    {
      label: 'ABC Picture (minimum 1/shift)',
      name: 'abcPicture',
      help: '"Drilling Dept" Requirement'
    },
    {
      label: 'BHA/Bit/Feeler Guage Picture (per bha)',
      name: 'bhaBitFeelerGaugePicture',
      help: '"Drilling Dept" Requirement'
    },
    {
      label: 'Safety Incidents',
      name: 'safetyIncidents',
      help: '',
      describe: true,
    },
    {
      label: 'Downhole BHA/Mud Problems',
      name: 'bhaMudProblems',
      help: 'EX: Mud weight is 50 kg higher than normal',
      describe: true,
    },
    {
      label: 'Downhole Reservoir/Placement Problems',
      name: 'reservoirPlacementProblems',
      help: 'EX: High in the reservoir, Drilling 70 gamma, normally drill 90-100 gamma',
      describe: true,
    },
    {
      label: 'Surface Problems',
      name: 'surfaceProblems',
      help: 'EX: Mud pump 2 is down due to belt problem',
      describe: true,
    },
    {
      label: 'Performance limiters',
      name: 'performanceLimiters',
      help: 'EX: Drilling 50% slower than normal. Suspect motor is the problem',
      describe: true,
    },
  ];

  if (formData4 === null) {
    return;
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1, width: 1024}}
    >
      {textFields.map(({ label, name, help, type, options, computed, describe }) => {
        if (type === 'radio') {
          return (
            <FormControl key={name} sx={{ width: '32%' }}>
              <FormLabel>{label}</FormLabel>
              <RadioGroup
                row
                name={name+'2'}
                value={formData4[name+'2'] || ''}
                onChange={handleChange}
              >
                {options.map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </FormControl>
          );
        }

        let value = formData4[name+'2'];
        if (name === "torqueBuffer") {
          value = torqueBuffer(formData4);
        }

        return (
        <Fragment key={name}>
          <TextField
            disabled={computed}
            sx={{
              width: '32%',
              '& .MuiInputBase-root': {
                backgroundColor: computed ? '#fff9c4' : '#ffffff',
              }
            }}
            name={name+'2'}
            label={label}
            value={value}
            onChange={handleChange}
            fullWidth
            helperText={describe ? '' : help}
            size="small"
            margin="dense"
            multiline
          />
          {describe &&
            <TextField
              sx={{ width: '64%' }}
              name={name}
              label={'Describe'}
              value={formData4[name]}
              onChange={handleChange}
              fullWidth
              helperText={help}
              size="small"
              margin="dense"
              multiline
            />
          }
          {/* end-of-group gaps: Meters drilled on its own line, then after the torque group and the count/picture group */}
          {name === "metersDrilled" && <Box sx={{ width: '64%' }} />}
          {name === "torqueBuffer" && <Box sx={{ width: '32%' }} />}
          {name === "bhaBitFeelerGaugePicture" && <Box sx={{ width: '32%' }} />}
        </Fragment>
      )
      })}
    </Box>
  );
}
