// src/pages/Home.tsx
import React from 'react';

import { Box } from '@chakra-ui/react';
import AuthForm from '../components/AuthForm';

const Home: React.FC = () => {
  return (
    <Box p={4}>
      <AuthForm />
    </Box>
  );
};

export default Home;