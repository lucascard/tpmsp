import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Tooltip } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Test Plan Management System Professional">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TPMSP
            </Typography>
          </Tooltip>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              ml: 2, 
              display: { xs: 'none', sm: 'block' },
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            Test Plan Management System Professional
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" data-testid="user-name">
            {user?.name}
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            data-testid="logout-button"
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;