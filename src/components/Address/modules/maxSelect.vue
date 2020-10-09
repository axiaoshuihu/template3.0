<template>
  <div>
    <el-select v-model="address.sheng" :disabled="options.sheng.length==0" placeholder="请选择省" class="hidden-sm-and-down" @change="shengChange">
      <el-option
        v-for="item in options.sheng"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="address.shi" :disabled="options.shi.length==0" placeholder="请选择城市" class="hidden-sm-and-down" @change="shiChange">
      <el-option
        v-for="item in options.shi"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="address.qu" :disabled="options.qu.length==0" placeholder="请选择区域/县" class="hidden-sm-and-down" @change="quChange">
      <el-option
        v-for="item in options.qu"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="address.jie" :disabled="options.jie.length==0" placeholder="请选择街道" class="hidden-sm-and-down">
      <el-option
        v-for="item in options.jie"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
import { getJie } from '@/components/Address/api/index.js';
export default {
    props: ['options', 'address'],
    data() {
        return {
            maxoptions: {
                sheng: [],
                shi: []
            }
        };
    },
    computed: {
    getNewArr() {
      return (data, getup) => {
          for (const key in data) {
        getup.push({ id: key, name: data[key] }) ;
      }
      };
    }
  },
    methods: {
        shengChange() {
      var check = new RegExp('^' + this.address.sheng.slice(0, 2) + '[0-9][1-9]0{2}$');
      this.allChange('shi', check);
      this.shiChange();
        console.log(this.address.sheng);
    },
    shiChange(data) {
      var check = new RegExp('^' + this.address.shi.slice(0, 4) + '[0-9][1-9]$');
      this.allChange('qu', check);
      this.quChange();
    },
    async quChange() {
      await getJie(String(this.address.qu)).then(res => {
        var arr = [];
         this.getNewArr(res.data, arr);
         this.options.jie = arr;
         this.address.jie = this.options.jie[0].id;
      });
    },
    allChange(next, check) {
      this.options[next] = this.dbAddress.filter(item => check.test(item.id));
      this.address[next] = this.options[next][0].id;
    }
    }
};
</script>
