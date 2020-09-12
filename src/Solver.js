import { englishWords } from './Words.js';

const bsearch = (value, items) => {
  let firstIndex  = 0;
  let lastIndex   = items.length - 1;
  let middleIndex = Math.floor((lastIndex + firstIndex) / 2);

  while (items[middleIndex] != value && firstIndex < lastIndex) {
    if (value < items[middleIndex]) {
      lastIndex = middleIndex - 1;
    }
    else if (value > items[middleIndex]) {
      firstIndex = middleIndex + 1;
    }
    middleIndex = Math.floor((lastIndex + firstIndex)/2);
  }

 return (items[middleIndex] != value) ? -1 : middleIndex;
}

const isStartOfHorizontalWord = (row, column, board) => {
  // No letter in this tile
  if (board[row][column].letter === '') {
    return false;
  }

  // At the start of the board and tile to right is a letter
  if (column === 0) {
    if (board[row][column + 1].letter !== '') {
      return true;
    }
    return false;
  }

  // At the end of the board
  if (column === board[0][0].length - 1) {
    return false;
  }

  // Somewhere in the board where there is no letter to the left but one to the right
  if (board[row][column - 1].letter === '' && board[row][column + 1].letter !== '') {
    return true;
  }

  return false;
}

const isStartOfVerticalWord = (row, column, board) => {
    // No letter in this tile
    if (board[row][column].letter === '') {
      return false;
    }

  // At the start of the board and a letter is beneath this tile
  if (row === 0) {
    if (board[row + 1][column].letter !== '') {
      return true
    }
    return false;
  }

  // At the end of the board
  if (row === board[0].length - 1) {
    return false;
  }

  // Somewhere in the board where there is no letter above but there is one beneath
  if (board[row - 1][column].letter === '' && board[row + 1][column].letter !== '') {
    return true;
  }

  return false;
}

/**
 * Do this after we know that this tile is the start of horizontal word
 */
const getHorizontalWord = (row, column, board) => {
  let lastColumnOfWord = column;
  let word = '';

  while(lastColumnOfWord < board[0][0].length || board[row][lastColumnOfWord].letter !== '') {
    word += board[row][lastColumnOfWord].letter;
    lastColumnOfWord += 1;
  }

  return word;
}

/**
 * Do this after we know that this tile is the start of vertical word
 */
const getVerticalWord = (row, column, board) => {
  let lastRowOfWord = row;
  let word = '';

  while(lastRowOfWord < board[0][0].length || board[lastRowOfWord][column].letter !== '') {
    word += board[lastRowOfWord][column].letter;
    lastRowOfWord += 1;
    if (lastRowOfWord > 100) {
      console.log('wtf')
      break;
    }
  }

  return word;
}

const isLeftEmpty = (row, column, board) => {
  return column - 1 < 0 || board[row][column - 1].letter === '';
}

const isRightEmpty = (row, column, board) => {
  return column + 1 >= board.length || board[row][column + 1].letter === '';
}

const isTopEmpty = (row, column, board) => {
  return row - 1 < 0 || board[row - 1][column].letter === '';
}

const isBottomEmpty = (row, column, board) => {
  return row + 1 >= board.length || board[row + 1][column].letter === '';
}

const neighbouringTilesAreEmpty = (row, column, board) => {
  return isLeftEmpty(row, column, board) && isRightEmpty(row, column, board) && isTopEmpty(row, column, board) && isBottomEmpty(row, column, board)
}

const wordsAreConnected = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[row].length; column++) {
      if (board[row][column].letter !== '' && neighbouringTilesAreEmpty(row, column, board)) {
        return false;
      }
    }
  }
  return true;
}

const isWord = (word) => {
  return bsearch(word, englishWords) >= 0;
}

/**
 * Returns list of invalid words
 */
const boardIsValid = (board) => {
  const invalidWords = [];
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[0].length; column++) {
      if (isStartOfHorizontalWord(row, column, board)) {
        const word = getHorizontalWord(row, column, board)
        if (!isWord(word)) {
          invalidWords.push(word)
        }
      }

      if (isStartOfVerticalWord(row, column, board)) {
        const word = getVerticalWord(row, column, board)
        if (!isWord(word)) {
          invalidWords.push(word)
        }
      }
    }
  }
  return invalidWords;
}

const makeWords = (letters, row, index) => {

}

const fooHorizontal = (letters, row, rowPosition) => {
  let list = []
  for (let i = 0; i < row.length; i++) {
    if (row[i].letter !== '') {
      list.push()
      
      makeWords(letters, row, i)
    }
  }
}
// const amountOfTilesToTheLeft = i;
//       const amountOfTilesToTheRight = row.length - i;

export {
  isStartOfHorizontalWord,
  isStartOfVerticalWord,
  getHorizontalWord,
  getVerticalWord,
  boardIsValid,
  fooHorizontal,
  wordsAreConnected,
}