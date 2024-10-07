import React, { useEffect, useState } from 'react';
import { CircularProgress, Text, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionCircularProgress = motion(CircularProgress);

const GameTimer = ({ initialTime, onTimeUp, onTimeChange }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;

        if (onTimeChange) {
          onTimeChange(newTime);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeUp, onTimeChange]);

  const progress = (time / 60) * 100;

  const getColor = () => {
    if (time > 60 * 0.5) return 'green.400';
    if (time > 60 * 0.2) return 'yellow.400';
    return 'red.500';
  };

  return (
    <Box position="relative" display="inline-block" textAlign="center">
      <MotionCircularProgress
        value={progress}
        size="150px"
        thickness="12px"
        color={getColor()}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ ease: 'linear', duration: initialTime }} 
      />
      
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text fontSize="2xl" color={"white"} fontWeight="bold">{time}s</Text>
      </Box>
    </Box>
  );
};

export default GameTimer;
