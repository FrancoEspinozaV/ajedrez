import { useState } from 'react'
import { initialBoard, emptySpace } from './constantes.js'

import {
  createChessPiece,
  getPieceColor,
  getTypeAndText,
  movePiece,
} from './logic/functions.js'

import { pieceMovementRules, isPathClear } from './logic/Rules.js'

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
      if (previousSelectedPiece === null) {
        return currentPiece
      }

      // Movimiento a un espacio blanco
      if (currentPiece.text === emptySpace && previousSelectedPiece !== null) {
        const isKnight = previousSelectedPiece.type === 'KNIGHT'
        const isValidMove = pieceMovementRules[previousSelectedPiece.type](
          previousSelectedPiece,
          currentPiece
        )
        const isClear =
          isKnight ||
          isPathClear(
            previousSelectedPiece.posicion,
            currentPiece.posicion,
            board
          )

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
