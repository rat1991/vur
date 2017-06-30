<template>
    <div class="ui-search" id="searchBar">
        <form class="ui-search__form" action @submit.prevent="submit">
            <div class="ui-search__box">
                <i class="icon-search"></i>
                <input type="search"
                class="ui-search__input" 
                id="searchInput" 
                :placeholder="placeholder"
                v-model="currentVal"
                @focus="isFocus=true"
                @blur="isFocus=false" required>
                <a href="javascript:" class="icon-circle-error ui-search__clear" @click="clear"></a>
            </div>
            <label class="ui-search__label" for="searchInput" v-show="!isFocus && !currentVal">
                <i class="icon-search"></i>
                <span>{{label}}</span>
            </label>
        </form>
        <a class="ui-search__btn-cancel" v-show="isFocus || currentVal" @click="cancel">取消</a>
    </div>
</template>



<script>
export default {
    name: 'ui-searchbar',
    props: {
        value: String,
        placeholder: {
            type: String,
            default: '搜索'
        },
        label: {
            type: String,
            default: '搜索'
        }
    },
    data () {
        return {
            currentVal: "",
            isFocus: false
        }
    },
    created() {
        this.currentVal = this.value;
    },
    watch: {
        currentVal(newVal) {
            this.$emit('input', newVal)
        }
    },
    methods: {
        clear(event) {
            var searchInput = event.target.previousElementSibling;
            this.currentVal = '';
            this.isFocus = true;
            searchInput.focus();
        },
        cancel() {
            this.currentVal = '';
            this.isFocus = false;
        },
        submit(event){
            this.$emit('submit',this.currentVal);
        }
    }
}
</script>
<style lang="sass">
  @import "./Searchbar";
</style>