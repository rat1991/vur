<template>
  <div class="ui-calendar">
    <div class="ui-calendar__hd">
      <section class="ui-calendar__toolbarLeft">
        <div class="ui-calendar__switchYear">
          <a class="arrow icon-prev" href="javascript:" @click="curYear--"></a>
          <span>{{curYear}}</span>
          <a class="arrow icon-next" href="javascript:" @click="curYear++"></a>
        </div>
      </section>
      <section class="ui-calendar__toolbarRight">
        <div :class="['ui-calendar__switchMonth',switchMonthState && 'open']" @click="switchMonthState=!switchMonthState">
         <span>{{monthsText[curMonth - 1]}}</span><i class="arrow icon-next"></i>
        </div>
        <div class="ui-calendar__todayDisplay" @click="onToday">
          <span>今</span>
        </div>
      </section>
    </div>
    <div class="ui-calendar__bd">
      <ul class="ui-calendar__monthslist" v-show="switchMonthState">
        <li v-for="(item, index) in monthsText" :key="index"
        :class="[index + 1 === curMonth && 'current' ]"
        @click="updateMonthList(index)">{{item}}</li>
      </ul>
      <div class="ui-calendar__weekslist">
        <span v-for="(item, index) in weeksText" :key="index">{{item}}</span>
      </div>
      <div class="ui-calendar__inner" ref="swiperContainer">
        <section 
        v-for="(month, index) in curData" :key="index"
        class="ui-calendar__months"
        :data-month="month.name"
        ref="swiperList">
          <ul class="ui-calendar__weeks" v-for="(week, index) in month.value" :key="index">
            <li v-for="day in week" :key="formatStr(day.value)"
            :class="[
              formatStr(day.value) !== formatStr(selected) ? 'ui-calendar__day' : 'ui-calendar__day-current',
              formatStr(day.value) ===  formatStr(todayValue) && 'today',
              day.value[1] !== formatArr(month.name)[1] && 'exclude',
              day.disable && 'disabled'
              ]" 
              @click.stop="updateCurDay(day)">
              <span>{{day.value[2]}}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import CalendarSwiper from './calendar'
export default {
    name: "ui-calendar",
    props: {
      weeksText: {
        type: Array,
        default(){
          return ['周日','周一','周二','周三','周四','周五','周六']
        }
      },
      monthsText: {
        type: Array,
        default(){
          return ['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月']
        }
      },
      //当前值默认今天
      value: {
        type: String,
        default(){
          return Moment().format('YYYY-MM-DD')
        }
      },
      max: String, //最大可选日期
      min: String //最小可选日期
    },
    data(){
      return {
        todayValue: this.formatArr(Moment().format('YYYY-MM-DD')),
        curYear: undefined,
        curMonth: undefined,
        curDay: undefined,
        selected: [],
        switchMonthState: false
      }
    },
    computed: {
      prevValue(){
        let dataArr = [];
        let dataYear = this.curYear,
            dataMonth = this.curMonth;
        return dataArr = dataMonth === 1 ? [dataYear-1, 12] : [dataYear, dataMonth-1]
      },
      nextValue(){
        let dataArr = [];
        let dataYear = this.curYear,
            dataMonth = this.curMonth;
        return dataArr = dataMonth === 12 ? [dataYear+1, 1] : [dataYear, dataMonth+1]
      },
      curData(){
        let dataArr = [];
        let curMonthData = this.getMonthData(this.curYear,this.curMonth),
            prevMonthData = this.getMonthData(this.prevValue[0],this.prevValue[1]),
            nextMonthData = this.getMonthData(this.nextValue[0],this.nextValue[1]);
        dataArr.push(prevMonthData,curMonthData,nextMonthData)
        return dataArr
      }
    },
    created(){
      //this.selected = this.value ? this.formatArr(this.value) : this.todayValue
      this.curYear = this.value ? this.formatArr(this.value)[0] : this.todayValue[0]
      this.curMonth = this.value ? this.formatArr(this.value)[1] : this.todayValue[1]
      this.curDay = this.value ? this.formatArr(this.value)[2] : this.todayValue[2]
      console.log(this.curData);
    },
    mounted(){
      let _self = this;
      //定义滑动事件
      this.calendarSwiper = new CalendarSwiper({
        container: this.$refs.swiperContainer,
        swiperList: this.$refs.swiperList,
        beforeSwiper(d){
          d === 'prev' ? _self.curMonth-- : _self.curMonth++;
          return _self.$nextTick()
        }
      });
      //this.getMMDD(2017, 8)
    },
    watch: {
      value(newVal){
        console.log(newVal)
      },
      selected(newVal){
        let putVal = this.formatStr(newVal)
        this.$emit('input', putVal)
      },
      curMonth(newVal){
        if(newVal < 1){
          this.curMonth = 12
          this.curYear--
        }if(newVal > 12){
          this.curMonth = 1
          this.curYear++
        }
      }
    },
    methods: {
      formatArr(date){
        return date.split('-').map((cVal)=>{
          return parseInt(cVal)
        })
      },
      formatStr(date){
        let strArr = date.map((cVal)=>{
          return cVal < 10 ? '0'+ cVal : cVal
        })
        return strArr.join('-');
      },
      getMonthData(year, month){
        let date = Moment(`${year}-${month}`, ["YYYY-MM","YYYY-M"]),
            dateTotal = date.daysInMonth(),
            maxDate = this.max && this.max.replace(/\-/g,''),
            minDate = this.min && this.min.replace(/\-/g,'');
        let _monthData = {};
        _monthData.name = `${year}-${month}`;
        _monthData.value = [];
        for(let i=0; i < 6; i ++){
          let weekArr = [{},{},{},{},{},{},{}];
          weekArr.forEach((cur,index)=>{
            let weekDate = date.weekday(index).format('YYYY-MM-DD');
            cur.value = this.formatArr(weekDate);
            cur.disable = false
            //根据maxDate，minDate判断禁用范围
            if(maxDate || minDate){
              let toInteger = weekDate.replace(/\-/g,'');
              if(toInteger > maxDate || toInteger < minDate){
                cur.disable = true
              }
            }
            //moment递增每周
            if(index === 6) date.weekday(index + 1);
          })
          _monthData.value.push(weekArr)
        }
        return _monthData;
      },
      updateMonthList(index){
        this.curMonth = index + 1
        this.switchMonthState = false
      },
      updateCurDay(dayObj){
        if(dayObj.disable) return;
        let value = dayObj.value;
        if(value[0] < this.curYear || value[1] < this.curMonth){
          this.calendarSwiper.prev()
        }else if(value[0] > this.curYear || value[1] > this.curMonth){
          this.calendarSwiper.next()
        }
        this.curYear = value[0]
        this.curMonth = value[1]
        this.curDay = value[2]
        this.selected = value
      },
      onToday(){
        if(this.curYear > this.todayValue[0] || this.curMonth > this.todayValue[1]){
          this.calendarSwiper.prev()
        }else if(this.curYear < this.todayValue[0] || this.curMonth < this.todayValue[1]){
          this.calendarSwiper.next()
        }
        this.curYear = this.todayValue[0];
        this.curMonth = this.todayValue[1];
      }
    }
}
</script>