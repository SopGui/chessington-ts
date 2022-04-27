import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import Direction from "../direction";

export default class Pawn extends Piece {

    private hasMoved = false

    constructor(player: Player) {
        super(player);
    }

    moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.hasMoved = true;
    }

    checkForPawnMoves(board: Board, startSquare: Square, yDirection: Direction): Square[]{

        const moves: Square[] = new Array(0)

        const oneSquareDif = new Square(startSquare.row + yDirection, startSquare.col);
        moves.push(oneSquareDif);

        if(!this.hasMoved){
            const twoSquareDif = new Square(startSquare.row + (yDirection * 2), startSquare.col);
            moves.push(twoSquareDif);
        }

        return moves;
    }

    getAvailableMoves(board: Board) {

        const currentSquare = board.findPiece(this);

        let moves: Square[] = new Array(0);

        switch (this.player){

            case Player.WHITE:
            {
                moves = moves.concat(this.checkForPawnMoves(board,currentSquare,1));

                return moves;
            }
            case Player.BLACK:
            {
                moves = moves.concat(this.checkForPawnMoves(board,currentSquare,-1));

                return moves;
            }
        }

    }
}
