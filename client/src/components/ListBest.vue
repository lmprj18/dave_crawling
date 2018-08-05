<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.title"
              avatar
              ripple
              @click="toggle(index)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <!-- <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title> -->
                <v-list-tile-sub-title>{{ item.href }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.time }}</v-list-tile-action-text>
                <v-icon
                  v-if="selected.indexOf(index) < 0"
                  color="grey lighten-1"
                >star_border</v-icon>
                <v-icon
                  v-else
                  color="yellow darken-2"
                >star</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="true" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      selected: [2],
      items: [
        {title: '여자친구 혼자사는 집에 갔는데 [71]', href: 'http://www.slrclub.com/bbs/vx2.php?id=best_article&no=274555', time: '01:28:26', symbol: 'slrclub'},
        {title: '싱숭생숭 하네요...욕좀 해주세요 헤헤헤 [74]', href: 'http://www.slrclub.com/bbs/vx2.php?id=best_article&no=274556', time: '02:13:51', symbol: 'slrclub'},
        {title: 'ㅊㅈ친구 생기면 주고 받을 명품들이에요. [47]', href: 'http://www.slrclub.com/bbs/vx2.php?id=best_article&no=274557', time: '07:13:02', symbol: 'slrclub'},
        {title: '철구PC방 진짜 근황  [38]', href: 'http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=771380', time: '2018-05-18 18:35:00', symbol: 'humoruniv'},
        {title: '제육대회 기념사진', href: 'http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=391959&s_no=391959&page=1', time: '18/05/19 01:47', symbol: 'todayhumor'}
      ]
    }
  },
  methods: {
    toggle (index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    }
  }
}
</script>
