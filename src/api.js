import axios from 'axios';

export const fetchQuestions = async () => {
  const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
  return response.data.results;
};
