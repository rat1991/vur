<template>
  <dl class="ui-tag">
    <dt class="ui-tag__title">{{title}}</dt>
    <dd v-for="(item, index) in tags" :key="index" :class="['ui-tag__item', selected === item.value && 'active']" @click="selectTag(item)">
      {{item.label}}
    </dd>
  </dl>
</template>
<style lang="scss">
  @import './Tag.scss'
</style>

<script>
//, selected.value === item.value && 'active'
export default {
  name: 'ui-tag',
  props: {
    title: String,
    tags: {
      type: Array,
      required: true
    }, // [..{label: 'name', value: val}]
    value: [Object, String, Number]
  },
  data(){
    return {
      selected: this.value
    }
  },
  watch: {
    selected(newVal){
      this.$emit('input', newVal)
    }
  },
  methods: {
    selectTag(val){
      this.selected = this.selected === val.value ? undefined : val.value;
    }
  }
}
</script>

