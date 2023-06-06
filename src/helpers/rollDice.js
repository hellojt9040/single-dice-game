const getRandomNumber = (min, max) => {
  const randomDecimal = Math.random();
  const scaledNumber = randomDecimal * (max - min + 1);
  const randomNumber = Math.floor(scaledNumber) + min;
  return randomNumber;
};

export default getRandomNumber;
