<script lang="ts">
	// Dummy encode8b10b function for demonstration. Replace with your actual implementation.
	function encode8b10b(octet: number, control: boolean, RD?: number) {
	  // Example output, replace with real logic
	  return {
		sixBitCode: octet & 0x3F,
		fourBitCode: (octet >> 6) & 0x0F,
		symbol: octet ^ (control ? 0xFF : 0x00),
		RD: RD ?? 0
	  };
	}
  
	let octet = 0;
	let control = false;
	let RD: number | undefined = undefined;
  
	let result: {
	  sixBitCode: number;
	  fourBitCode: number;
	  symbol: number;
	  RD: number;
	} | null = null;
  
	function runEncode() {
	  result = encode8b10b(octet, control, RD);
	}
  </script>
  
  <div class="p-6 max-w-md mx-auto">
	<div class="form-control mb-4">
	  <label class="label">
		<span class="label-text">Octet (0-255)</span>
	  </label>
	  <input
		type="number"
		min="0"
		max="255"
		class="input input-bordered"
		bind:value={octet}
	  />
	</div>
	<div class="form-control mb-4">
	  <label class="cursor-pointer label">
		<span class="label-text">Control</span>
		<input
		  type="checkbox"
		  class="checkbox"
		  bind:checked={control}
		/>
	  </label>
	</div>
	<div class="form-control mb-4">
	  <label class="label">
		<span class="label-text">Running Disparity (RD, optional)</span>
	  </label>
	  <input
		type="number"
		class="input input-bordered"
		bind:value={RD}
		placeholder="Leave empty for default"
	  />
	</div>
	<button class="btn btn-primary w-full mb-4" on:click={runEncode}>
	  Run encode8b10b
	</button>
  
	{#if result}
	  <div class="mockup-code bg-base-200 p-4">
		<div><span class="font-bold">sixBitCode:</span> {result.sixBitCode}</div>
		<div><span class="font-bold">fourBitCode:</span> {result.fourBitCode}</div>
		<div><span class="font-bold">symbol:</span> {result.symbol}</div>
		<div><span class="font-bold">RD:</span> {result.RD}</div>
	  </div>
	{/if}
  </div>