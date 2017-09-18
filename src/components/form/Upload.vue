<template>
  <div class="ui-cell">
    <div class="ui-cell__bd">{{label}}</div>
    <div class="ui-cell__ft">0/{{max}}</div>
    <ul class="ui-upload__files">
      <li class="ui-upload__file" v-for="(img, index) in filesList" :key="index"
      :style="`background-image:url(${img})`">
      <progress max="100" value="20"></progress>
      </li>
      <li class="ui-upload__loader icon-addto" v-if="filesList.length < max">
        <input type="file" accept="image/*" multiple=2 @change="onChange">
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "ui-upload",
  props: {
    label: String,
    max: {
      type: Number,
      default: 8
    }
  },
  data(){
    return {
      filesList: [
        '//placem.at/people?w=240',
        '//placem.at/things?w=240',
        '//placem.at/things?w=120'
      ]
    }
  },
  created(){
  },
  watch: {
  },
  methods: {
    onChange(event){
      alert(event.target.files)
    }
  }
}
</script>