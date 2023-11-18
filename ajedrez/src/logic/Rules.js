import { emptySpace } from '../constantes.js'

export const pieceMovementRules = {
  PAWN: (previous, current) =>
    previous.color === 'Black' &&
    Math.abs(previous.posicion - current.posicion) === 8,
  KNIGHT: (previous, current) =>
    [17, 15, 10, 6].includes(Math.abs(previous.posicion - current.posicion)),
  BISHOP: (previous, current) =>
    Math.abs(previous.posicion - current.posicion) % 9 === 0 ||
    Math.abs(previous.posicion - current.posicion) % 7 === 0,
  ROOK: (previous, current) => {
    const sameRow =
      Math.floor(previous.posicion / 8) === Math.floor(current.posicion / 8)
    const sameCol = previous.posicion % 8 === current.posicion % 8
    return sameRow || sameCol
  },
  KING: (previous, current) => {
    const diffRow = Math.abs(
      Math.floor(previous.posicion / 8) - Math.floor(current.posicion / 8)
    )
    const diffCol = Math.abs((previous.posicion % 8) - (current.posicion % 8))
    return diffRow <= 1 && diffCol <= 1
  },
  QUEEN: (previous, current) => {
    const diff = Math.abs(previous.posicion - current.posicion)
    return (
      diff % 9 === 0 ||
      diff % 7 === 0 ||
      Math.floor(previous.posicion / 8) === Math.floor(current.posicion / 8) ||
      previous.posicion % 8 === current.posicion % 8
    )
  },
}

export const isPathClear = (start, end, board) => {
  const startRow = Math.floor(start / 8)
  const startCol = start % 8
  const endRow = Math.floor(end / 8)
  const endCol = end % 8

  const rowDiff = Math.abs(endRow - startRow)
  const colDiff = Math.abs(endCol - startCol)

  const rowIncrement = endRow > startRow ? 1 : endRow < startRow ? -1 : 0
  const colIncrement = endCol > startCol ? 1 : endCol < startCol ? -1 : 0

  for (let i = 1; i < Math.max(rowDiff, colDiff); i++) {
    const currentPos = start + i * 8 * rowIncrement + i * colIncrement

    if (board[currentPos].text !== emptySpace) {
      // Hay una pieza en el camino
      return false
    }
  }

  return true
}
