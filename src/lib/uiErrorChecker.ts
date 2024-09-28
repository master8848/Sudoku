import type { ISudoku } from '$lib';

/**
 * Checks a given Sudoku grid (9x9 or 16x16) for errors and updates cells with the error status.
 * @param grid The Sudoku grid to check.
 * @param size The size of the Sudoku grid (9 or 16).
 */
export function checkSudokuErrors(grid: ISudoku, size: 9 | 16): void {
	// Clear previous error markings
	grid.forEach((row) => row.forEach((cell) => (cell.error = undefined)));

	// Check rows for duplicates
	for (let row = 0; row < size; row++) {
		checkDuplicatesInRow(grid, row, size);
	}

	// Check columns for duplicates
	for (let col = 0; col < size; col++) {
		checkDuplicatesInColumn(grid, col, size);
	}

	// Check subgrids (3x3 for 9x9 and 4x4 for 16x16)
	const boxSize = Math.sqrt(size); // 3 for 9x9, 4 for 16x16
	for (let boxRow = 0; boxRow < size; boxRow += boxSize) {
		for (let boxCol = 0; boxCol < size; boxCol += boxSize) {
			checkDuplicatesInBox(grid, boxRow, boxCol, boxSize);
		}
	}
}

/**
 * Check for duplicates in a row and mark the cells with errors.
 * @param grid The Sudoku grid.
 * @param row The row to check.
 * @param size The size of the grid (9 or 16).
 */
function checkDuplicatesInRow(grid: ISudoku, row: number, size: number) {
	const seen: { [key: number]: number[] } = {}; // Store the number and its column index

	for (let col = 0; col < size; col++) {
		const value = grid[row][col].value;
		if (value !== undefined) {
			if (!seen[value]) {
				seen[value] = [col];
			} else {
				seen[value].push(col);
				// Mark all cells with the same value as errors
				seen[value].forEach((duplicateCol) => (grid[row][duplicateCol].error = true));
			}
		}
	}
}

/**
 * Check for duplicates in a column and mark the cells with errors.
 * @param grid The Sudoku grid.
 * @param col The column to check.
 * @param size The size of the grid (9 or 16).
 */
function checkDuplicatesInColumn(grid: ISudoku, col: number, size: number) {
	const seen: { [key: number]: number[] } = {}; // Store the number and its row index

	for (let row = 0; row < size; row++) {
		const value = grid[row][col].value;
		if (value !== undefined) {
			if (!seen[value]) {
				seen[value] = [row];
			} else {
				seen[value].push(row);
				// Mark all cells with the same value as errors
				seen[value].forEach((duplicateRow) => (grid[duplicateRow][col].error = true));
			}
		}
	}
}

/**
 * Check for duplicates in a subgrid (3x3 or 4x4) and mark the cells with errors.
 * @param grid The Sudoku grid.
 * @param startRow The starting row of the subgrid.
 * @param startCol The starting column of the subgrid.
 * @param boxSize The size of the subgrid (3 for 9x9, 4 for 16x16).
 */
function checkDuplicatesInBox(grid: ISudoku, startRow: number, startCol: number, boxSize: number) {
	const seen: { [key: number]: [number, number][] } = {}; // Store the number and its (row, col) indices

	for (let row = 0; row < boxSize; row++) {
		for (let col = 0; col < boxSize; col++) {
			const currentRow = startRow + row;
			const currentCol = startCol + col;
			const value = grid[currentRow][currentCol].value;
			if (value !== undefined) {
				if (!seen[value]) {
					seen[value] = [[currentRow, currentCol]];
				} else {
					seen[value].push([currentRow, currentCol]);
					// Mark all cells with the same value as errors
					seen[value].forEach(([duplicateRow, duplicateCol]) => {
						grid[duplicateRow][duplicateCol].error = true;
					});
				}
			}
		}
	}
}

/**
 * Checks if a Sudoku grid is in a valid and complete state and which numbers have been used.
 * @param grid The Sudoku grid to check.
 * @param size The size of the grid (9 for 9x9 or 16 for 16x16).
 * @returns An object containing the completeness, validity, and used numbers of the grid.
 */
export function checkSudokuState(grid: ISudoku, size: 9 | 16) {
	const usedNumbers: number[] = [];

	const isComplete =
		checkRows(grid, size, usedNumbers) && checkColumns(grid, size) && checkSubgrids(grid, size);

	const isValid = !grid.some((row) => row.some((cell) => cell.error));
grid.forEach((row)=>row.forEach(({value})=>{

  if (value !== undefined) {
    if (typeof usedNumbers[value] !== 'number') usedNumbers[value] = 0;
    usedNumbers[value]++;
  }
}))
	return {
		isComplete,
		isValid,
		usedNumbers: usedNumbers
	};
}

/**
 * Check if all rows are complete and contain all numbers from 1 to size.
 * Also track used numbers in the `usedNumbers` set.
 * @param grid The Sudoku grid.
 * @param size The size of the grid (9 or 16).
 * @param usedNumbers The set of used numbers.
 * @returns True if all rows are complete and valid, false otherwise.
 */
function checkRows(grid: ISudoku, size: number, usedNumbers: number[]): boolean {
	for (let row = 0; row < size; row++) {
		const rowValues = new Set<number>();

		for (let col = 0; col < size; col++) {
			const cellValue = grid[row][col].value;

	

			if (!cellValue || cellValue < 1 || cellValue > size || rowValues.has(cellValue)) {
				return false; // Incomplete row or duplicate values
			}
			rowValues.add(cellValue);
		}
	}
	return true;
}

/**
 * Check if all columns are complete and contain all numbers from 1 to size.
 * Also track used numbers in the `usedNumbers` set.
 * @param grid The Sudoku grid.
 * @param size The size of the grid (9 or 16).
 * @returns True if all columns are complete and valid, false otherwise.
 */
function checkColumns(grid: ISudoku, size: number): boolean {
	for (let col = 0; col < size; col++) {
		const colValues = new Set<number>();

		for (let row = 0; row < size; row++) {
			const cellValue = grid[row][col].value;

			if (!cellValue || cellValue < 1 || cellValue > size || colValues.has(cellValue)) {
				return false; // Incomplete column or duplicate values
			}
			colValues.add(cellValue);
		}
	}
	return true;
}

/**
 * Check if all subgrids (3x3 for 9x9, 4x4 for 16x16) are complete and valid.
 * Also track used numbers in the `usedNumbers` set.
 * @param grid The Sudoku grid.
 * @param size The size of the grid (9 or 16).
 * @returns True if all subgrids are complete and valid, false otherwise.
 */
function checkSubgrids(grid: ISudoku, size: number): boolean {
	const boxSize = Math.sqrt(size); // 3 for 9x9, 4 for 16x16

	for (let boxRow = 0; boxRow < size; boxRow += boxSize) {
		for (let boxCol = 0; boxCol < size; boxCol += boxSize) {
			const subgridValues = new Set<number>();

			for (let row = 0; row < boxSize; row++) {
				for (let col = 0; col < boxSize; col++) {
					const currentRow = boxRow + row;
					const currentCol = boxCol + col;
					const cellValue = grid[currentRow][currentCol].value;

					if (!cellValue || cellValue < 1 || cellValue > size || subgridValues.has(cellValue)) {
						return false; // Incomplete or duplicate values in the subgrid
					}
					subgridValues.add(cellValue);
				}
			}
		}
	}
	return true;
}
