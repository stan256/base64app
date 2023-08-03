<script lang="ts">
    import LayoutGrid, {Cell} from '@smui/layout-grid'
    import Textfield from '@smui/textfield'
    import {Base64} from 'js-base64'
    import Card, {Content} from '@smui/card'
    import Button, {Label} from '@smui/button'
    import type {Transform} from "./types"
    import {Mode} from "./types"
    import CopyButton from "./common/CopyButton.svelte"
    import Icon from "@smui/textfield/icon"
    import {goto} from "$app/navigation"
    import {onMount} from 'svelte'
    import {writable} from 'svelte/store'

    export let title: String
    export let textFieldLabel: String
    export let mode: Mode

    let transformations = writable<Transform[]>([])
    let textareaValue = ""
    let transformed
    $: {
        if (mode === Mode.Encode)
            transformed = Base64.encode(textareaValue)
        else
            transformed = Base64.decode(textareaValue)
    }

    function switchMode() {
        if (mode === Mode.Encode) goto("/decode")
        else goto("/encode")
    }

    function formatIfJson(str: String) {
        try {
            return JSON.stringify(JSON.parse(str), null, 2)
        } catch (e) {
            return str
        }
    }

    function addNew() {
        if (textareaValue.length != 0) {
            transformations.update(prev => {
                prev.unshift({
                    saved: Date.now(),
                    base64: mode === Mode.Encode ? transformed : formatIfJson(textareaValue),
                    text: mode === Mode.Encode ? formatIfJson(textareaValue) : transformed
                })
                return prev
            })
        }

        localStorage.setItem('transformations', JSON.stringify($transformations))

        textareaValue = ""
    }

    onMount(() => {
        transformations.update(prev => {
            let items = JSON.parse(localStorage.getItem("transformations") || "[]");
            if (items.length > 0) {
                prev.unshift(...items)
            }
            return prev
        })
    })
</script>

<div>
    <div class="flex-vertical-center flex-horizontal-center">
        <h3 class="inline-block">
            {#if mode === Mode.Encode} Encode{:else} Decode{/if}
        </h3>
        <label class="switch">
            <input type="checkbox" checked={mode === Mode.Encode} on:click={switchMode}>
            <span class="slider round"></span>
        </label>
    </div>
    <LayoutGrid>
        <Cell span={6} align="top">
            <h2>{title}</h2>
            <p class="overflow-break-anywhere">{transformed}
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
        <Cell span={6} align="top">
            <h2>History</h2>
            <!-- todo - save with note -->
            <!-- todo incorrect decoded base64 message      -->
            <!-- todo command + enter => hotkey translate    -->
            <!-- todo check Svelte state instead of cookies -->
            {#each $transformations as conversion, i}
                <div class="card overflow-break-anywhere">
                    <Card>
                        <Content>
                            <div class="flex-vertical-center">
                                <Icon class="material-icons">text_fields</Icon>
                                <pre><code class="overflow-break-anywhere" contenteditable="true"
                                           bind:innerHTML={conversion.text}></code></pre>
                                <CopyButton value={conversion.text}/>
                            </div>
                            <div class="flex-vertical-center">
                                <Icon class="material-icons">data_object</Icon>
                                <span class="overflow-break-anywhere"
                                      style="white-space: pre-line">{conversion.base64}</span>
                                <CopyButton value={conversion.base64}/>
                            </div>
                        </Content>
                    </Card>
                </div>
            {/each}
        </Cell>
    </LayoutGrid>
</div>

<style>
    .card {
        margin-top: 15px;
    }

    .switch {
        margin-left: 10px;
    }
</style>