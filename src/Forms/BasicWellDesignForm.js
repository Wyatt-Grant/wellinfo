import { useContext, Fragment } from 'react';
import {
  TextField,
  Box,
} from '@mui/material';
import { RigUWIContext } from '../contexts/RigUWIContext';

export default function BasicWellDesignForm() {
  const { formData3, setFormData3 } = useContext(RigUWIContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData3((prev) => ({ ...prev, [name]: value }));
  };

  const textFields = [
    { 
      label: 'Vertical', 
      name: 'Vertical', 
      help: 'EX: 2800mTD, NCS sleeves, flotation collar, 1100 MW by TD'
    },
    {
      label: 'Monobore', 
      name: 'Monobore',
      help: '' 
    },
    {
      label: 'Intermediate - Sleeves & packers (type #1)', 
      name: 'IntermediateSleevesPackers',
      help: 'EX: 4830mTD, NCS sleeves, NCS packers, Stage hanger, 1100 up to 1300 MW by 3400m'
    },
    {
      label: 'Intermediate - Cemented Liner (type #2)',
      name: 'IntermediateCementedLiner',
      help: 'EX: 4830mTD, NCS sleeves, NCS cemented hanger, 2 toes ports, 1100 MW up to 1300 by 3400m'
    },
    {
      label: 'PROP',
      name: 'PROP',
      help: 'EX: 8 legs, 24000m, 3400m deepest leg, 2 agitators, repeater, no anticollision, complex well path'
    },
  ];

  if (formData3 === null) {
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
          <TextField
            sx={{ width: '48%' }}
            label={label}
            name={name}
            value={formData3[name]}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="dense" 
            multiline
          />
          <TextField
            sx={{ width: '48%' }}
            name={name+'2'}
            value={formData3[name+'2']}
            onChange={handleChange}
            fullWidth
            helperText={help}
            size="small"
            margin="dense" 
            multiline
          />
        </Fragment>
      ))}
    </Box>
  );
}
