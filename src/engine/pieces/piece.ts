import Board from "../board";
import Square from "../square";
import Player from "../player";
import Direction from "../direction";

export default class Piece {
    constructor(public readonly player: Player) {
    }

    getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    private checkForMovesAlongLine(board: Board, startSquare: Square, xInterval: Direction, yInterval: Direction) {

        const moves = new Array(0);

        let diagonalSquare = new Square(startSquare.row + yInterval, startSquare.col + xInterval);

        while(board.isInBoard(diagonalSquare) && !board.getPiece(diagonalSquare)){
            moves.push(diagonalSquare);
            diagonalSquare = new Square(diagonalSquare.row + yInterval, diagonalSquare.col + xInterval);
        }

        return moves;
    }

    protected checkForDiagonalMoves(board: Board, startSquare: Square){

        let moves = new Array(0);

        moves = moves.concat(this.checkForMovesAlongLine(board,startSquare,Direction.POSITIVE, Direction.POSITIVE));
        moves = moves.concat(this.checkForMovesAlongLine(board,startSquare,Direction.POSITIVE,Direction.NEGATIVE));
        moves = moves.concat(this.checkForMovesAlongLine(board,startSquare,Direction.NEGATIVE, Direction.POSITIVE));
        moves = moves.concat(this.checkForMovesAlongLine(board,startSquare,Direction.NEGATIVE, Direction.NEGATIVE));

        return moves;
    }


    protected checkForLateralMoves(board: Board, startSquare: Square){

        let moves = new Array(0);

        //horizontal
        moves = moves.concat(this.checkForMovesAlongLine(board, startSquare, Direction.POSITIVE, Direction.NEITHER));
        moves = moves.concat(this.checkForMovesAlongLine(board, startSquare, Direction.NEGATIVE, Direction.NEITHER));
        //vertical
        moves = moves.concat(this.checkForMovesAlongLine(board, startSquare, Direction.NEITHER, Direction.POSITIVE));
        moves = moves.concat(this.checkForMovesAlongLine(board, startSquare, Direction.NEITHER, Direction.NEGATIVE));

        return moves;
    }


}
