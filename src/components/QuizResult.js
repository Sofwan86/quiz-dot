import React, { useEffect } from 'react';
import { VStack, Text, Button, Box } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

const championSound = new Audio('/sounds/winner.mp3');
const loserSound = new Audio('/sounds/loser.mp3');

const QuizResult = ({ score, wrong, totalQuestions, totalAnswared, onRestart, onBackToMenu }) => {
  useEffect(() => {
    if (score > 5) {
      championSound.play();
    } else {
      loserSound.play();
    }
  }, [score]);

  const isChampion = score >= 5;

  return (
    <VStack
      spacing={6}
      padding={6}
      minHeight="100vh"
      justifyContent="center"
      bgGradient={isChampion ? "linear(to-r, teal.400, blue.400)" : "linear(to-r, orange.400, pink.400)"} 
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        padding={6}
        width="100%"
        maxWidth="400px"
        backgroundColor={isChampion ? "white" : "gray.100"} 
        boxShadow="2xl"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }} 
      >
        <Text fontSize="4xl" fontWeight="bold" color={isChampion ? "green.600" : "red.600"} textAlign="center">
          {isChampion ? 'Champions!' : 'Loser'}
        </Text>
        
        <Text fontSize="2xl" textAlign="center" marginTop={4}>
          <CheckIcon color="green.400" /> Correct Answers: {score}
        </Text>
        <Text fontSize="2xl" textAlign="center" marginTop={2}>
          <CloseIcon color="red.400" /> Incorrect Answers: {wrong}
        </Text>
        <Text fontSize="2xl" textAlign="center" marginTop={2}>
          Total Answered: {totalAnswared + 1}
        </Text>
        <Text fontSize="2xl" textAlign="center" marginTop={2}>
          Total Questions: {totalQuestions}
        </Text>


        <Button 
          colorScheme="blue" 
          onClick={onRestart} 
          width="100%" 
          marginTop={4}
          size="lg"
        >
          Restart Quiz
        </Button>
        
        <Button 
          colorScheme="teal" 
          onClick={onBackToMenu} 
          width="100%" 
          marginTop={2}
          size="lg"
        >
          Back to Menu
        </Button>
      </Box>
    </VStack>
  );
};

export default QuizResult;
