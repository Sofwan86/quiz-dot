import React, { useState, useEffect } from 'react';
import { fetchQuestions } from '../api';
import { Box, VStack, Text, Button, useToast, Stack } from '@chakra-ui/react';
import QuizResult from './QuizResult';
import LoadingAnimation from './LoadingAnimation';
import GameTimer from './GameTimer';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [finished, setFinished] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const toast = useToast();

  const correctSound = new Audio('/sounds/correct-answer.mp3');
  const wrongSound = new Audio('/sounds/wrong-answer.mp3');

  const saveQuizProgress = () => {
    const quizData = {
      currentQuestionIndex,
      score,
      wrong,
      remainingTime,
      questions,
    };
    const username = localStorage.getItem('username');
    localStorage.setItem(`quizProgress_${username}`, JSON.stringify(quizData));
  };

  const loadQuizProgress = () => {
    const username = localStorage.getItem('username');
    const savedProgress = localStorage.getItem(`quizProgress_${username}`);
    if (savedProgress) {
      const { currentQuestionIndex, score, wrong, remainingTime, questions } = JSON.parse(savedProgress);
      setCurrentQuestionIndex(currentQuestionIndex);
      setScore(score);
      setWrong(wrong);
      setRemainingTime(remainingTime);
      setQuestions(questions);
    } else {
      fetchQuestions().then(setQuestions);
    }
  };

  useEffect(() => {
    loadQuizProgress();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      saveQuizProgress();
    }
  }, [currentQuestionIndex, score, wrong, remainingTime, questions]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
      correctSound.play();
      toast({
        title: "Correct Answer!",
        description: "You scored a point.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setWrong(wrong + 1);
      wrongSound.play();
      toast({
        title: "Wrong Answer!",
        description: "Better luck next time.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishGame();
    }
  };

  const handleTimeUp = () => {
    finishGame();
  };

  const finishGame = () => {
    const username = localStorage.getItem('username');
    localStorage.removeItem(`quizProgress_${username}`);
    setFinished(true);
  };

  const handleRestart = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setWrong(0);
    setFinished(false);
    setRemainingTime(60);
    const username = localStorage.getItem('username');
    localStorage.removeItem(`quizProgress_${username}`);
    fetchQuestions().then(setQuestions);
  };

  const handleBackToMenu = () => {
    const username = localStorage.getItem('username');
    localStorage.removeItem(`quizProgress_${username}`);
    navigate('/start');
  };

  if (finished) {
    return (
      <QuizResult
        score={score}
        wrong={wrong}
        totalQuestions={questions.length}
        totalAnswared={currentQuestionIndex}
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  if (questions.length === 0) {
    return <LoadingAnimation />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  return (
    <Box
      bgGradient="linear(to-r, teal.500, blue.500)"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={4}
    >
      <VStack spacing={4} maxWidth="600px" width="100%">
        <GameTimer
          initialTime={remainingTime}
          onTimeUp={handleTimeUp}
          onTimeChange={setRemainingTime}
        />
        <Box
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          backgroundColor="white"
          padding={4}
          width="100%"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {currentQuestion.question}
          </Text>
          <Stack spacing={3}>
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                variant="outline"
                colorScheme="teal"
                size="lg"
                _hover={{ bg: 'teal.600', color: 'white' }}
                _active={{ bg: 'teal.700' }}
              >
                {option}
              </Button>
            ))}
          </Stack>
        </Box>
        {/* Tampilkan soal ke-N dari total M soal */}
        <Text fontSize="lg" color="white">
          {currentQuestionIndex + 1} / {questions.length}
        </Text>
      </VStack>
    </Box>
  );
};

export default Quiz;
