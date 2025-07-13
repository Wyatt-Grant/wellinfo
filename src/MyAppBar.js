import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SaveButton from './SaveButton';

export default function MyAppBar() {
  return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
            <div>
              <SaveButton></SaveButton>
            </div>
        </Toolbar>
      </AppBar>
  );
}