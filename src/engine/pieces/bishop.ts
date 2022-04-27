import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player: Player) {
        super(player);
    }

    private checkForDiagonalMoves(board: Board, startSquare: Square, positiveX: boolean, positiveY: boolean) {

        const moves = new Array(0);

        const xInterval = positiveX ? 1 : -1;
        const yInterval = positiveY ? 1 : -1;

        let diagonalSquare = new Square(startSquare.row + yInterval, startSquare.col + xInterval);

        while(board.isInBoard(diagonalSquare)){
            moves.push(diagonalSquare);
            diagonalSquare = new Square(diagonalSquare.row + yInterval, diagonalSquare.col + xInterval);
        }

        return moves;
    }



    getAvailableMoves(board: Board) {

        let moves = new Array(0);

        const currentSquare = board.findPiece(this);

        moves = moves.concat(this.checkForDiagonalMoves(board, currentSquare,true, true));
        moves = moves.concat(this.checkForDiagonalMoves(board, currentSquare,true, false));
        moves = moves.concat(this.checkForDiagonalMoves(board, currentSquare,false, true));
        moves = moves.concat(this.checkForDiagonalMoves(board, currentSquare,false, false));

        return moves;
    }

}
