// place files you want to import through the `$lib` alias in this folder.

export function isValidSudoku(board: string[][], size: number, boxSize: number): boolean {
    let countArray = new Array<number>(size + 1).fill(0);
    for (let i = 0; i < size; i++) {
        let r1 = Math.trunc(i / boxSize) * boxSize;
        let c1 = (i % boxSize) * boxSize;
        let currElement;
        countArray.fill(0);
        for (let j = 0; j < size; j++) {
            currElement = board[i][j];
            if (currElement == ".") continue;
            countArray[parseInt(currElement)]++;
            if (countArray[parseInt(currElement)] > 1) return false;
        }
        countArray.fill(0);
        for (let k = 0; k < size; k++) {
            currElement = board[k][i];
            if (currElement == ".") continue;
            countArray[parseInt(currElement)]++;
            if (countArray[parseInt(currElement)] > 1) return false;
        }
        countArray.fill(0);
        for (let r = r1; r < r1 + boxSize; r++) {
            for (let c = c1; c < c1 + boxSize; c++) {
                currElement = board[r][c];
                if (currElement == ".") continue;
                countArray[parseInt(currElement)]++;
                if (countArray[parseInt(currElement)] > 1) return false;
            }
        }
    }
    return true;
}
