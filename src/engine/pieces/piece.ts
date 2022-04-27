import Board from "../board";
import Square from "../square";
import Player from "../player";

export default class Piece {

    protected hasMoved = false;

    constructor(public readonly player: Player) {
    }

    getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board: Board, newSquare: Square) {
        this.hasMoved = true;
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}
