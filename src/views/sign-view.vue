<template>
    <div style="width:100%">
        <div class="backgroundcolor">
            <div class="showdetail">
                <div class="siginContinuousCount">
                    <div class="Num">{{siginContinuousCount}}</div>
                    <p>连续签到（天）</p>
                </div>
                <div class="siginTotalCount">
                    <div class="Num">{{siginTotalCount}}</div>
                    <p>累计签到（天）</p>
                </div>
                <div class="Count">
                    <div class="Num">{{Count}}</div>
                    <p>获得总积分</p>
                </div>
            </div>
        </div>
        <div class="calendar">
            <div class="date">
                <div @click="cutmonth" style="cursor:pointer" class="left"></div>
                <div class="nowdate">{{year+'/'+month}}</div>
                <div @click="addmonth" style="cursor:pointer" class="right"></div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>日</td>
                        <td>一</td>
                        <td>二</td>
                        <td>三</td>
                        <td>四</td>
                        <td>五</td>
                        <td>六</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) of array">
                        <td v-for="(item1,index1) of item" :class="today==`${year+'-'+month+'-'+item1}`?'today':signList.indexOf((year+'-'+month+'-'+item1))!=-1?'signed':(year+'-'+month+'-'+item1)<today&&item1?'unsigned':''" style="cursor:pointer;textAlign:center">{{item1}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- <div class="button">
            <div @click="cutyear" style="cursor:pointer">--</div>
            <div @click="cutmonth" style="cursor:pointer">-</div>
            <div @click="addmonth" style="cursor:pointer">+</div>
            <div @click="addyear" style="cursor:pointer">++</div>
            </div> -->
            <!-- <div v-if="selectday">当前选中日期:{{selectday}}</div> -->
            <div class="discribe">
                <div>
                    <div class="signeddiscribe"></div>已签到
                </div>
                <div>
                    <div class="unsigneddiscribe"></div>未签到
                </div>
                <div>
                    <div class="todaydiscribe"></div>今日
                </div>
            </div>
        </div>
        <div class="more">
            <div class="title">规则说明</div>
            <div>
                <ul>
                    <li>每天成功打卡1次得1积分；</li>
                    <li>连续成功打卡20天，可得到额外积分奖励；</li>
                </ul>
            </div>
        </div>
        <div class="handle">
            <div class="button" @click="sign">我要打卡</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            year:'',
            month:'',
            day:'',
            startday:'',
            endday:'',
            days:'',
            array:[],
            selectday:'',
            monthlist:['1','2','3','4','5','6','7','8','9','10','11','12'],
            signList:[],
            today:'',
            siginContinuousCount:'',
            siginTotalCount:'',
            Count:'300'
        }
    },
    methods:{
        select(day){
            console.log(day)
            if(day){
            this.selectday=this.year+'/'+this.month+'/'+day
            }
        },
        cutyear(){
            this.year--;
            this.getDays(this.year,this.month);
            this.setDate();
            this.setDayarray()
        },
        cutmonth(){
            this.month=parseInt(this.month)
            if(this.month>1)
            {
                this.month--
            }else{
                this.month=12;this.year--
            }
            this.getDays(this.year,this.month);
            if(this.month<10){
                this.month='0'+this.month
            }
            this.setDate();
            this.setDayarray()
        },
        addmonth(){
            this.month=parseInt(this.month)
            if(this.month<12){
                this.month++
            }else{
                this.month=1;this.year++
            }
            this.getDays(this.year,this.month);
            if(this.month<10){
                this.month='0'+this.month
            }
            this.setDate();
            this.setDayarray()
        },
        addyear(){
            this.year++;
            this.getDays(this.year,this.month)
            this.setDate();
            this.setDayarray()
        },
        getNowDate(){
            let date=new Date();
            this.year=date.getFullYear()
            this.month=date.getMonth()+1
            if(this.month<10){
                this.month='0'+this.month
            }
            this.day=date.getDate()
            if(this.day<10){
                this.day='0'+this.day
            }
            this.today=this.year+'-'+this.month+'-'+this.day
            console.log(this.today)
        },
        setDate(){
            let date=new Date(this.year,this.month-1,1)
            this.startday=date.getDay();
            let dateend=new Date(this.year,this.month-1,this.days)
            this.endday=dateend.getDay()
            console.log(this.endday)
        },
        getDays(year,month){
            let days=30
            switch(month){
                case(1):
                case(3):
                case(5):
                case(7):
                case(8):
                case(10):
                case(12):
                    days=31;
                    break;
                case(2):
                    if(year%4==0&&year%100!=0){
                        days=29
                        break;
                    }else if(year%400==0){
                        days=29
                        break;
                    }else{
                        days=28
                        break
                    }
            }
            this.days=days
        },
        setDayarray(){
            let daysarray=new Array(this.days)
            // console.log(array)
            
            for(let i=0;i<this.days;i++){
                if((i+1)<10){
                    daysarray[i]='0'+(i+1)
                }else{
                    daysarray[i]=i+1
                }
            }
            let emptyarray=new Array(this.startday)
            let emptyarray2=new Array(6-this.endday)
            let array=emptyarray.concat(daysarray).concat(emptyarray2)

            let arraylength=array.length/7
            let newarray=new Array(arraylength)
            for(let j=0;j<arraylength;j++){
                newarray[j]=new Array()
                for(let k=0;k<7;k++){
                    newarray[j].push(array[k+j*7])
                }
            }
            // console.log(newarray)
            this.array=newarray
        },
        getSignlist(){
            this.$http.get(`/User/getSignDate?token=${this.$store.state.token}`).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.ReturnCode==200){
                    this.signList=res.data.signList.map(el=>{return el.signin_date})
                    this.siginTotalCount=res.data.siginTotalCount
                    this.siginContinuousCount=res.data.siginContinuousCount
                }
            })
        },
        sign(){
            this.$http({
                method: 'post',
                url: `/User/createSign?token=${this.$store.state.token}`,
                header: {
                    'Content-Type':'multipart/form-data'  
                },
                params: {token:this.$store.state.token}
            }).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.success){
                    this.$vux.toast.text('签到成功', 'top')
                }else{
                    this.$vux.toast.text(res.data.StatusInfo.ErrorDetailCode, 'top')
                }
            })
        }
    },
    mounted(){
        this.getNowDate()
        // console.log(this.getDays(2016,2))
        this.getDays(this.year,this.month)
        this.setDate()
        this.setDayarray()
    },
    created(){
        this.getSignlist()
    }
}
</script>

<style>
.backgroundcolor{background-color: #81D8D0;width:100%;height:299px;padding-top: 20px;box-sizing: border-box}
.showdetail{height:110px;display: flex;}
.showdetail>div{flex:1}
.Num{font-size:30px;text-align: center;color:#333;font-weight: bold}
.showdetail>div p {font-size: 14px;text-align: center;color:#666}
.calendar{width:84%;margin-left:8%;border-radius: 5px;background-color: #fff;height:275px;position: absolute;top:110px}
.date{font-size: 14px;color:#666;text-align: center;margin-top:20px}
.date div{display: inline-block;font-size: 14px;color:#666;}
.left{width:8px;height:8px;background: url('../assets/icon/arrow_left@2x.png') center no-repeat;background-size: 8px 8px}
.right{width:8px;height:8px;background: url('../assets/icon/arrow_right@2x.png') center no-repeat;background-size: 8px 8px}
table{width:100%}
table tr{margin:10px 0;display: flex}
table thead tr{margin:10px 0 0 0;display: flex;}
table thead tr td{color:#666;font-size: 10px}
table td{margin:0 4%;display: inline-block;flex:1;text-align: center;padding-top:2px;width:20px;height:20px;font-size: 10px}
.today{width:20px;height:20px;background: url('../assets/icon/VIPlevel@2x.png') center no-repeat;background-size: 20px 20px}
.signed{width:20px;height:20px;background: url('../assets/icon/icon_data_b@2x.png') center no-repeat;background-size: 20px 20px}
.unsigned{width:20px;height:20px;background: url('../assets/icon/icon_data_g@2x.png') center no-repeat;background-size: 20px 20px}

.discribe{font-size: 8px;color:#999}
.discribe>div{display: inline-block;margin-left:5%;width:20%}
.discribe>div>div{display: inline-block;}
.todaydiscribe{width:7px;height:7px;background: url('../assets/icon/round_jt@2x.png') center no-repeat;background-size: 7px 7px;margin-right: 10%}
.signeddiscribe{width:7px;height:7px;background: url('../assets/icon/round_yqd@2x.png') center no-repeat;background-size: 7px 7px;margin-right: 10%}
.unsigneddiscribe{width:7px;height:7px;background: url('../assets/icon/round_wqd@2x.png') center no-repeat;background-size: 7px 7px;margin-right: 10%}

.more{margin-top:109px;width:100%;padding-left:2.5%}
.title{font-size: 16px;color:#222;margin-bottom:23px}
.more ul li{list-style-position: inside!important;font-size: 15px;color:#494949;list-style-type: disc!important;}

.button div{display: inline-block;margin-right: 20px}
.select{border-radius: 50%;background-color: rgba(0,0,0, 0.1);color:red}

.handle{height:83px;width:100%;background-color: #fff;position: fixed;bottom:0;box-sizing: border-box;padding-top: 10px}
.handle .button{width:84%;margin-left:8%;height:40px;line-height: 40px;border-radius: 20px;background-color: #06D5DE;text-align: center;color: #fff;font-size: 15px}
</style>
