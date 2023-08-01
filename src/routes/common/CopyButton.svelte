<script lang="ts">
    import IconButton from '@smui/icon-button'
    import Icon from "@smui/textfield/icon";

    export let value: String

    const copy = () => {
        if (value) {
            navigator.clipboard.writeText(value)
        }
    }

</script>


{#if value}
    <IconButton on:click={copy}>
        <Icon class="material-icons">content_copy</Icon>
    </IconButton>
{/if}
