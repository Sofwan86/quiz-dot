import React from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const QuizStart = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const savedQuizProgress = localStorage.getItem(`quizProgress_${username}`);
  const quizData = savedQuizProgress ? JSON.parse(savedQuizProgress) : null;

  const startNewQuiz = () => {
    localStorage.removeItem(`quizProgress_${username}`);
    navigate("/quiz");
  };

  const resumeQuiz = () => {
    navigate("/quiz");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <VStack
      spacing={6}
      padding={4}
      minHeight="100vh"
      justifyContent="center"
      bgGradient="linear(to-r, teal.400, green.500)"
      px={{ base: 4, md: 8 }}
    >
      <Button
        position="absolute"
        top={4}
        right={4}
        colorScheme="red"
        onClick={handleLogout}
        size="lg"
      >
        Logout
      </Button>
      <Text
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="bold"
        color="white"
      >
        Welcome, {username}!
      </Text>
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        color="white"
      >
        to the DOT Quiz!
      </Text>

      {quizData ? (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          padding="4"
          width="100%"
          maxWidth={{ base: "100%", md: "400px" }}
          boxShadow="xl"
          backgroundColor="white"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
            You have an unfinished quiz!
          </Text>
          <Text fontSize={{ base: "sm", md: "lg" }}>
            Current Question: {quizData.currentQuestionIndex + 1}
          </Text>
          <Text fontSize={{ base: "sm", md: "lg" }}>
            Score: {quizData.score}
          </Text>
          <Text fontSize={{ base: "sm", md: "lg" }}>
            Remaining Time: {quizData.remainingTime} seconds
          </Text>
          <Button
            colorScheme="green"
            onClick={resumeQuiz}
            width="100%"
            marginTop={4}
            size={{ base: "md", md: "lg" }}
          >
            Resume Quiz
          </Button>
        </Box>
      ) : (
        <Text fontSize={{ base: "md", md: "lg" }} color="white">
          Lets go!
        </Text>
      )}

      <Button
        colorScheme="blue"
        onClick={startNewQuiz}
        width="100px"
        height="100px"
        borderRadius="full"
        fontSize="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={4}
      >
        Start Quiz
      </Button>
    </VStack>
  );
};

export default QuizStart;
