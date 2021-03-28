<template>
    <div class="qm-table">
        <a-table :data-source="data">
            <a-table-column key="age" title="Age" data-index="age" />
            <a-table-column key="address" title="Address" data-index="address" />
            <a-table-column key="action" title="Action">
                <template slot-scope="text, record">
                    <span>
                        <a>Action 一 {{ record.firstName }}</a>
                        <a>Delete</a>
                    </span>
                </template>
            </a-table-column>
        </a-table>
    </div>
</template>

<style lang="less" scoped src="./style/index.less"></style>

<script lang="ts" src="./index.ts"></script>
