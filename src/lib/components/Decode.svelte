<script lang="ts">
	import {
		decode8b10b,
		isControlChar,
		type Decode8b10bResult,
	} from "$lib/8b10bDecoder"
	import { formatValue, parseValue } from "$lib/utils"
	import Waveform from "./Waveform.svelte"

	let symbolInput = ""
	let RD = -1
	$: symbol = parseValue(symbolInput, activeTab)

	let result: Decode8b10bResult | null = null

	function runDecode() {
		result = decode8b10b(symbol)
	}

	const tabs = ["Decimal", "Binary", "Hexadecimal"]
	let activeTab = tabs[2]

	function changeTab(newTab: string) {
		if (symbolInput != "")
			symbolInput = formatValue(parseValue(symbolInput, activeTab), newTab)
		activeTab = newTab
	}

	function calculateBinaryLength(value: string, activeTab: string) {
		const binary = formatValue(parseValue(value, activeTab), "Binary")
		return binary !== "NaN" ? binary.length : 0
	}

	$: if (symbolInput !== "" && !isNaN(symbol) && RD !== null) {
		runDecode()
	} else {
		result = null
	}
	$: symbolError =
		symbolInput !== "" && (isNaN(symbol) || symbol < 0 || symbol > 4095)

	$: binaryLength = calculateBinaryLength(symbolInput, activeTab)
</script>

<div class="p-6">
	<h1 class="pb-2 text-xl">Decode</h1>
	<div class="tabs tabs-box">
		{#each tabs as tab}
			<button
				class="tab tab-bordered {tab === activeTab ? 'tab-active' : ''}"
				on:click={() => changeTab(tab)}
			>
				{tab}
			</button>
		{/each}
	</div>

	<div class="form-control mb-4 mt-1">
		<div class="flex mb-1">
			<label class="label" for="symbol-input">
				<span class="label-text">10-bit Symbol:</span>
			</label>
			<button
				type="button"
				class="btn btn-xs btn-soft ml-auto"
				on:click={() => (symbolInput = "")}
			>
				Clear
			</button>
		</div>
		<label class="input w-full" class:input-error={symbolError}>
			<input type="text" id="symbol-input" bind:value={symbolInput} />
			<span class="badge badge-ghost badge-xs" title="Binary size">
				{binaryLength}
			</span>
		</label>
	</div>

	<div class="mb-4 h-10"></div>
	<div class="mb-4 h-6"></div>

	{#if result && !symbolError}
		<div class="mockup-code bg-base-200 mt-4">
			<div class="px-4">
				<div>
					<span class="font-bold">octet:</span>
					{#if result.octet === null}
						error
					{:else}
						{formatValue(result.octet, activeTab, 8)}
						{` ${isControlChar(result.octet)}`}
					{/if}
				</div>
				<div>
					<span class="font-bold">RD:</span>
					{result.RD}
				</div>
				<div>
					<span class="font-bold">Control:</span>
					{result.control}
				</div>
			</div>
		</div>

		<div class="mb-4 h-4"></div>

		{#if result.octet !== null}
			<div class="mt-4">
				<Waveform value={result.octet} binarySize={8} />
			</div>
		{/if}
	{/if}
</div>
