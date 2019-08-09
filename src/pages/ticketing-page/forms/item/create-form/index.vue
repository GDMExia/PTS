<template>
  <div>
    <Form @submit.native.prevent="()=>{}" ref="CreateForm" :model="formInline" :rules="ruleInline" :label-width="60">
      <Row>
        <Col>
          <FormItem label="详情" prop="detail">
            <!-- <Input type='text' v-model="formInline.adultPrice" placeholder="请输入" >
              <span slot="append">元</span>
            </Input> -->
            <editor></editor>
          </FormItem>
        </Col>
      </Row>
      <!-- <Row>
        <Col>
          <FormItem label="儿童" prop="childPrice">
            <Input type='text' v-model="formInline.childPrice" placeholder="请输入" >
            <span slot="append">元</span>
            </Input>
          </FormItem>
        </Col>
      </Row> -->
    </Form>
  </div>
</template>

<script>
import axios from "@/libs/api.request"; // 引入 请求模块
import editor from '_c/editor'
export default {
  name:'CreateForm',
  components: {
    editor
  },
  data() {
    return {
      
    };
  },
  methods: {
    validate(cb) {
      this.$refs.CreateForm.validate(cb)
    },
    resetFields() {
      this.$refs.CreateForm.resetFields()
    }
  },
  props: {
    formInline: Object,
    ruleInline: Object
  },
  mounted() {
  
  },
  watch: {
    
  }
};
</script>

<style>
</style>
