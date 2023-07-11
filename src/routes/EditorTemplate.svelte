<style>
    .card {
        margin-top: 15px;
        overflow-wrap: break-word;
    }

    .output {
        overflow-wrap: break-word;
    }
</style>

<LayoutGrid>
    <Cell span={6} align="middle">
        <h1>{title}</h1>
        <p class="output">{transformed}
            <CopyButton value={transformed}/>
        </p>
        <Textfield style="width: 100%"
                   textarea bind:value={textareaValue}
                   label={textFieldLabel}></Textfield>
        <p>
            <Button on:click={addNew} touch variant="raised" disabled={textareaValue.length === 0}>
                <Label>Save result</Label>
            </Button>
        </p>
    </Cell>
    <Cell span={6} align="middle">
        <!-- todo code formatting -->
        <!-- todo - save with note -->
        <!-- todo to like options (to put them in the top) -->
        <!-- todo incorrect decoded base64 message -->
        {#each transformations as conversion, i}
            <div class="card">
                <Card>
                    <Content>
                        <div class="flex-vertical-center">
                            <Icon class="material-icons">text_fields</Icon>
                            <span>{formatIfJson(conversion.text)}</span>
                            <CopyButton value={conversion.text}/>
                        </div>
                        <div class="flex-vertical-center">
                            <Icon class="material-icons">data_object</Icon>
                            <span>{conversion.base64}</span>
                            <CopyButton value={conversion.base64}/>
                        </div>
                    </Content>
                </Card>
            </div>
        {/each}
    </Cell>
</LayoutGrid>


<script lang="ts">
    import LayoutGrid, {Cell} from '@smui/layout-grid'
    import Textfield from '@smui/textfield'
    import {Base64} from 'js-base64'
    import Card, {Content} from '@smui/card'
    import Button, {Label} from '@smui/button'
    import type {Transform} from "./types"
    import {Mode} from "./types"
    import CopyButton from "./common/CopyButton.svelte";
    import Icon from "@smui/textfield/icon";


    export let title: String
    export let textFieldLabel: String
    export let mode: Mode

    function formatIfJson(str: String) {
        if (isJsonString(str))
            return JSON.stringify(str, null, 2)
        else
            return str
    }

    function isJsonString(str: String) {
        try {
            JSON.parse(str)
        } catch (e) {
            return false
        }
        return true;
    }

    let transformations: Transform[] = [{
        saved: Date.now(),
        base64: "dGV4dA==",
        text: "text"
    }, {
        saved: Date.now(),
        base64: "dGV4dA==",
        text: "text"
    }]

    let textareaValue = ""
    let transformed
    $: {
        if (mode === Mode.Encode)
            transformed = Base64.encode(textareaValue)
        else
            transformed = Base64.decode(textareaValue)
    }

    function addNew() {
        if (textareaValue.length != 0) {
            transformations = [...transformations, {
                saved: Date.now(),
                base64: mode === Mode.Encode ? transformed : textareaValue,
                text: mode === Mode.Encode ? textareaValue : transformed
            }]
            textareaValue = ""
        }
    }
</script>