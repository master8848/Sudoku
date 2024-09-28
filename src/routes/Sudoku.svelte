<script lang="ts">
	import { generateSudokuForUi } from '$lib';
	import { checkSudokuErrors, checkSudokuState } from '$lib/uiErrorChecker';
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	const PUZZLE_SIZE = 9;
	// Initialize a 9x9 Sudoku grid with empty strings
	let sudoku = generateSudokuForUi(5);
	let completed = false;
	let usedNumbers: number[] = [];
	let active: number | undefined = undefined;
	let highlight: number | undefined = undefined;
	const ABVIABLE_SIZE = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	function handleClick(i: number, j: number) {
		
		const current = sudoku[i][j];
		if (current === undefined) return;
		if(current.value){

			highlight=current.value
		}
		if (current.base) return;
		if (sudoku[i][j].value) {
			sudoku[i][j].value = undefined;
		} else {
			if (active === undefined) return;
			sudoku[i][j].value = active;
		}
		checkSudokuErrors(sudoku, PUZZLE_SIZE);

		const {
			isComplete,
			isValid,
			usedNumbers: tempUsedNumbers
		} = checkSudokuState(sudoku, PUZZLE_SIZE);

		usedNumbers = tempUsedNumbers;
		completed = isComplete && isValid;
	}
	onMount(() => {
		document.addEventListener('keydown', (e) => {
			const num = Number(e.key);

			if (num === 0) return;
			if (ABVIABLE_SIZE.includes(num)) {
				active = num;
			}
		});
	});
	
</script>

{#if completed}
	<div class="text-center text-2xl font-bold">
		<p>Congratulations! You have completed the Sudoku puzzle!</p>
	</div>
{:else}
	<div class="sudoku-grid">
		{#each sudoku as row, i}
			{#each row as cell, j}
				<button
					class={clsx(
						'sudoku-cell',
						cell.base ? 'text-gray-900 font-bold' : 'text-gray-700 font-thin',
						cell.error ? 'text-red-500' : ''
						,
						{'text-purple-500 underline':highlight===cell.value}
					)}
					tabindex="0"
					aria-disabled={cell.base}
					on:click={() => handleClick(i, j)}
				>
					{cell.value || ''}
				</button>
			{/each}
		{/each}
	</div>
	<div class="grid grid-cols-6 md:grid-cols-9 gap-4">
		{#each ABVIABLE_SIZE as size}
			<button
				class={clsx('p-2 border rounded-sm px-4 disabled:opacity-50 disabled:cursor-not-allowed', {
					'border-purple-900 text-purple-900': active === size
				})}
				tabindex="0"
				disabled={usedNumbers[size] === PUZZLE_SIZE}
				on:click={() => {
					active = size;
				}}>{size}</button
			>
		{/each}
	</div>
{/if}

<!-- 3*3=9*= -->

<style >
	/* Container for the 9x9 Sudoku grid */
	.sudoku-grid {
		@apply grid grid-cols-9 grid-rows-9 w-[450px] h-[450px] border-[3px]  border-green-800;
	}

	.sudoku-cell {
		@apply border-black w-[50px] h-[50px] text-center flex justify-center items-center text-xl border;
	}

	.sudoku-cell:nth-child(3n) {
		@apply border-r-[3px] border-r-green-800; 
	}

	.sudoku-cell:nth-child(9n) {
		@apply border-r-0;
	}

	.sudoku-cell:nth-child(-n + 27):nth-child(9n + 1) {
		@apply border-l-[3px] border-l-green-800;
	}

	.sudoku-grid > .sudoku-cell:nth-child(n + 19):nth-child(-n + 27) {
		@apply border-b-[3px] border-b-green-800;;
	}
	.sudoku-grid > .sudoku-cell:nth-child(n + 46):nth-child(-n + 54) {
		@apply border-b-[3px] border-b-green-800;;
	}

	.sudoku-cell:nth-child(n + 73) {
		@apply border-b-0;
	}
</style>
