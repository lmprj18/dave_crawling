import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    bestItems: [
      {title: '여자친구 혼자사는 집에 갔는데 [71]', href: 'http://www.slrclub.com/bbs/vx2.php?id=best_article&no=274555', time: '01:28:26', symbol: 'slrclub'},
      {title: '싱숭생숭 하네요...욕좀 해주세요 헤헤헤 [74]', href: 'http://www.slrclub.com/bbs/vx2.php?id=best_article&no=274556', time: '02:13:51', symbol: 'slrclub'},
      {title: 'ㅊㅈ친구 생기면 주고 받을 명품들이에요. [47]', href: 'http://www.slrclub.com/bbs/vx2.php?id=best_article&no=274557', time: '07:13:02', symbol: 'slrclub'},
      {title: '철구PC방 진짜 근황  [38]', href: 'http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=771380', time: '2018-05-18 18:35:00', symbol: 'humoruniv'},
      {title: '제육대회 기념사진', href: 'http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=391959&s_no=391959&page=1', time: '18/05/19 01:47', symbol: 'todayhumor'}
    ]
  },
  mutations,
  getters,
  actions
})

export default store
