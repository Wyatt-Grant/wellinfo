import { useContext } from 'react';
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

export default function GeneralWellInfoForm() {
  const { formData, setFormData } = useContext(RigUWIContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const textFields = [
    {
      label: 'Rig & UWI',
      name: 'rigUWI',
      help: 'EX: PD 141 on 102/3-13-079-17W5'
    },
    {
      label: 'Well on pad',
      name: 'wellOnPad',
      help: 'EX: Well #7 of 7 on 04-24-79-17W5 pad'
    },
    { label:
      'Anticipated move date & type',
      name: 'moveDateType',
      help: 'EX: July 22th, 2025 PAD rig move to 9-28 Pad'
    },
    {
      label: 'Current Operation',
      name: 'currentOperation',
      help: 'EX: Drilling 159mm lateral leg #3 of 17 @ 1837m'
    },
  ];

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        console.log('Submitted:', formData);
      }}
      sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 3, width: 768}}
    >
      {textFields.map(({ label, name, help }) => (
        <TextField
          sx={{ width: '48%' }}
          key={name}
          label={label}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          fullWidth
          helperText={help}
        />
      ))}

      <FormControl sx={{ width: '48%' }}>
        <FormLabel>Sim-ops within 25m</FormLabel>
        <RadioGroup
          row
          name="simOps"
          value={formData.simOps}
          onChange={handleChange}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
        <TextField
          name="simOps2"
          value={formData.simOps2}
          onChange={handleChange}
          fullWidth
          helperText="EX: simops < 25m cold (Live well 20m away)"
        />
      </FormControl>

      <FormControl sx={{ width: '48%' }}>
        <FormLabel>STARS site</FormLabel>
        <RadioGroup
          row
          name="starsSite"
          value={formData.starsSite}
          onChange={handleChange}
        >
          <FormControlLabel value="Perm" control={<Radio />} label="Perm" />
          <FormControlLabel value="Temp" control={<Radio />} label="Temp" />
          <FormControlLabel value="None" control={<Radio />} label="None" />
        </RadioGroup>
        <TextField
          name="starsSite2"
          label=""
          value={formData.starsSite2}
          onChange={handleChange}
          fullWidth
          helperText="EX: Lat 55.857640,   long -116.526818  surface location for Heli"
        />
      </FormControl>
    </Box>
  );
}
