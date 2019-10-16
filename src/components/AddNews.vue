<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
        <h1 class="display-4 text-center">添加企业动态</h1>
        <small class="d-block pb-3">* 表示必填项</small>
        <form @submit.prevent="submit">
          <TextField
            type="text"
            name="title"
            placeholder="* 标题"
            v-model="msgInfo.title"
            :error="errors.title">
          </TextField>
          <TextField
            type="text"
            name="title"
            placeholder="* 关键字"
            v-model="msgInfo.keyWord"
            :error="errors.keyWord">
          </TextField>
          <TextField
            type="text"
            name="title"
            placeholder="* 细分行业"
            v-model="msgInfo.industryCode"
            :error="errors.industryCode">
          </TextField>
          <TextField
            type="number"
            name="title"
            placeholder="* 排序"
            v-model="msgInfo.orderIndex"
            :error="errors.orderIndex">
          </TextField>
          <SelectListGroup
            name="pubFlag"
            placeholder="* 所属栏目"
            v-model="msgInfo.ourCompanyNewsItemId"
            :options="items"
            :error="errors.ourCompanyNewsItemId">
          </SelectListGroup>
          <SelectListGroup
            name="pubFlag"
            placeholder="* 发布状态"
            v-model="msgInfo.pubStatus"
            :options="status"
            :error="errors.pubStatus">
          </SelectListGroup>
          <TextArea
            placeholder="内容"
            name='content'
            v-model="msgInfo.content"
            :error='errors.content'>
						</TextArea>
          <input type="submit" class="btn btn-info btn-block mt-4" value="添加">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import TextField from './common/TextFieldGroup'
    import TextArea from './common/TextAreaGroup'
    import SelectListGroup from './common/SelectListGroup'

    export default {
        name: 'AddEducation',
        data() {
            return {
                status: [{
                    value: "0",
                    text: "未发布"
                },
                    {
                        value: "1",
                        text: "已发布"
                    }],
                items: [],
                msgInfo: {
                    pubStatus: "0",
                    keyWord: "",
                    orderIndex: "",
                    ourCompanyNewsItemId: "",
                    industryCode: "",
                    title: "",
                    content: "",
                },
                errors: ""
            }
        },
        methods: {

            submit() {
                this.$axios.post('/api/admin/ourCompanyNews/add', this.msgInfo).then(res => {
                    console.log(res.data);
                    if (res.data.code == 0) {
                        this.$router.push('/hrDashboard')
                    } else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },

            getData() {
                this.$axios.post('/api/admin/ourCompanyNewsItem/list').then(res => {
                    console.log(res.data);
                    for (var i in res.data.data.records) {
                        let obj = {};
                        obj.value = res.data.data.records[i].ourCompanyNewsItemId;
                        obj.text = res.data.data.records[i].itemName;
                        this.items.push(obj);
                    }
                    this.msgInfo.ourCompanyNewsItemId = this.items[0].value;
                }).catch(err => {
                    console.log(err);
                })
            },
        },
        beforeRouteEnter(to, from, next) {  //进入页面刷新
            next(vm => {
                vm.getData()
            })
        },
        components: {
            TextField,
            TextArea,
            SelectListGroup,
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
