import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Bishop extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {

        const currentSquare = board.findPiece(this);

        return this.checkForDiagonalMoves(board, currentSquare);
    }

}
