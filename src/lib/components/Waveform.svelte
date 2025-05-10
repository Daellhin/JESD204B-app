<script lang="ts">
	import { formatValue } from "$lib/utils"

	export let value: number
	export let binarySize: number
</script>

<h2 class="">Waveform {binarySize} bit:</h2>

<div class="flex gap-0.5">
	{#each formatValue(value, "Binary", binarySize).split("") as bit, i}
		<div class="flex flex-col">
			<div class="h-7 flex items-end">
				<div
					class="w-4 h-2	 rounded-xs bg-blue-50 transition-[height] duration-200"
					class:bg-blue-400={bit === "1"}
					class:h-7={bit === "1"}
				></div>
			</div>
			<div class="m-auto text-gray-500 text-sm">{binarySize-i-1}</div>
		</div>
	{/each}
</div>
