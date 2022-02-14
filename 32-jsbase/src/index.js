const cities = ['Caracas', 'Buenos Aires', 'Santiago', 'Ciudad de México'];

const randomString = () => {
  const strings = cities[Math.floor(Math.random() * cities.length)];
  return strings;
};

const reverseString2 = str => {
  return new Promise((resolve, reject) => {
    if (!str) {
      reject(Error('Error'));
    }
    resolve(str.split("").reverse().join(""));
  });
};

module.exports = randomString;
