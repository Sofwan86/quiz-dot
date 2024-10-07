import React from 'react';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionSpinner = motion(Spinner);

const LoadingAnimation = () => {
  return (
    <Center height="100vh" flexDirection="column">
      <MotionSpinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        initial={{ scale: 0 }}
        animate={{ scale: [0.5, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      />
      <Text mt={4} fontSize="lg" fontWeight="bold">
        Loading, please wait...
      </Text>
    </Center>
  );
};

export default LoadingAnimation;
