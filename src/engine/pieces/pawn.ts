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

        const moves: Square[] = [];

        switch (this.player){

            case Player.BLACK:
            {
                const oneSquareDown = new Square(currentSquare.row - 1, currentSquare.col);
                const twoSquaresDown = new Square(currentSquare.row - 2, currentSquare.col);

                moves.push(oneSquareDown);
                if(!this.hasMoved){
                    moves.push(twoSquaresDown);
                }

                break;
            }
            case Player.WHITE:
            {
                const oneSquareUp = new Square(currentSquare.row + 1, currentSquare.col);
                const twoSquaresUp = new Square(currentSquare.row + 2, currentSquare.col);

                moves.push(oneSquareUp)
                if(!this.hasMoved){
                    moves.push(twoSquaresUp);
                }

                break;
            }
        }

        return moves;
    }
}
