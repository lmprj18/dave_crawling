<template>
  <div id="portfolio">
     <v-container grid-list-xl text-xs-center>
       <v-flex xs1>
         <v-btn small slot="activator" class="mb-2 new" :to="'/newpf'">
          <v-icon>border_color</v-icon>new
         </v-btn>
       </v-flex>
       <v-flex xs12>
        <!-- Tables -->
        <template>
          <v-card>
            <v-card-title>
              Portfolio
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-card-title>
            
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.index }}</td>
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.overview }}</td>
                <td class="text-xs-left">{{ props.item.writer }}</td>
                <td class="text-xs-left">{{ tableDateFormat(props.item.created) }}</td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </template>
      </v-flex>
     </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      headers: [
          { text: 'Index', align: 'left', sortable: true, value: 'index'},
          { text: 'Project', sortable: true, value: 'name'},
          { text: 'Overview', sortable: true, value: 'overview' },
          { text: 'Writer', sortable: false, value: 'writer' },
          { text: 'Created', value: 'created' }
        ],
        items: [
          {
            index: 1,
            value: false,
            name: '프로젝트1',
            overview: '프로젝트1의 개요',
            writer: 'Dave',
            comments: 0,
            vote: 0,
            created: new Date()
          },
          {
            index: 2,
            value: false,
            name: '프로젝트2',
            overview: '프로젝트2의 개요',
            writer: 'Dave',
            comments: 0,
            vote: 0,
            created: new Date()
          },
          {
            index: 3,
            value: false,
            name: '프로젝트3',
            overview: '프로젝트3의 개요',
            writer: 'Dave',
            comments: 0,
            vote: 0,
            created: new Date()
          },
          {
            index: 4,
            value: false,
            name: '프로젝트4',
            overview: '프로젝트4의 개요',
            writer: 'Dave',
            comments: 0,
            vote: 0,
            created: new Date()
          },
          {
            index: 5,
            value: false,
            name: '프로젝트5',
            overview: '프로젝트5의 개요',
            writer: 'Dave',
            comments: 0,
            vote: 0,
            created: new Date()
          },
          {
            index: 6,
            value: false,
            name: '프로젝트6',
            overview: '프로젝트6의 개요',
            writer: 'Dave',
            comments: 0,
            vote: 0,
            created: new Date()
          },
          {
            index: 7,
            value: false,
            name: '프로젝트7',
            overview: '프로젝트7의 개요',
            writer: 'Dave',
            comments: 0,
            vote: 0,
            created: new Date()
          }
        ]
    }
  },
  methods: {
    tableDateFormat (d) {
      const t = new Date(d);
      const month  = (t.getMonth()+1).toString();
      const mm = (month.length === 1) ? '0' + month : month
      const date = t.getDate();
      const dd = (date.length === 1) ? '0' + date : date
      return mm + '.' + dd
    }
  }
}
</script>

<style lang="css" scoped>
.new {
  margin-left: 0px;
}
.icon {
  font-size: 13px;
  margin-right: 10px;
}
</style>
