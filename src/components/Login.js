import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';
import LoginForm from './LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (username) => {
    localStorage.setItem('username', username);
    navigate('/start');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgGradient="linear(to-r, teal.500, green.500)"
      padding="4"
      color="white"
    >
      <Heading as="h1" size="3xl" mb={6}>Welcome to the DOT Quiz!</Heading>
      <Text fontSize="lg" mb={4}>Please login to start your quiz.</Text>
      <LoginForm onLogin={handleLogin} />
    </Box>
  );
};

export default Login;
