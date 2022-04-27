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

    tileIsOnBoardAndAvailable(board: Board, square: Square) {
        return board.isInBoard(square) && !board.getPiece(square);
    }

    checkForPawnMoves(board: Board, startSquare: Square, yDirection: Direction): Square[]{

        const moves: Square[] = new Array(0)

        const oneSquareDif = new Square(startSquare.row + yDirection, startSquare.col);
        if(!this.tileIsOnBoardAndAvailable(board, oneSquareDif)){
            //stop here if not available - cannot make any moves as path blocked
            return moves;
        }
        moves.push(oneSquareDif);

        if(this.hasMoved){
            //stop here if moved already - can only move 1 space after first move
            return moves;
        }
        const twoSquareDif = new Square(startSquare.row + (yDirection * 2), startSquare.col);
        if(this.tileIsOnBoardAndAvailable(board,twoSquareDif)){
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
