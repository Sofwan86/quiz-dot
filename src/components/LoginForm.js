import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      onLogin(username); 
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      padding="6"
      borderRadius="md"
      boxShadow="lg"
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
    >
      <FormControl isRequired>
        <FormLabel htmlFor="username" color="white">Username</FormLabel>
        <Input
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          color="white"
          variant="filled"
          bg="rgba(255, 255, 255, 0.2)"
          _placeholder={{ color: 'whiteAlpha.700' }}
        />
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        type="submit"
        width="full"
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
