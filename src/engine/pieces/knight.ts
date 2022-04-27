import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";
import PieceType from "./peiceType";

export default class Knight extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getPieceType(): PieceType{
        return PieceType.KNIGHT;
    }

    getAvailableMoves(board: Board) {

        const moves: Square[] = new Array(0);
        const currentSquare: Square = board.findPiece(this);

        for(let rowDelta = -2; rowDelta <= 2; rowDelta++){
            for(let colDelta = -2; colDelta <= 2; colDelta++){

                //one should be size 1 and one should be size 2 (total move size of 3 steps)
                if(Math.abs(rowDelta) + Math.abs(colDelta) !== 3){
                    continue;
                }

                const destinationSquare = new Square(currentSquare.row + rowDelta, currentSquare.col + colDelta);

                if(!board.isInBoard(destinationSquare)){
                    continue;
                }

                const destinationPiece = board.getPiece(destinationSquare);

                //cannot take friendly pieces
                if(destinationPiece && destinationPiece.player === this.player){
                    continue;
                }

                //cannot take king
                if(destinationPiece && destinationPiece.getPieceType() === PieceType.KING){
                    continue;
                }

                moves.push(destinationSquare);
            }
        }

        return moves;
    }


}
