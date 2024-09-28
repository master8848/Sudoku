<!-- <script>
	import clsx from "clsx";

    let grid = Array(14).fill().map(() => Array(14).fill(''));
  </script>
  
 <style>
  .grid-cols-14 {
    grid-template-columns: repeat(14, minmax(0, 1fr));
  }
 </style>
  
  <div class="grid grid-cols-14 gap-1 ">
    {#each grid as row, rowIndex}
      {#each row as cell, colIndex}
        <input
          type="text"
          class={clsx( "w-14 h-14 text-center  border",{

          })}
          bind:value={grid[rowIndex][colIndex]}
          maxlength="1"
        />
      {/each}
    {/each}
  </div>
   -->
<!-- <script lang="ts">
	// Initialize a 16x16 grid with 14 pre-filled cells (sample data)
	let board = [
		[1, '', '', '', '', '', 5, '', '', 2, '', '', '', '', '', ''],
		['', 3, '', '', '', '', '', '', '', '', 4, '', '', '', '', ''],
		['', '', 7, '', '', '', '', 6, '', '', '', '', '', 8, '', ''],
		['', '', '', '', '', '', '', '', 9, '', '', 4, '', '', '', ''],
		['', '', '', 2, '', '', '', '', '', '', '', '', '', '', 7, ''],
		['', '', '', '', 6, '', '', '', '', 1, '', '', '', '', '', ''],
		['', '', '', '', '', 8, '', '', '', '', '', 3, '', '', '', ''],
		[6, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 9],
		['', '', '', '', 5, '', '', '', '', '', 1, '', '', '', '', ''],
		['', '', '', '', '', '', 7, '', '', 9, '', '', '', '', '', ''],
		['', '', '', 4, '', '', '', '', '', '', '', '', '', '', 2, ''],
		['', '', 1, '', '', '', '', 6, '', '', '', '', '', '', '', ''],
		['', 8, '', '', '', '', '', '', '', '', '', '', '', 4, '', ''],
		['', '', '', 5, '', '', '', '', '', '', '', '', '', '', 3, ''],
		['', '', '', '', '', '', '', '', 8, '', '', '', '', '', 7, ''],
		['', '', '', '', '', 3, '', '', '', '', '', '', '', '', '', 5]
	];

	// Function to update the cell value
	function updateCell(row: number, col: number, value: number | '') {
		if (value === '' || (value >= 1 && value <= 16)) {
			board[row][col] = value;
		}
	}

	// Function to check if the board is solved (optional validation)
	function checkSolution() {
		// Placeholder function to check if the board is solved correctly
		alert('Solution checked! Implement your validation logic here.');
	}
</script>

<div class="flex flex-col items-center justify-center mt-10">
	<div class="grid grid-cols-16 gap-1 border-4 border-gray-700 p-2">
		{#each board as row, rowIndex}
			{#each row as cell, colIndex}
				<input
					type="number"
					min="1"
					max="16"
					bind:value={board[rowIndex][colIndex]}
					on:input={(e) => {
						if (e.currentTarget.value === 'e') {
							updateCell(rowIndex, colIndex, '');
							return;
						}
						const value = +e.currentTarget.value;

						updateCell(rowIndex, colIndex, isNaN(value) ? '' : value);
					}}
					maxlength="2"
					class="w-10 h-10 text-center border border-gray-500 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				
			{/each}
		{/each}
	</div>

	<button on:click={checkSolution} class="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
		Check Solution
	</button>
</div>

<style>
	:global(
			input[type='number']::-webkit-outer-spin-button,
			input[type='number']::-webkit-inner-spin-button
		) {
		/* Hide the arrow buttons in Chrome, Safari, Edge, and Opera */

		-webkit-appearance: none;
		margin: 0;
	}

	/* Hide the arrow buttons in Firefox */
	:global(input[type='number']) {
		-moz-appearance: textfield;
	}

	.grid-cols-16 {
		grid-template-columns: repeat(16, minmax(0, 1fr));
	}
	.grid {
		max-width: 700px;
	}
</style> -->

<script>
	let sudoku = Array(9).fill().map(() => Array(9).fill(''));
  </script>
  
  <style>
	.sudoku-grid {
	  display: grid;
	  grid-template-columns: repeat(9, 1fr);
	  gap: 1px;
	}
	.cell {
	  width: 40px;
	  height: 40px;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  font-size: 1.25rem;
	}
	.group-border {
	  border: 2px solid black;
	}
	.normal-border {
	  border: 1px solid gray;
	}
  </style>
  
  <div class="sudoku-grid">
	{#each sudoku as row, rowIndex}
	  {#each row as cell, colIndex}
		<div class="cell {rowIndex % 3 === 0 && colIndex % 3 === 0 ? 'group-border' : 'normal-border'}">
		  {cell}
		</div>
	  {/each}
	{/each}
  </div>
  
