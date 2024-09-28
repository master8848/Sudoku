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
export type ISudoku = {
    value?: number
    base:boolean;
    error?:true

}[][];

export function generateSudokuForUi(elo: number = 1200,size: 9 | 16 = 9, ): ISudoku {
  
    return [
        [
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "value": 5,
                "base": true
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "base": false
            }
        ],
        [
            {
                "value": 4,
                "base": true
            },
            {
                "value": 5,
                "base": true
            },
            {
                "base": false
            },
            {
                "value": 7,
                "base": true
            },
            {
                "value": 8,
                "base": true
            },
            {
                "value": 9,
                "base": true
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "value": 3,
                "base": true
            }
        ],
        [
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "value": 9,
                "base": true
            },
            {
                "value": 1,
                "base": true
            },
            {
                "value": 2,
                "base": true
            },
            {
                "value": 3,
                "base": true
            },
            {
                "value": 4,
                "base": true
            },
            {
                "value": 5,
                "base": true
            },
            {
                "base": false
            }
        ],
        [
            {
                "value": 2,
                "base": true
            },
            {
                "value": 1,
                "base": true
            },
            {
                "base": false
            },
            {
                "value": 3,
                "base": true
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "value": 9,
                "base": true
            },
            {
                "value": 7,
                "base": true
            }
        ],
        [
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "value": 8,
                "base": true
            },
            {
                "base": false
            },
            {
                "value": 7,
                "base": true
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "base": false
            }
        ],
        [
            {
                "value": 8,
                "base": true
            },
            {
                "value": 9,
                "base": true
            },
            {
                "value": 7,
                "base": true
            },
            {
                "base": false
            },
            {
                "value": 1,
                "base": true
            },
            {
                "value": 4,
                "base": true
            },
            {
                "value": 3,
                "base": true
            },
            {
                "value": 6,
                "base": true
            },
            {
                "value": 5,
                "base": true
            }
        ],
        [
            {
                "value": 5,
                "base": true
            },
            {
                "base": false
            },
            {
                "value": 1,
                "base": true
            },
            {
                "base": false
            },
            {
                "value": 4,
                "base": true
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "value": 7,
                "base": true
            },
            {
                "base": false
            }
        ],
        [
            {
                "value": 6,
                "base": true
            },
            {
                "base": false
            },
            {
                "value": 2,
                "base": true
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "value": 5,
                "base": true
            },
            {
                "value": 3,
                "base": true
            },
            {
                "value": 1,
                "base": true
            }
        ],
        [
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "base": false
            },
            {
                "value": 5,
                "base": true
            },
            {
                "value": 3,
                "base": true
            },
            {
                "base": false
            },
            {
                "value": 6,
                "base": true
            },
            {
                "base": false
            },
            {
                "base": false
            }
        ]
    ]
    // const grid: Grid = generateSudoku(size, elo);

    // const sudoku:ISudoku=grid.map(row=>row.map(cell=>{
    //     return {
    //         value:cell||undefined,
    //         base:cell!==0
    //     }
    // }))
    // console.log(sudoku)
    // return sudoku
}

type Grid = number[][];

/**
 * Generate a Sudoku game with given size and difficulty (ELO-based).
 * @param size The size of the grid (e.g., 9 for 9x9, 16 for 16x16).
 * @param elo The ELO rating to determine the difficulty.
 * @returns A partially filled Sudoku grid based on the difficulty.
 */
export function generateSudoku(size: 9 | 16 = 9, elo: number = 1200): Grid {
    const grid: Grid = createEmptyGrid(size);
    const solution = solveSudoku(grid, size);

    const cluesCount = determineClueCount(size, elo);
    return removeCells(solution, cluesCount);
}

/**
 * Create an empty Sudoku grid of the given size.
 * @param size The size of the grid (e.g., 9 for 9x9, 16 for 16x16).
 * @returns An empty Sudoku grid.
 */
function createEmptyGrid(size: number): Grid {
    return Array.from({ length: size }, () => Array(size).fill(0));
}

/**
 * Solve the Sudoku grid using backtracking.
 * @param grid The Sudoku grid.
 * @param size The size of the grid.
 * @returns A fully solved Sudoku grid.
 */
function solveSudoku(grid: Grid, size: number): Grid {
    // Simple backtracking algorithm to solve the grid
    const isSafe = (row: number, col: number, num: number): boolean => {
        // Check if num is safe in the current row, column, and box
        return isRowSafe(grid, row, num, size) && isColSafe(grid, col, num, size) && isBoxSafe(grid, row, col, num, size);
    };

    const solve = (): boolean => {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= size; num++) {
                        if (isSafe(row, col, num)) {
                            grid[row][col] = num;
                            if (solve()) {
                                return true;
                            }
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    solve();
    return grid;
}

/**
 * Determine the number of clues to leave based on the ELO rating.
 * @param size The size of the grid (e.g., 9x9, 16x16).
 * @param elo The ELO rating for difficulty.
 * @returns The number of cells to pre-fill as clues.
 */
function determineClueCount(size: number, elo: number): number {
    const totalCells = size * size;
    const maxClues = Math.floor(totalCells * 0.5); // Max 50% cells filled for the easiest level
    const minClues = Math.floor(totalCells * 0.2); // Min 20% cells filled for the hardest level

    const difficultyFactor = Math.min(1, Math.max(0, (elo - 1000) / 1000)); // Scale ELO (1000 to 2000)
    return Math.floor(maxClues - (maxClues - minClues) * difficultyFactor);
}

/**
 * Remove cells from a solved Sudoku grid based on the number of clues.
 * @param grid The fully solved Sudoku grid.
 * @param clues The number of cells to leave as clues.
 * @returns The Sudoku grid with clues and empty cells.
 */
function removeCells(grid: Grid, clues: number): Grid {
    const size = grid.length;
    const totalCells = size * size;
    const cellsToRemove = totalCells - clues;

    const gridCopy = grid.map(row => row.slice());
    let removed = 0;

    while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (gridCopy[row][col] !== 0) {
            gridCopy[row][col] = 0;
            removed++;
        }
    }

    return gridCopy;
}

/**
 * Check if a number can be placed in the given row safely.
 */
function isRowSafe(grid: Grid, row: number, num: number, size: number): boolean {
    return grid[row].indexOf(num) === -1;
}

/**
 * Check if a number can be placed in the given column safely.
 */
function isColSafe(grid: Grid, col: number, num: number, size: number): boolean {
    return !grid.some(row => row[col] === num);
}

/**
 * Check if a number can be placed in the given 3x3 or 4x4 box safely.
 */
function isBoxSafe(grid: Grid, row: number, col: number, num: number, size: number): boolean {
    const boxSize = Math.sqrt(size);
    const boxRowStart = Math.floor(row / boxSize) * boxSize;
    const boxColStart = Math.floor(col / boxSize) * boxSize;

    for (let i = 0; i < boxSize; i++) {
        for (let j = 0; j < boxSize; j++) {
            if (grid[boxRowStart + i][boxColStart + j] === num) {
                return false;
            }
        }
    }
    return true;
}

