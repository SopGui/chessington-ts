import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import Direction from "../direction";
import PieceType from "./peiceType";

export default class Pawn extends Piece {

    private hasMoved = false

    constructor(player: Player) {
        super(player);
    }

    getPieceType(): PieceType{
        return PieceType.PAWN;
    }

    moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.hasMoved = true;
    }

    tileIsOnBoardAndAvailable(board: Board, square: Square) {
        return board.isInBoard(square) && !board.getPiece(square);
    }

    getForwardPawnMoves(board: Board, startSquare: Square, yDirection: Direction): Square[] {

        const moves: Square[] = new Array(0)

        const oneSquareDif = new Square(startSquare.row + yDirection, startSquare.col);
        if (!this.tileIsOnBoardAndAvailable(board, oneSquareDif)) {
            //stop here if not available - cannot make any moves as path blocked
            return moves;
        }
        moves.push(oneSquareDif);

        if (this.hasMoved) {
            //stop here if moved already - can only move 1 space after first move
            return moves;
        }
        const twoSquareDif = new Square(startSquare.row + (yDirection * 2), startSquare.col);
        if (this.tileIsOnBoardAndAvailable(board, twoSquareDif)) {
            moves.push(twoSquareDif);
        }

        return moves;

    }


    checkForTakeablePiece(board: Board, startSquare: Square, yDirection: Direction, xDirection: Direction): Square|null {

        const squareToTake = new Square(startSquare.row + yDirection, startSquare.col + xDirection);

        if(!board.isInBoard(squareToTake)){
            return null;
        }

        const pieceToTake = board.getPiece(squareToTake);

        if(!pieceToTake){
            return null;
        }

        if(pieceToTake.player === this.player){
            return null;
        }

        if(pieceToTake.getPieceType() == PieceType.KING){
            return null;
        }

        return squareToTake;

    }

    getDiagonalTakeableSquares(board: Board, startSquare: Square, yDirection: Direction): Square[]{

        const moves: Square[] = new Array(0);

        const leftDiagonalTakeableSquare = this.checkForTakeablePiece(board, startSquare, yDirection, -1);
        const rightDiagonalTakeableSquare = this.checkForTakeablePiece(board, startSquare, yDirection, 1);

        if(leftDiagonalTakeableSquare){
            moves.push(leftDiagonalTakeableSquare);
        }
        if(rightDiagonalTakeableSquare){
            moves.push(rightDiagonalTakeableSquare);
        }

        return moves;
    }


    getAvailableMoves(board: Board) {

        const currentSquare = board.findPiece(this);

        let moves: Square[] = new Array(0);

        switch (this.player){

            case Player.WHITE:
            {
                moves = moves.concat(this.getForwardPawnMoves(board,currentSquare,1));
                moves = moves.concat(this.getDiagonalTakeableSquares(board, currentSquare, 1));

                return moves;
            }
            case Player.BLACK:
            {
                moves = moves.concat(this.getForwardPawnMoves(board,currentSquare,-1));
                moves = moves.concat(this.getDiagonalTakeableSquares(board, currentSquare, -1));

                return moves;
            }
        }

    }
}
