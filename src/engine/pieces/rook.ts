import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import PieceType from "./peiceType";

export default class Rook extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getPieceType(): PieceType{
        return PieceType.ROOK;
    }

    getAvailableMoves(board: Board) {

        const currentSquare = board.findPiece(this);

        return this.checkForLateralMoves(board, currentSquare);
    }
}
