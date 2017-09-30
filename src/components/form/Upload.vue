<template>
  <div class="ui-cell">
    <div class="ui-cell__bd">{{label}}</div>
    <div class="ui-cell__ft">{{filesList.length}}/{{max}}</div>
    <ul class="ui-upload__files">
      <li class="ui-upload__file" v-for="(img, index) in filesList" :key="index">
      <div class="preview" :style="`background-image:url(${img})`" v-drag="{
        dragClass: 'preview_drag',
        dragId: index,
        onDrag: delDrag,
        onOffset: delOffset,
        onDrop: delDrop,
      }">
        <progress max="100" value="20"></progress>
      </div>
      </li>
      <li class="ui-upload__loader icon-addto" v-if="filesList.length < max">
        <input type="file" accept="image/*" multiple=2 @change="onChange">
      </li>
    </ul>
    <div :class="['ui-upload__del', isDrag && 'active', isMixe && 'mixe']" ref="delBtn">
      <i :class="[isMixe ? 'icon-delete-conf' : 'icon-delete']"></i>
      <p class="text-12">{{isMixe ? '松手即可删除' : '拖到到此处删除'}}</p>
    </div>
  </div>
</template>


<script>
import utils from '@/libs/utils.js';
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
        '//placem.at/things?w=240',
        '//placem.at/things?w=120'
      ],
      isDrag: false,
      isMixe: false,
    }
  },
  created(){
  },
  watch: {
  },
  methods: {
    onChange(event){
      alert(event.target.files)
    },
    delDrag(event){
    },
    delOffset(event){
      this.isDrag = true
      let delHeight = this.$refs.delBtn.getBoundingClientRect().top;
      let offset = event.top + event.height;
      if(offset > delHeight){
        this.isMixe = true
      }else{
        this.isMixe = false
      }
    },
    delDrop(event){
      this.isDrag = false
      this.isMixe && this.filesList.splice(event.id, 1)
    }
  }
}
</script>