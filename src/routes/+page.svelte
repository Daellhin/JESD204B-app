<script lang="ts">
	import Chars from "$lib/components/ControlCharsTable.svelte"
	import Encode from "$lib/components/Encode.svelte"
	import Decode from "$lib/components/Decode.svelte"
</script>



<div class="w-fit mx-auto">
	<h1 class="mb-4 text-3xl p-2">JESD204B helper</h1>
	<Chars></Chars>
</div>

<div class="flex row justify-center">
	<Encode></Encode>
	<Decode></Decode>
</div>
