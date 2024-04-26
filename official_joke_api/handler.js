const jokes = require("./jokes/index.json");

let lastJokeId = 0;
jokes.forEach((jk) => (jk.id = ++lastJokeId));

const randomJoke = () => {
  return jokes[Math.floor(Math.random() * jokes.length)];
};

/**
 * Get N random jokes from a jokeArray
 */
const randomN = (jokeArray, n) => {
  const limit = jokeArray.length < n ? jokeArray.length : n;
  const randomIndicesSet = new Set();

  while (randomIndicesSet.size < limit) {
    const randomIndex = Math.floor(Math.random() * jokeArray.length);
    if (!randomIndicesSet.has(randomIndex)) {
      randomIndicesSet.add(randomIndex);
    }
  }

  return Array.from(randomIndicesSet).map((randomIndex) => {
    return jokeArray[randomIndex];
  });
};

const randomTen = () => randomN(jokes, 10);

const randomSelect = (number) => randomN(jokes, number);

const jokeByType = (type, n) => {
  return randomN(
    jokes.filter((joke) => joke.type === type),
    n
  );
};

/**
 * @param {Number} id - joke id
 * @returns a single joke object or undefined
 */
const jokeById = (id) => jokes.filter((jk) => jk.id === id)[0];

/**
 * @param {Number} page - joke page
 * @param {Number} limit - joke count
 * @param {String} type - joke key
 * @param {String} order - asc / desc
 * @returns all jokes paginated that matches the filters
 */
const filteredJokes = (page = 1, limit = 10, type = null, order = null) => {
  // Filter jokes by type or return all jokes
  let allJokes =
    type !== null && type !== "null" && type !== "undefined" && type !== ""
      ? jokes.filter((joke) => joke.type === type)
      : jokes;

  // order
  allJokes = order == "asc" ? allJokes.reverse() : allJokes;

  // Create new array to paginate jokes without affecting the original
  const pagedJokes = [];

  for (let i = 0; i <= allJokes.length; i++) {
    if (i >= (page - 1) * limit && pagedJokes.length < limit) {
      pagedJokes.push(allJokes[i]);
    }
  }

  return {
    total: allJokes.length,
    type: type,
    data: pagedJokes,
  };
};

/**
 * Get all joke types
 **/
const jokeTypes = () => {
  const types = [];
  for (const joke of jokes) {
    if (!types.find((item) => item.name === joke.type)) {
      types.push({ name: joke.type, code: joke.type });
    }
  }

  return types;
};

module.exports = {
  jokes,
  randomJoke,
  randomN,
  randomTen,
  randomSelect,
  jokeById,
  jokeByType,
  filteredJokes,
  jokeTypes,
};
