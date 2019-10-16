<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
        <h1 class="display-4 text-center">HR协议</h1>
        <div>
          {{agreement}}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import TextField from './common/TextFieldGroup'
    import TextArea from './common/TextAreaGroup'
    import SelectListGroup from './common/SelectListGroup'

    export default {
        name: 'HrAgreement',
        data() {
            return {
                agreement: "",
                errors: {},
            }
        },
        methods: {
            getData() {
                this.$axios.get('/api/hrbase/hrUserAgreement/get?id=1').then(res => {
                    console.log(res.data);
                    this.agreement = res.data.data.userAgreementContent;
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        beforeRouteEnter(to, from, next) {  //进入页面刷新
            next(vm => {
                vm.getData()
            })
        },
        components: {
            TextField,
            TextArea,
            SelectListGroup
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
