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
        <h1>Encode to Base64</h1>
        <p class="output">{base64LastValue}</p>
        <Textfield style="width: 100%;"
                   textarea bind:value={lastValue}
                   label="Text"></Textfield>
        <p>
            <Button on:click={addNew} touch variant="raised" disabled={lastValue.length === 0}>
                <Label>Save result</Label>
            </Button>
            <!-- todo - save with note -->
        </p>
    </Cell>
    <Cell span={6} align="middle">
        <!--        todo to like options (to put them in the top) -->
        {#each conversions as conversion, i}
            <div  class="card">
            <Card>
                <Content>
                    <div>{conversion.text}</div>
                    <div>{conversion.base64}</div>
                </Content>
            </Card>
            </div>
        {/each}
    </Cell>
</LayoutGrid>


<script lang="ts">
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import Textfield from '@smui/textfield';
    import {Base64} from 'js-base64';
    import Card, {Content} from '@smui/card';
    import Button, {Label} from '@smui/button';

    let conversions: Conversion[] = [];

    let lastValue = "text"
    $: base64LastValue = Base64.encode(lastValue)

    function addNew() {
        if (lastValue.length != 0) {
            conversions = [...conversions, {
                saved: Date.now(),
                base64: base64LastValue,
                text: lastValue
            }]
            lastValue = ""
        }
    }

    interface Conversion {
        saved: number
        base64: string
        text: string
    }
</script>