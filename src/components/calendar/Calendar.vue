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
        <div :class="['ui-calendar__switchMonth',switchMonthState && 'open']" @click="switchMonthState ? switchMonthState=false : switchMonthState=true">
         <span>{{monthsText[curMonth - 1]}}</span><i class="arrow icon-next"></i>
        </div>
        <div class="ui-calendar__todayDisplay" @click="onToday">
          <span>今</span>
        </div>
      </section>
    </div>
    <div class="ui-calendar__bd">
      <ul class="ui-calendar__monthslist" v-show="switchMonthState">
        <li v-for="(item, index) in monthsText"
        :class="[index + 1 === curMonth && 'current' ]"
        @click="updateMonthList(index)">{{item}}</li>
      </ul>
      <div class="ui-calendar__weekslist">
        <span v-for="item in weeksText">{{item}}</span>
      </div>
      <div class="ui-calendar__inner" ref="swiperWrap">
        <section 
        v-for="month in curData"
        class="ui-calendar__months"
        :data-month="month.name">
          <ul class="ui-calendar__weeks" v-for="week in month.value">
            <li v-for="day in week" 
            :class="[
              formatStr(day.value) !== formatStr(curValue) ? 'ui-calendar__day' : 'ui-calendar__day-current',
              formatStr(day.value) ===  formatStr(todayValue) && 'today',
              day.value[1] !== month.name[1] && 'exclude',
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
import Swiper from '../swiper/swiper.js'
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
        curValue: [],
        curYear: undefined,
        curMonth: undefined,
        curDay: undefined,
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
        let curMonthData = {name:[this.curYear,this.curMonth], value:this.getMonthData(this.curYear,this.curMonth)},
            prevMonthData = {name:this.prevValue, value:this.getMonthData(this.prevValue[0],this.prevValue[1])},
            nextMonthData = {name:this.nextValue, value:this.getMonthData(this.nextValue[0],this.nextValue[1])};
        dataArr.push(prevMonthData,curMonthData,nextMonthData)
        return dataArr
      }
    },
    created(){
      //this.curValue = this.value ? this.formatArr(this.value) : this.todayValue
      this.curYear = this.value ? this.formatArr(this.value)[0] : this.todayValue[0]
      this.curMonth = this.value ? this.formatArr(this.value)[1] : this.todayValue[1]
      this.curDay = this.value ? this.formatArr(this.value)[2] : this.todayValue[2]
      console.log(this.curData);
    },
    mounted(){
      this.calendarSwiper();
    },
    watch: {
      value(newVal){
        console.log(newVal)
      },
      curValue(newVal){
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
        let arr = [];
        date.split('-').forEach((cVal)=>{
          arr.push(parseInt(cVal))
        })
        return arr
      },
      formatStr(date){
        let strArr = [];
        date.forEach((cVal)=>{
          cVal = cVal < 10 ? '0'+ cVal : cVal
          strArr.push(cVal)
        })
        return strArr.join('-');
      },
      getMonthData(year, month){
        let daysNum = Moment(year +'-'+ month, ["YYYY-MM","YYYY-M"]).daysInMonth();
        let startDay = Moment(year +'-'+ month +'-01', ["YYYY-MM-DD","YYYY-M-D"]).weekday();
        let endDay = Moment(year +'-'+ month +'-'+ daysNum, ["YYYY-MM-DD","YYYY-M-D"]).weekday();
        let nextWeekDay = (i = 0)=>{
          let _day = Moment(year +'-'+ month,["YYYY-MM","YYYY-M"]).weekday(7*i).format('YYYY-MM-DD')
          return this.formatArr(_day)
        };
        let maxDate = this.max ? this.formatArr(this.max) : []
        let minDate = this.min ? this.formatArr(this.min) : []
        let monthData = [];
        let _count = 0;
        let _istart=1, _iend=1;
        
        do{
          let _weekArr = [null,null,null,null,null,null,null];
          let _startMonth = nextWeekDay(_count)[1],
              _startDay = nextWeekDay(_count)[2];
          _weekArr.forEach(function(cVal,index){
            let _dayObj = {value:[], disable:false};
            if(_startMonth !== month && daysNum - _startDay < 7){
              _dayObj.value = index >= startDay ? [year, month, _istart++] : [year, month - 1, _startDay++]
            }else if(_startMonth === month && daysNum - _startDay < 7){
              _dayObj.value = daysNum >= _startDay ? [year, month, _startDay++] : [year, month + 1, _iend++]
            }else{
              _dayObj.value = [year, month, _startDay++]
            }

            //根据maxDate，minDate判断禁用范围
            if(_dayObj.value[0] > maxDate[0] || _dayObj.value[0] < minDate[0]){
              _dayObj.disable = true
            }else if(_dayObj.value[1] > maxDate[1] || _dayObj.value[1] < minDate[1]){
              _dayObj.disable = true
            }else if(_dayObj.value[1] === maxDate[1] && _dayObj.value[2] >= maxDate[2]){
              _dayObj.disable = true
            }else if(_dayObj.value[1] === minDate[1] && _dayObj.value[2] <= minDate[2]){
              _dayObj.disable = true
            }
            //添加的周数组中
            _weekArr[index] = _dayObj
          });
          //切换到下周日期
          _count++
          monthData.push(_weekArr)
        }while (nextWeekDay(_count)[1] == month);
        //返回数据
        return monthData
      },
      calendarSwiper(forward){
        let _self = this;
        let swiperWrap = this.$refs.swiperWrap;
        let swiperList =  swiperWrap.querySelectorAll('.ui-calendar__months');
        let swiperCurrent = swiperList[1],
            swiperPrev = swiperList[0],
            swiperNext = swiperList[2];
        let swiperWrapWidth =  swiperWrap.offsetWidth;
        let setTranslate = (el, per)=>{
          el.style.transform = 'translate3d(' + per + '%, 0, 0)'
        };
        let getTranslate = (el)=>{
           let matrix = window.getComputedStyle(el, null).transform;
           let formatPer = matrix.split(',')[4] / swiperWrapWidth * 100
           return formatPer ? formatPer : 0
        };
        function go(v){
          let _wrapTranslate = getTranslate(swiperCurrent) * -1,
              _curTranslate = getTranslate(swiperCurrent),
              _prevTranslate = getTranslate(swiperPrev),
              _nextTranslate = getTranslate(swiperNext);
          
          if(v === 'prev'){
            setTranslate(swiperWrap, _wrapTranslate+=100)
            setTranslate(swiperCurrent, _curTranslate-=100)
            setTranslate(swiperPrev, _prevTranslate-=100)
            setTranslate(swiperNext, _nextTranslate-=100)
          }else if(v === 'next'){
            setTranslate(swiperWrap, _wrapTranslate-=100)
            setTranslate(swiperCurrent, _curTranslate+=100)
            setTranslate(swiperPrev, _prevTranslate+=100)
            setTranslate(swiperNext, _nextTranslate+=100)
          }
        };
        if(forward === 'prev'){
          go('prev')
          return
        }else if(forward === 'next'){
          go('next')
          return
        }
        setTranslate(swiperWrap,'0')
        setTranslate(swiperCurrent,'0')
        setTranslate(swiperPrev,'-100')
        setTranslate(swiperNext,'100')
        let _start={}, _move={}, _end={};
        let _startTime, _endTime;
        let _wrapTranslate;
        //SWIPER start
        swiperWrap.addEventListener('touchstart', function (e) {
            _wrapTranslate = getTranslate(swiperCurrent) * -1
            _startTime = new Date().getTime()
            _start.x = e.changedTouches[0].pageX;
            _start.y = e.changedTouches[0].pageY;
            //e.preventDefault();
        }, false);
        //SWIPER move
        swiperWrap.addEventListener('touchmove', function (e) {
            _move.x = e.changedTouches[0].pageX;
            _move.y = e.changedTouches[0].pageY;
            let distance = _move.x - _start.x
            let distancePer = (distance / swiperWrapWidth * 100) + _wrapTranslate;
            setTranslate(swiperWrap, distancePer)
            swiperWrap.style.transition = 'none'
            e.preventDefault();
        }, false);
        //SWIPER end
        swiperWrap.addEventListener('touchend', function (e) {
            _endTime = new Date().getTime()
            _end.x = e.changedTouches[0].pageX;
            _end.y = e.changedTouches[0].pageY;
            let interval = _endTime - _startTime;
            let distance = _end.x - _start.x;
            let distancePer = distance / swiperWrapWidth * 100;

            if(Math.abs(distancePer) > 50 || Math.abs(distance) > 10 && interval < 120){
              if(distancePer > 0){
                go('prev')
                _self.curMonth--
              }else{
                go('next')
                _self.curMonth++
              }
            }else{
              setTranslate(swiperWrap,_wrapTranslate)
            }
            swiperWrap.style.transition = 'all 300ms ease'
            //e.preventDefault();
        }, false);
      },
      updateMonthList(index){
        this.curMonth = index + 1
        this.switchMonthState = false
      },
      updateCurDay(dayObj){
        if(dayObj.disable) return;
        let value = dayObj.value;

        if(value[1] === this.curMonth){
          this.curDay = value[2]
        }else{
          if(this.curMonth > value[1]){
            this.calendarSwiper('next')
            this.curMonth = value[1]
          }else{
            this.calendarSwiper('prev')
            this.curMonth = value[1]
          }
          this.curDay = value[2]
        }
        this.curValue = [this.curYear, this.curMonth, this.curDay]
      },
      onToday(){

        if(this.curYear > this.todayValue[0] || this.curMonth > this.todayValue[1]){
          this.calendarSwiper('prev')
          //console.log('prev',this.curYear,this.curMonth);
        }else if(this.curYear < this.todayValue[0] || this.curMonth < this.todayValue[1]){
          this.calendarSwiper('next')
        }
        this.curYear = this.todayValue[0];
        this.curMonth = this.todayValue[1];
      }
    }
}
</script>