<script lang="ts">
	import { encode8b10b, type Encode8b10bResult } from "$lib/8b10bEncoder"
	import { formatValue, parseValue } from "$lib/utils"
	import Waveform from "./Waveform.svelte"

	let control = false
	let RD = -1
	let octetInput = ""
	$: octet = parseValue(octetInput, activeTab)

	let result: Encode8b10bResult | null = null

	function runEncode() {
		try {
			result = encode8b10b(octet, control, RD)
		} catch {
			result = null
		}
	}

	const tabs = ["Decimal", "Binary", "Hexadecimal"]
	let activeTab = tabs[2]

	function changeTab(newTab: string) {
		if (octetInput != "")
			octetInput = formatValue(parseValue(octetInput, activeTab), newTab)
		activeTab = newTab
	}

	function calculateBinaryLength(value: string, activeTab: string) {
		const binary = formatValue(parseValue(value, activeTab), "Binary")
		return binary !== "NaN" ? binary.length : 0
	}

	function isValidOctet(octet: number) {
		return !isNaN(octet) && octet >= 0 && octet <= 255
	}

	$: if (
		octetInput !== "" &&
		!isNaN(octet) &&
		RD !== null &&
		control !== null
	) {
		runEncode()
	} else {
		result = null
	}

	$: octetError = octetInput !== "" && !isValidOctet(octet)
	$: binaryLength = calculateBinaryLength(octetInput, activeTab)
</script>

<div class="p-6">
	<h1 class="pb-2 text-xl">Encode</h1>
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
			<label class="label" for="octet-input">
				<span class="label-text">8-bit Octet:</span>
			</label>
			<button
				type="button"
				class="btn btn-xs btn-soft ml-auto"
				on:click={() => (octetInput = "")}
			>
				Clear
			</button>
		</div>
		<label class="input w-full" class:input-error={octetError}>
			<input type="text" id="octet-input" bind:value={octetInput} />
			<span class="badge badge-ghost badge-xs" title="Binary size">
				{binaryLength}
			</span>
		</label>
	</div>
	<div class="form-control mb-4">
		<label class="label w-full flex">
			<span class="label-text">Running Disparity (RD):</span>
			<div class="flex w-full gap-2">
				<button
					type="button"
					class="btn btn-soft btn-outline flex-1"
					class:btn-primary={RD === -1}
					on:click={() => (RD = -1)}
				>
					-1
				</button>
				<button
					type="button"
					class="btn btn-soft btn-outline flex-1"
					on:click={() => (RD = 1)}
				>
					1
				</button>
			</div>
		</label>
	</div>
	<div class="form-control mb-4">
		<label class="cursor-pointer label">
			<span class="label-text">Control:</span>
			<input type="checkbox" class="checkbox" bind:checked={control} />
		</label>
	</div>

	{#if result && !octetError}
		<div class="mockup-code bg-base-200 mt-4">
			<div class="px-4">
				<div>
					<span class="font-bold">sixBitCode:</span>
					{formatValue(result.sixBitCode, activeTab, 6)}
				</div>
				<div>
					<span class="font-bold">fourBitCode:</span>
					{formatValue(result.fourBitCode, activeTab, 4)}
				</div>
				<div>
					<span class="font-bold">symbol:</span>
					{#if activeTab === "Binary"}
						<span class="mr-1"
							>{formatValue(result.sixBitCode, activeTab, 6)}</span
						><span>{formatValue(result.fourBitCode, activeTab, 4)}</span>
					{:else}
						{formatValue(result.symbol, activeTab, 6)}
					{/if}
				</div>
				<div>
					<span class="font-bold">RD:</span>
					{result.RD}
				</div>
			</div>
		</div>

		<div class="mt-4">
			<Waveform value={result.symbol} binarySize={10} />
		</div>
	{/if}
</div>
