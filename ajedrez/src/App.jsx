import { useState } from 'react'

const initialBoard = Array.from({ length: 64 }, (_, index) => index)

const emptySpace = '-'

const WHITE_PIECES = {
  peon: [8, 9, 10, 11, 12, 13, 14, 15],
  torre: [0, 7],
  caballos: [1, 6],
  alfil: [2, 5],
  reina: [3],
  rey: [4],
}

const BLACK_PIECES = {
  peon: [48, 49, 50, 51, 52, 53, 54, 55],
  torre: [56, 63],
  caballos: [57, 62],
  alfil: [58, 61],
  reina: [59],
  rey: [60],
}

const createChessPiece = ({ text, type, color, posicion }) => ({
  text,
  type,
  color,
  posicion,
})

const swapObjet = (obj1, obj2, tercerElemento) => {
  if (
    obj1.hasOwnProperty(tercerElemento) &&
    obj2.hasOwnProperty(tercerElemento)
  ) {
    const nuevoObj1 = { ...obj2, [tercerElemento]: obj1[tercerElemento] }
    const nuevoObj2 = { ...obj1, [tercerElemento]: obj2[tercerElemento] }
    return [nuevoObj1, nuevoObj2]
  } else {
    console.error('El tercer elemento no existe en ambos objetos.')
    return [obj1, obj2]
  }
}

const getPieceColor = (posicion) => {
  if (
    WHITE_PIECES.peon.includes(posicion) ||
    WHITE_PIECES.torre.includes(posicion) ||
    WHITE_PIECES.caballos.includes(posicion) ||
    WHITE_PIECES.alfil.includes(posicion) ||
    WHITE_PIECES.reina.includes(posicion) ||
    WHITE_PIECES.rey.includes(posicion)
  ) {
    return 'White'
  } else if (
    BLACK_PIECES.peon.includes(posicion) ||
    BLACK_PIECES.torre.includes(posicion) ||
    BLACK_PIECES.caballos.includes(posicion) ||
    BLACK_PIECES.alfil.includes(posicion) ||
    BLACK_PIECES.reina.includes(posicion) ||
    BLACK_PIECES.rey.includes(posicion)
  ) {
    return 'Black'
  } else {
    return 'none'
  }
}

const pieceMovementRules = {
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

const getTypeAndText = (posicion, color) => {
  if (
    WHITE_PIECES.peon.includes(posicion) ||
    BLACK_PIECES.peon.includes(posicion)
  ) {
    return { type: 'PAWN', posicion, text: color === 'White' ? 'P' : 'p' }
  } else if (
    WHITE_PIECES.torre.includes(posicion) ||
    BLACK_PIECES.torre.includes(posicion)
  ) {
    return { type: 'ROOK', posicion, text: color === 'White' ? 'T' : 't' }
  } else if (
    WHITE_PIECES.caballos.includes(posicion) ||
    BLACK_PIECES.caballos.includes(posicion)
  ) {
    return { type: 'KNIGHT', posicion, text: color === 'White' ? 'C' : 'c' }
  } else if (
    WHITE_PIECES.alfil.includes(posicion) ||
    BLACK_PIECES.alfil.includes(posicion)
  ) {
    return { type: 'BISHOP', posicion, text: color === 'White' ? 'A' : 'a' }
  } else if (
    WHITE_PIECES.reina.includes(posicion) ||
    BLACK_PIECES.reina.includes(posicion)
  ) {
    return { type: 'QUEEN', posicion, text: color === 'White' ? 'Q' : 'q' }
  } else if (
    WHITE_PIECES.rey.includes(posicion) ||
    BLACK_PIECES.rey.includes(posicion)
  ) {
    return { type: 'KING', posicion, text: color === 'White' ? 'K' : 'k' }
  } else {
    return { type: 'none', posicion, text: emptySpace, color: 'none' }
  }
}

const isPathClear = (start, end, board) => {
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

const movePiece = ({
  newBoard,
  currentPiece,
  selectedPiece,
  mantener = 'posicion',
  setBoard,
}) => {
  const [obj1, obj2] = swapObjet(currentPiece, selectedPiece, mantener)
  newBoard[currentPiece.posicion] = obj1
  newBoard[selectedPiece.posicion] = obj2
  setBoard(newBoard)
}

const App = () => {
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [board, setBoard] = useState(() => {
    const nuevoArreglo = initialBoard.map((index) => {
      const color = getPieceColor(index)
      const { type, text, posicion } = getTypeAndText(index, color)
      return createChessPiece({ color, type, text, posicion })
    })
    return nuevoArreglo
  })

  const handleSquareClick = (position) => {
    const currentPiece = board[position]
    const newBoard = [...board]

    setSelectedPiece((previousSelectedPiece) => {
      if (previousSelectedPiece === null) return currentPiece
      // movimiento a un espacio blanco
      if (currentPiece.text === emptySpace && previousSelectedPiece !== null) {
        const isKnight = previousSelectedPiece.type === 'KNIGHT'
        let isClear = true

        const isValidMove = pieceMovementRules[previousSelectedPiece.type](
          previousSelectedPiece,
          currentPiece
        )

        if (!isKnight) {
          isClear = isPathClear(
            previousSelectedPiece.posicion,
            currentPiece.posicion,
            board
          )
        }

        if (isValidMove && isClear) {
          movePiece({
            newBoard,
            currentPiece,
            selectedPiece: previousSelectedPiece,
            setBoard,
          })
        }
      }

      return null
    })
    console.log(
      `pieza seleccionada: 
        ${currentPiece.text} 
        ${currentPiece.color} 
        ${currentPiece.posicion}`
    )
  }

  return (
    <>
      <h1>Ajedrez</h1>
      <section className='grid-container'>
        {board.map((square, index) => (
          <div
            onClick={() => handleSquareClick(index)}
            className='square'
            key={index}
          >
            {square.text}
          </div>
        ))}
      </section>
    </>
  )
}

export default App
