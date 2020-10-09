<template>
  <div>
    <maxSelect />
    <el-button type="primary" style="margin-left: 16px;" @click="drawer = true">
      <el-input v-model="input" placeholder="请输入内容" />
    </el-button>

    <el-drawer
      title="我是标题"
      class="flexall"
      :visible.sync="drawer"
      :with-header="false"
      :direction="direction"
      size="60%"
    >
      <div class="content">
        <h3>地址</h3>
        <ul class="tabsTitle">
          <li v-for="(v,i) in editableTabs" :key="i" :class="i==tabIndex?'active':''" @click="titleChange(i)">{{ v.title }}</li>
        </ul>
        <ul class="tabSon">
          <li v-for="(v,i) in editableTabs" v-show="i==tabIndex" :key="i">
            <ul class="sonContent">
              <li v-for="item in v.content" :key="item.id" @click="change(i,item)">{{ item.name }}</li>
            </ul>
          </li>
        </ul>
      </div>

    </el-drawer>
    <div class="mixin">@mixin</div>
  </div>
</template>
<script>
import maxSelect from '../../components/Address/index';
import addJson from '@/components/Address/json/list.json';
import { getJie } from '@/components/Address/api/index.js';
export default {
  components: {
    maxSelect
  },
   data() {
      return {
        drawer: false,
        direction: 'btt',
        input: '',

      dbAddress: [],

        editableTabs: [{
          title: '省',
          content: ''
        }],
        tabIndex: 0
      };
    },
    computed: {
    getNewArr() {
      return (data, getup) => {
          for (const key in data) {
        getup.push({ id: key, name: data[key] }) ;
      }
      };
    },
    updataTabs() {
        return function(v, item, list, check, dbdress) {
          if (list.length > v + 1) {
                list.splice(v + 1, list.length - 1);
          }
          const options = ['市', '区', '街'];
          list.push({ title: options[v], content: v });
          this.tabIndex = v + 1;
          list[v].title = item.name;
          list[this.tabIndex].content = dbdress.filter(db => check.test(db.id));
        };
      }
  },

  mounted() {
    this.getDress();
  },
    methods: {
      getDress() {
      this.getNewArr(addJson, this.dbAddress);
      var shengCheck = /^[0-9]{2}0{4}$/;
     this.editableTabs[0].content = this.dbAddress.filter(item => shengCheck.test(item.id));
    },

      change(v, item) {
          var check = '';
          var list = this.editableTabs;
           if (this.tabIndex == 0) {
            check = new RegExp('^' + item.id.slice(0, 2) + '[0-9][1-9]0{2}$');
            this.updataTabs(v, item, list, check, this.dbAddress);
          } else if (this.tabIndex == 1) {
            check = new RegExp('^' + item.id.slice(0, 4) + '[0-9][1-9]$');
            this.updataTabs(v, item, list, check, this.dbAddress);
          } else if (this.tabIndex == 2) {
            getJie(item.id).then(res => {
              var jieData = [];
              this.getNewArr(res.data, jieData);
              check = new RegExp('');
              this.updataTabs(v, item, list, check, jieData);
            });
          }
      },
      titleChange(i) {
        this.tabIndex = i;
      }

    }
};
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
  .content{padding: 20px;  box-sizing: border-box; height: ceil(40%); display: flex; flex-direction: column;
    .tabsTitle{
    width: 100%; display: flex;
    padding: 10px 0;
    >li{margin-right: 30px;}
    li.active{color: rebeccapurple;}
    border-bottom: 2px solid #d8d8d8;
    }
    h3{text-align: center;}
    .tabSon{
      overflow-y:scroll;
      box-sizing: border-box;
       flex: 1;
      .sonContent{
        padding: 10px 0;
        >li{line-height: 2;}
      }
    }
  }
  .mixin{
    @include fontsize(24);
    @include width(10)
  }

</style>

