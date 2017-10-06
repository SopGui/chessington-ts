import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {

        const currentSquare = board.findPiece(this);

        switch (this.player){
            case Player.BLACK:
            {
                return [new Square(currentSquare.row - 1, currentSquare.col)];
            }
            case Player.WHITE:
                return [new Square(currentSquare.row + 1, currentSquare.col)];
        }
    }
}
