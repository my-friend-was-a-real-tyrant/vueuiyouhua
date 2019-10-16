<template>
  <div class="form-group">
    <!-- 封装组件适用于select标签 -->
    <select
      class="form-control form-control-lg"
      :class="{'is-invalid': error}"
      :value="value"
      :style="style"
      :name='name'
      @change="handleChange"
      @input="$emit('input', $event.target.value)"
    >
      <option
        v-for="(option,index) in options"
        :key="index"
        :value="option.value"
      >
        {{option.text}}
      </option>
    </select>
    <div v-if="error" class="invalid-feedback">
      {{error}}
    </div>
    <small v-if="info" className="form-text text-muted">{{info}}</small>
  </div>
</template>

<script>
    export default {
        name: 'SelectListGroup',
        props: {
            value: String,
            style: String,
            name: String,
            error: String,
            info: String,
            options: Array,
        },
        methods: {
            handleChange(evt) {
                this.$emit('change', evt.target.value); // 将当前对象 evt 传递到父组件
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
