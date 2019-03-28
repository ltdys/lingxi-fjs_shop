import { getUserInfo } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export const list_mixins = {
  data(){
    return {
      userId: this.$store.getters.getUserId,
      pageIndex:1,
      pageSize:20,
      resultList:[],
      finished:false,
      isEmptyList:false,
      loading:false,
      userInfo: {},//个人用户信息
    }
  },
  created() {
    // this.init_data()
  },
  methods:{
    async getUserInfo () { //获取用户消息
      let self = this;
      let id = this.$store.getters.getUserId
			let queryParams = paramConvert({ "uId": id })
			let resData = await getUserInfo(queryParams, { "uId": id })
      if (resData.status === 200 && resData.data.Success) {
				self.userInfo = resData.data.Data;
        console.log('用户个人信息',self.userInfo)
			}
		},
    get_list_data() {
      return new Promise(r => {
        setTimeout(() => {
          this.i++
          if(this.pageIndex>5){
            r([])
          }else{
            var arr = [];
            for(var i=0;i<this.pageSize;i++){
              arr.push(i)
            }
            r(arr);
          }
        }, 500);
      });
    },
    init_data(){
      this.pageIndex = 1
      this.finished = false
      return this.list_data().then((res)=>{
        this.resultList = res;
        this.isEmptyList = res.length == 0
        return res
      })
    },
    list_data(){
      // if(this.loading){
      //   return Promise.reject('loading')
      // }
      this.loading=true
      return this.get_list_data()
      .then(res=>{
        this.pageIndex++
        this.finished = res.length < this.pageSize
        return res ||[]
      })
      .finally(()=>{
        this.loading = false
      })
    },
    loadTop() {
      return new Promise(r=>{
        setTimeout(()=>r(),500)
      }).then(()=>{
        return this.init_data();
      }).then((res)=>{
        this.$refs.loadmore && this.$refs.loadmore.onTopLoaded();
        return res
      })
    },
    loadBottom() {
      if (this.finished){
        return
      }
      return this.list_data().then((res)=>{
        this.resultList = this.resultList.concat(res)
        this.$refs.loadmore && this.$refs.loadmore.onBottomLoaded();
        return res
      })
    },
  },
}
