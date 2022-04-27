import Piece from './piece';
import Board from "../board";
import Player from "../player";
import Square from "../square";

export default class Rook extends Piece {
    constructor(player: Player) {
        super(player);
    }

    getAvailableMoves(board: Board) {
        const moves = new Array(0);

        const currentSquare = board.findPiece(this);

        //iterate through rows (travel down column)
        for(let i = 0; i < board.getHeight(); i++){
            if(i === currentSquare.row){
                continue;
            }
            moves.push(new Square(i, currentSquare.col));
        }

        //iterate through columns (travel down row)
        for(let i = 0; i < board.getWidth(); i++){
            if(i === currentSquare.col){
                continue;
            }
            moves.push(new Square(currentSquare.row, i));
        }

        return moves;

    }
}
