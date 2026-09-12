import { useContext } from 'react';
import {
  TextField,
  Box,
} from '@mui/material';
import { RigUWIContext } from '../contexts/RigUWIContext';
import { requiredIntCasingTest } from '../calculations';

// Help text here doubles as the static note printed in the right column of the report.
export const WELL_CLASS_FIELDS = [
  {
    label: 'Well Class & Pressure (D36 pg 146 to 151)',
    name: 'wellClassPressure',
    help: 'Example: III (14,000kPa)',
  },
  {
    label: 'Highest Mud Weight on Stick Diagram',
    name: 'highestMudWeight',
    help: 'Example: 1252kg/m3',
  },
  {
    label: 'Required Pressure Test (D36 pg 50 to 53)',
    name: 'requiredPressureTest',
    help: 'Example: 14,000',
  },
  {
    label: '67% of BHP on stick',
    name: 'bhp67',
    help: 'Example: 16000*0.67= 10,720kPa',
  },
  {
    label: 'Cement "U-tube" differential pressure',
    name: 'cementUTube',
    help: 'Example: (1700-1000)*0.00981*2200= 15,107kPa',
  },
  {
    label: 'Required Intermediate Casing Pressure Test (wet cement)',
    name: 'requiredIntCasingTest',
    help: 'Discuss this with your Drilling Superintendent',
    computed: true,
  },
  {
    label: '80% of Intermediate Casing Burst',
    name: 'intCasingBurst80',
    help: 'Example: 28,000*0.80= 22,400kPa',
  },
];

export default function WellClassForm() {
  const { formData7, setFormData7 } = useContext(RigUWIContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData7((prev) => ({ ...prev, [name]: value }));
  };

  if (formData7 === null) {
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
      {WELL_CLASS_FIELDS.map(({ label, name, help, computed }) => (
        <TextField
          key={name}
          disabled={computed}
          sx={{
            width: '32%',
            '& .MuiInputBase-root': {
              backgroundColor: computed ? '#fff9c4' : '#ffffff',
            }
          }}
          label={label}
          name={name}
          value={computed ? requiredIntCasingTest(formData7) : formData7[name]}
          onChange={handleChange}
          fullWidth
          helperText={help}
          size="small"
          margin="dense"
          multiline
        />
      ))}
    </Box>
  );
}
