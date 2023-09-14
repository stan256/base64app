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
    <meta name="description" content="Effortlessly encode text to base64 and store results in your browsing history with this handy tool.">
    <html lang="en"></html>
</svelte:head>