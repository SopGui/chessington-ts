import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import PieceType from "./peiceType";

export default class King extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getPieceType(): PieceType{
        return PieceType.KING;
    }

    addSquare(board: Board,startSquare: Square, xDelta: number, yDelta: number, moves: Square[]): void{

        const squareToAdd = new Square(startSquare.row + yDelta, startSquare.col + xDelta);
        if(board.isInBoard(squareToAdd)){
            moves.push(squareToAdd);
        }

    }

    getAvailableMoves(board: Board) {

        const currentSquare = board.findPiece(this);

        const moves: Square[] = new Array(0);

        for(let xDelta = -1; xDelta <= 1; xDelta++){
            for(let yDelta = -1; yDelta <= 1; yDelta++){

                if(xDelta !== 0 || yDelta !== 0){
                    this.addSquare(board, currentSquare, xDelta, yDelta, moves);
                }
            }

        }

        return moves;




    }
}
