# Getting started

This project was created with [create-simple-express](https://github.com/jayaregalinada/create-simple-express)

## Description
A mini-dictionary API of common cybersecurity terms.

## Installation

Install the dependencies by running:

```bash
npm install
```

> You can replace the default `npm` to your favorite package manager like [`yarn`](https://yarnpkg.com) or [`pnpm`](https://pnpm.io)

## Development

After the [installation](#installation), you can run

```bash
npm run dev
```

This will run the app in the development mode.

## Use

Lists all the words in the dictionary
```
/words
```

Returns a specific word, its type, and definition.

```
/words/{word}
```

Returns all words that match the given type (verb, noun, or adjective).
```
/filter?type={verb}
```

Returns all words that contain the letters indicated in the query.
```
/search?q={query}
```

Returns a random word from the dictionary list
```
/random
```

Returns all words that begin with the specified letter
```
/starts-with/{letter}
```

Returns all words, sorted either by length or alphabetically.
```
/sort?by=length
/sort?by=alphabet
```
