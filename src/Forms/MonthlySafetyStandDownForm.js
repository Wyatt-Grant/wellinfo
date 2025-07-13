import { useContext, Fragment } from 'react';
import {
  TextField,
  Box,
} from '@mui/material';
import { RigUWIContext } from '../contexts/RigUWIContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

export default function MonthlySafetyStandDownForm() {
  const { formData2, setFormData2 } = useContext(RigUWIContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData2((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (val, name) => {
    if (val) {
      console.log(val, name);
      setFormData2((prev) => ({ ...prev, [name]: val.toString() }));
    }
  };

  const textFields = [
    { 
      label: 'Crew #1 & Services', 
      name: 'Crew1AndServices', 
      help: 'EX: Driller #1 Matt Lester Good decisions workshop completed'
    },
    {
      label: 'Crew #2 & Services', 
      name: 'Crew2AndServices',
      help: 'EX: Driller #2 Ted Roberts Good decisions workshop completed' 
    },
    {
      label: 'Crew #3 & Services', 
      name: 'Crew3AndServices',
      help: 'EX: Driller #3 Shane Newhouse  Good decisions workshop completed'
    },
    {
      label: 'Last OBE Recordable',
      name: 'LastOBErecordable',
      help: 'EX: PD 182- Broken thumb (Hand Winch)'
    },
  ];

  if (formData2 === null) {
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
      {textFields.map(({ label, name, help }) => (
        <Fragment key={name}>
          {console.log(formData2[name+'Date'])}
          <DatePicker
            name={name+'Date'}
            label={label + " Date"}
            sx={{ width: '48%' }}
            value={formData2[name+'Date'] ? moment(formData2[name+'Date']) : null}
            onChange={(val) => handleDateChange(val, name+'Date')}
            slotProps={{
              textField: {
                size: 'small',     // compact height
                margin: 'dense'    // reduce vertical spacing
              }
            }}
          />
          <TextField
            sx={{ width: '48%' }}
            label={label}
            name={name}
            value={formData2[name]}
            onChange={handleChange}
            fullWidth
            helperText={help}
            size="small"
            margin="dense" 
          />
        </Fragment>
      ))}
    </Box>
  );
}
