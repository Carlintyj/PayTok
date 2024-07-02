import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentIcon from '@mui/icons-material/Payment';
import ProfileIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

export default function UserNavbar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/transactions');
        break;
      case 2:
        navigate('/payment');
        break;
      case 3:
        navigate('/profile');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Transactions" icon={<AccountBalanceWalletIcon />} />
      <BottomNavigationAction label="Pay" icon={<PaymentIcon />} />
      <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
    </BottomNavigation>
  );
}
