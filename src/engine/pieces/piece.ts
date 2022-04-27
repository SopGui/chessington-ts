import Board from "../board";
import Square from "../square";
import Player from "../player";
import Direction from "../direction";
import PieceType from "./peiceType";

export default class Piece {
    constructor(public readonly player: Player) {
    }

    getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    getPieceType(): PieceType{
        throw new Error('This method must be implemented, and return the piece type');
    }

    moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    private checkForMovesAlongLine(board: Board, startSquare: Square, xInterval: Direction, yInterval: Direction) {

        const moves = new Array(0);

        let diagonalSquare = new Square(startSquare.row + yInterval, startSquare.col + xInterval);

        while(board.isInBoard(diagonalSquare) && !board.getPiece(diagonalSquare)){
            moves.push(diagonalSquare);
            diagonalSquare = new Square(diagonalSquare.row + yInterval, diagonalSquare.col + xInterval);
        }

        //check if path was blocked by opposing piece - if yes, we can take it, as long as it's not the king
        if(board.isInBoard(diagonalSquare)){
            const blockingPiece = board.getPiece(diagonalSquare);
            if(blockingPiece?.player !== this.player && blockingPiece?.getPieceType() !== PieceType.KING){
                moves.push(diagonalSquare);
            }
        }

        return moves;
    }

    protected checkForDiagonalMoves(board: Board, startSquare: Square){

        let moves = new Array(0);

        moves = moves.concat(this.checkForMovesAlongLine(board,startSquare,Direction.POSITIVE, Direction.POSITIVE));
        moves = moves.concat(this.checkForMovesAlongLine(board,startSquare,Direction.POSITIVE,Direction.NEGATIVE));
        moves = moves.concat(this.checkForMovesAlongLine(board,startSquare,Direction.NEGATIVE, Direction.POSITIVE));
        moves = moves.concat(this.checkForMovesAlongLine(board,startSquare,Direction.NEGATIVE, Direction.NEGATIVE));

        return moves;
    }


    protected checkForLateralMoves(board: Board, startSquare: Square){

        let moves = new Array(0);

        //horizontal
        moves = moves.concat(this.checkForMovesAlongLine(board, startSquare, Direction.POSITIVE, Direction.NEITHER));
        moves = moves.concat(this.checkForMovesAlongLine(board, startSquare, Direction.NEGATIVE, Direction.NEITHER));
        //vertical
        moves = moves.concat(this.checkForMovesAlongLine(board, startSquare, Direction.NEITHER, Direction.POSITIVE));
        moves = moves.concat(this.checkForMovesAlongLine(board, startSquare, Direction.NEITHER, Direction.NEGATIVE));

        return moves;
    }


}
