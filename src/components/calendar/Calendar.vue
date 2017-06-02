<template>
  <div class="ui-calendar">
    <div class="ui-calendar__hd">
      <section class="ui-calendar__toolbarLeft">
        <div class="ui-calendar__switchYear">
          <a class="arrow icon-prev" href="javascript:"></a>
          <span>{{curValue[0]}}</span>
          <a class="arrow icon-next" href="javascript:"></a>
        </div>
      </section>
      <section class="ui-calendar__toolbarRight">
        <div :class="['ui-calendar__switchMonth',switchMonthState && 'open']" @click="switchMonthState ? switchMonthState=false : switchMonthState=true">
         <span>{{curMonth}}</span><i class="arrow icon-next"></i>
        </div>
        <div class="ui-calendar__todayDisplay">
          <span>{{curValue[2]}}</span>
        </div>
      </section>
    </div>
    <div class="ui-calendar__bd">
      <ul class="ui-calendar__monthslist" v-show="switchMonthState">
        <li :class="[index + 1 === curValue[1] && 'current' ]" v-for="(item, index) in monthsText">{{item}}</li>
      </ul>
      <div class="ui-calendar__weekslist">
        <span v-for="item in weeksText">{{item}}</span>
      </div>
      <div class="ui-calendar__inner" ref="swiperWrap">
        <section 
        :class="[
          'ui-calendar__months',
          month.name[1] === curValue[1] && 'current',
          month.name[1] === prevValue[1] && 'prev',
          month.name[1] === nextValue[1] && 'next'
          ]" 
        v-for="month in curData">
          <ul class="ui-calendar__weeks" v-for="week in month.value">
            <li :class="['ui-calendar__day',day.value[1] !== month.name[1] && 'disabled']" v-for="day in week"><span>{{day.value[2]}}</span></li>
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
      value: {
        type: String,
        default(){
          return Moment().format('YYYY-MM-DD')
        }
      }
    },
    data(){
      return {
        curValue: this.formatArr(this.value),
        switchMonthState: false
      }
    },
    computed: {
      curMonth(){
        return this.monthsText[this.curValue[1] - 1]
      },
      prevValue(){
        let dataArr = [];
        let dataYear = this.curValue[0],
            dataMonth = this.curValue[1];
        return dataArr = dataMonth === 1 ? [dataYear-1, 12] : [dataYear, dataMonth-1]
      },
      nextValue(){
        let dataArr = [];
        let dataYear = this.curValue[0],
            dataMonth = this.curValue[1];
        return dataArr = dataMonth === 12 ? [dataYear+1, 1] : [dataYear, dataMonth+1]
      },
      curData(){
        let dataArr = [];
        let curMonthData = {name:this.curValue, value:this.getMonthData(this.curValue[0],this.curValue[1])},
            prevMonthData = {name:this.prevValue, value:this.getMonthData(this.prevValue[0],this.prevValue[1])},
            nextMonthData = {name:this.nextValue, value:this.getMonthData(this.nextValue[0],this.nextValue[1])};
        dataArr.push(prevMonthData,curMonthData,nextMonthData)
        return dataArr
      }
    },
    created(){
      console.log(this.prevValue,this.curValue,this.nextValue);
    },
    mounted(){
      this.calendarSwiper();
    },
    watch: {
    },
    methods: {
      formatArr(date){
        let arr = [];
        date.split('-').forEach((cVal)=>{
          arr.push(parseInt(cVal))
        })
        return arr
      },
      getMonthData(year,month){
        let daysNum = Moment(year +'-'+ month, ["YYYY-MM","YYYY-M"]).daysInMonth();
        let startDay = Moment(year +'-'+ month +'-01', ["YYYY-MM-DD","YYYY-M-D"]).weekday();
        let endDay = Moment(year +'-'+ month +'-'+ daysNum, ["YYYY-MM-DD","YYYY-M-D"]).weekday();
        let nextWeekDay = (i = 0)=>{
          let _day = Moment(year +'-'+ month,["YYYY-MM","YYYY-M"]).weekday(7*i).format('YYYY-MM-DD')
          return this.formatArr(_day)
        };
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
            _weekArr[index] = _dayObj
          });
          //切换到下周日期
          _count++
          monthData.push(_weekArr)
        }while (nextWeekDay(_count)[1] == month);
        //返回数据
        return monthData
      },
      calendarSwiper(){
        let _self = this;
        let swiperWrap = this.$refs.swiperWrap;
        let swiperList =  swiperWrap.querySelectorAll('.ui-calendar__months');
        let swiperCurrent = swiperList[1],
            swiperPrev = swiperList[0],
            swiperNext = swiperList[2];
        let swiperWrapWidth =  swiperWrap.offsetWidth;
        let setTranslate = (per)=>{
          return 'translate3d(' + per + '%, 0, 0)'
        };
        let getTranslate = (el)=>{
           let matrix = window.getComputedStyle(el, null).transform;
           let formatPer = matrix.split(',')[4] / swiperWrapWidth * 100
           return formatPer ? formatPer : 0
        };
        swiperCurrent.style.transform = setTranslate('0')
        swiperPrev.style.transform = setTranslate('-100')
        swiperNext.style.transform = setTranslate('100')
        let _start={}, _move={}, _end={};
        let _startTime, _endTime;
        let _wrapTranslate,_curTranslate,_prevTranslate,_nextTranslate;
        //SWIPER start
        swiperWrap.addEventListener('touchstart', function (e) {
            _startTime = new Date().getTime()
            _start.x = e.changedTouches[0].pageX;
            _start.y = e.changedTouches[0].pageY;
            _wrapTranslate = getTranslate(swiperWrap)
            _curTranslate = getTranslate(swiperCurrent)
            _prevTranslate = getTranslate(swiperPrev)
            _nextTranslate = getTranslate(swiperNext)
            swiperWrap.style.transition = 'none'
            console.log(_curTranslate,_prevTranslate,_nextTranslate)
        }, false);
        //SWIPER move
        swiperWrap.addEventListener('touchmove', function (e) {
            _move.x = e.changedTouches[0].pageX;
            _move.y = e.changedTouches[0].pageY;
            let distance = _move.x - _start.x
            let distancePer = (distance / swiperWrapWidth * 100) + _wrapTranslate;
            swiperWrap.style.transform = setTranslate(distancePer)
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
            if(Math.abs(distancePer) > 50 || interval < 120){
              swiperWrap.style.transform = distancePer > 0 ? setTranslate(_wrapTranslate+=100) : setTranslate(_wrapTranslate-=100)
              // swiperCurrent.style.transform = distancePer > 0 ? setTranslate(_curTranslate+=100) : setTranslate(_curTranslate-=100)
              // swiperPrev.style.transform = distancePer > 0 ? setTranslate(_prevTranslate+=100) : setTranslate(_prevTranslate-=100)
              // swiperNext.style.transform = distancePer > 0 ? setTranslate(_nextTranslate+=100) : setTranslate(_nextTranslate-=100)
            }else{
              swiperWrap.style.transform = setTranslate(_wrapTranslate)
            }
            swiperWrap.style.transition = 'all 300ms ease'
            e.preventDefault();
        }, false);
      }
    }
}
</script>