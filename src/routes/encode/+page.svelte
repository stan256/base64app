<script>
    import EditorTemplate from "../EditorTemplate.svelte"
    import {Mode} from "../types"
</script>

<EditorTemplate
        title={"Encode to Base64"}
        textFieldLabel="Text"
        mode={Mode.Encode}
></EditorTemplate>

<svelte:head>
    <title>Base64 Decoder</title>
    <meta name="description" content="Decode base64 text and effortlessly store results in your browsing history with this handy tool.">
    <html lang="en"></html>
</svelte:head>