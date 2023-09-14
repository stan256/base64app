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

    export let title: string
    export let textFieldLabel: string
    export let mode: Mode

    let transformations = writable<Transform[]>([])
    let textareaValue = ""
    let canSave: boolean
    let transformed: string

    $: {
        if (mode === Mode.Encode) {
            transformed = Base64.encode(textareaValue)
            canSave = true
        } else {
            try {
                transformed = Base64.decode(textareaValue)
                canSave = true
            } catch (e) {
                // ignored ...
                canSave = false
            }
        }
    }

    function switchMode() {
        if (mode === Mode.Encode) goto(`/decode`)
        else goto(`/encode`)
    }

    function formatIfJson(str: string) {
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

    function clearHistory() {
        transformations.update(prev => [])
        localStorage.setItem('transformations', JSON.stringify([]))
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

<div class="body-content">
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
            <h1>{title}</h1>
            <p class="overflow-break-anywhere">{transformed}
                <CopyButton value={transformed}/>
            </p>
            <Textfield class="textarea"
                       textarea bind:value={textareaValue}
                       label={textFieldLabel}></Textfield>
            <p>
                <Button on:click={addNew} touch variant="raised" disabled={textareaValue.length === 0 || !canSave}>
                    <Label>Save result</Label>
                </Button>
            </p>
            <p>
                <Button on:click={clearHistory} touch variant="raised" disabled={$transformations.length === 0}>
                    <Label>Clear history</Label>
                </Button>
            </p>
        </Cell>
        <Cell span={6} align="top">
            <h1>History</h1>
            <!-- todo - save with note -->
            <!-- todo command + enter => hotkey translate    -->
            {#each $transformations as conversion, i}
                <div class="card overflow-break-anywhere">
                    <Card style="box-shadow: none; border: 2px solid #411681">
                        <Content>
                            <div class="flex-vertical-center" style="overflow: auto">
                                <Icon class="material-icons">text_fields</Icon>
                                <pre><code class="overflow-break-anywhere" contenteditable="true"
                                           bind:textContent={conversion.text}></code></pre>
                                <CopyButton value={conversion.text}/>
                            </div>
                        </Content>
                        <span class="separator"/>
                        <Content>
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

<style lang="scss">
  .card {
    &:not(:first-child) {
      margin-top: 25px;
    }
  }

  .body-content :global(.textarea) {
    width: 100%;
  }

  .switch {
    margin-left: 10px;
  }
</style>