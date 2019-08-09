<template>
    <div>
        <Card>
            <div class="clearfix">
                <div class="pull-left">
                    <Button @click="$router.back()" class="search-btn" type="primary" style="margin-right:5px">
                        <Icon type="md-arrow-back" />&nbsp;&nbsp;返回</Button>
                    <Button @click="handleSave" class="search-btn" type="success" style="margin-right:5px">
                        <Icon type="md-add"/>&nbsp;&nbsp;保存</Button>
                </div>
                <div class="pull-right">
                    
                </div>
            </div>
            <div style="margin-top: 20px;">
                <Form ref="TicketsCreateForm" :model="createForm">
                    <Row>
                        <Col span="24"> 
                            <FormItem label="名称" prop="name">
                                <Input v-model="createForm.name" placeholder="请输入名称进行搜索" style="width: 200px"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Form :model="formTable" label-position="top">
                    <Row>
                        <Col span="24"> 
                            <FormItem label="设置船票数量">
                                <tables class="self-table-wrap" ref="tables" stripe v-model="tableData" :columns="columns" @on-blur="handleSaveParams"/>
                                <div style="margin-top:10px;text-align:right;">
                                    <Page :total="page.total" :current="page.index" :page-size="page.size" @on-change="handleOnChange" 
                                    size="small" :page-size-opts="[10,20,50,100,1000]" @on-page-size-change="handleOnChangeSize"/>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Card>
    </div>
</template>
<script>
import Tables from '_c/tables'
import pageInfo from "@/libs/page-info"
import {
    ticketsRecidenceColumn
} from './api'
export default {
    components: {
        Tables,
    },
    data() {
        return {
            tableData: [],
            columns: [],
            page: {},
            createForm: {},
            formTable: {}
        }
    },
    methods: {
        
        handleQuery() {
            this.tableData = [
                {id: 1, name: '花鸟岛各民宿名称', num: '', isEdit: true},
                {id: 2, name: '花鸟岛各民宿名称', num: '', isEdit: true},
                {id: 3, name: '花鸟岛各民宿名称', num: '', isEdit: true},
                
            ]
        },
        handleSave() {
            console.log(this.tableData, '233333')
        },
        handleSaveParams(data) {
            this.tableData[data.index].num = data.row.num
        },
        /* 分页查询 */
        handleOnChange(index) {
            this.page.index = index
            this.handleQuery()
        },
        /* 分页大小 */
        handleOnChangeSize(size) {
            this.page.size = size
            this.handleQuery()
        },
    },
    mounted() {
        this.columns = ticketsRecidenceColumn
        this.page = pageInfo.init()
        this.handleQuery()
    }
}
</script>

