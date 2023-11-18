import { WHITE_PIECES, BLACK_PIECES, emptySpace } from '../constantes.js'

export const createChessPiece = ({ text, type, color, posicion }) => ({
  text,
  type,
  color,
  posicion,
})

export const swapObjet = (obj1, obj2, tercerElemento) => {
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

export const getPieceColor = (posicion) => {
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

export const getTypeAndText = (posicion, color) => {
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

export const movePiece = ({
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
