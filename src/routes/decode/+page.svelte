<script>
    import EditorTemplate from "../EditorTemplate.svelte"
    import {Mode} from "../types"
</script>

<EditorTemplate
        title={"Decode from Base64"}
        textFieldLabel="Base64"
        mode={Mode.Decode}
></EditorTemplate>

<svelte:head>
    <title>Base64 Decoder</title>
</svelte:head>