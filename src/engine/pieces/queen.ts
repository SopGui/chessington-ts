import Piece from './piece';
import Board from "../board";
import Player from "../player";
import PieceType from "./peiceType";

export default class Queen extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getPieceType(): PieceType{
        return PieceType.QUEEN;
    }

    getAvailableMoves(board: Board) {

        let moves = new Array(0);

        const currentSquare = board.findPiece(this);

        //add lateral
        moves = moves.concat(this.checkForLateralMoves(board,currentSquare));

        //add diagonal
        moves = moves.concat(this.checkForDiagonalMoves(board,currentSquare));

        return moves;
    }
}
