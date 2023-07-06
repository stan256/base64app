<h1>Encode to Base64</h1>
<textarea bind:value={lastValue}></textarea>
<p>{base64LastValue}</p>

{#each conversions as conversion, i}
    <div>{i}</div>
    <div>{conversion.text}</div>
    <div>{conversion.base64}</div>
    <div></div>
{/each}


<button on:click={addNew}>Add new</button>

<script lang="ts">
    const conversions: Conversion[] = [];

    let lastValue = "text"
    $: base64LastValue = btoa(lastValue)

    function addNew() {
        conversions.push({
            base64: base64LastValue,
            text: lastValue
        })
        lastValue = ""
    }

    interface Conversion {
        base64: string
        text: string
    }
</script>