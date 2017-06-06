<template>
  <div class="ui-calendar">
    <div class="ui-calendar__hd">
      <section class="ui-calendar__toolbarLeft">
        <div class="ui-calendar__switchYear">
          <a class="arrow icon-prev" href="javascript:" @click="curYaer--"></a>
          <span>{{curYaer}}</span>
          <a class="arrow icon-next" href="javascript:" @click="curYaer++"></a>
        </div>
      </section>
      <section class="ui-calendar__toolbarRight">
        <div :class="['ui-calendar__switchMonth',switchMonthState && 'open']" @click="switchMonthState ? switchMonthState=false : switchMonthState=true">
         <span>{{monthsText[curMonth - 1]}}</span><i class="arrow icon-next"></i>
        </div>
        <div class="ui-calendar__todayDisplay">
          <span>{{curValue[2]}}</span>
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
        :class="[
          'ui-calendar__months',
          month.name[1] === curMonth[1] && 'current',
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
        curYaer: this.formatArr(this.value)[0],
        curMonth: this.formatArr(this.value)[1],
        switchMonthState: false
      }
    },
    computed: {
      prevValue(){
        let dataArr = [];
        let dataYear = this.curYaer,
            dataMonth = this.curMonth;
        return dataArr = dataMonth === 1 ? [dataYear-1, 12] : [dataYear, dataMonth-1]
      },
      nextValue(){
        let dataArr = [];
        let dataYear = this.curYaer,
            dataMonth = this.curMonth;
        return dataArr = dataMonth === 12 ? [dataYear+1, 1] : [dataYear, dataMonth+1]
      },
      curData(){
        let dataArr = [];
        let curMonthData = {name:[this.curYaer,this.curMonth], value:this.getMonthData(this.curYaer,this.curMonth)},
            prevMonthData = {name:this.prevValue, value:this.getMonthData(this.prevValue[0],this.prevValue[1])},
            nextMonthData = {name:this.nextValue, value:this.getMonthData(this.nextValue[0],this.nextValue[1])};
        dataArr.push(prevMonthData,curMonthData,nextMonthData)
        return dataArr
      }
    },
    created(){
      console.log(this.curYaer,this.curMonth);
    },
    mounted(){
      this.calendarSwiper();
    },
    watch: {
      curMonth(newVal){
        if(newVal < 1){
          this.curMonth = 12
          this.curYaer--
        }if(newVal > 12){
          this.curMonth = 1
          this.curYaer++
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
        let setTranslate = (el, per)=>{
          el.style.transform = 'translate3d(' + per + '%, 0, 0)'
        };
        let getTranslate = (el)=>{
           let matrix = window.getComputedStyle(el, null).transform;
           let formatPer = matrix.split(',')[4] / swiperWrapWidth * 100
           return formatPer ? formatPer : 0
        };
        setTranslate(swiperWrap,'0')
        setTranslate(swiperCurrent,'0')
        setTranslate(swiperPrev,'-100')
        setTranslate(swiperNext,'100')
        let _start={}, _move={}, _end={};
        let _startTime, _endTime;
        let _wrapTranslate,_curTranslate,_prevTranslate,_nextTranslate;
        //SWIPER start
        swiperWrap.addEventListener('touchstart', function (e) {
            _wrapTranslate = getTranslate(swiperCurrent) * -1
            _curTranslate = getTranslate(swiperCurrent)
            _prevTranslate = getTranslate(swiperPrev)
            _nextTranslate = getTranslate(swiperNext)
            _startTime = new Date().getTime()
            _start.x = e.changedTouches[0].pageX;
            _start.y = e.changedTouches[0].pageY;
            swiperWrap.style.transition = 'none'
            console.log(_wrapTranslate)
            e.preventDefault();
        }, false);
        //SWIPER move
        swiperWrap.addEventListener('touchmove', function (e) {
            _move.x = e.changedTouches[0].pageX;
            _move.y = e.changedTouches[0].pageY;
            let distance = _move.x - _start.x
            let distancePer = (distance / swiperWrapWidth * 100) + _wrapTranslate;
            setTranslate(swiperWrap, distancePer)
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
                setTranslate(swiperWrap, _wrapTranslate+=100)
                setTranslate(swiperCurrent, _curTranslate-=100)
                setTranslate(swiperPrev, _prevTranslate-=100)
                setTranslate(swiperNext, _nextTranslate-=100)
                _self.curMonth--
              }else{
                setTranslate(swiperWrap, _wrapTranslate-=100)
                setTranslate(swiperCurrent, _curTranslate+=100)
                setTranslate(swiperPrev, _prevTranslate+=100)
                setTranslate(swiperNext, _nextTranslate+=100)
                _self.curMonth++
              }
            }else{
              setTranslate(swiperWrap,_wrapTranslate)
            }
            swiperWrap.style.transition = 'all 300ms ease'
            e.preventDefault();
        }, false);
      },
      updateMonthList(index){
        this.curMonth = index + 1
        this.switchMonthState = false
      }
    }
}
</script>