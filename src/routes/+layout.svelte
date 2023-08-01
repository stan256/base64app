<script lang="ts">
    import '../theme/app.scss'
    import LayoutGrid, {Cell} from "@smui/layout-grid";
</script>


<LayoutGrid>
    <Cell span={2}/>
    <Cell span={8}>
        <slot/>
    </Cell>
</LayoutGrid>