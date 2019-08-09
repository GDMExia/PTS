
import FormModel from '@/libs/form-model'
class CreateForm extends FormModel {
  constructor () {
    super()
    this.ruleInline = {
      detail: [ { required: true, message: '请输入标题', trigger: 'blur' } ]
    }
  }
  init () {
    this.formInline = {
      'detail': ''
    }
    return this
  }
}
export default new CreateForm()
