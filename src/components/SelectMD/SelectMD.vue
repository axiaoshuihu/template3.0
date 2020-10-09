<template>
  <div class="selectMenDian">
    <el-dialog
      title="选择门店"
      :visible.sync="isAddMenDian"
      :before-close="handleClose"
      @open="open"
    >
      <div class="quList">
        <div class="quanxuan">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
        </div>
        <div style="margin: 8px 0;" />
        <el-checkbox-group

          v-model="checkedQus"
          @change="handleCheckedQusChange"
        >
          <el-checkbox
            v-for="(qu) in quOptions"
            :key="qu.quId"
            :label="qu.quId"
          >{{ qu.quName }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-transfer
        target-order="unshift"
        :value="selectArr"
        style="text-align: left; display: inline-block"
        filterable
        :left-default-checked="[]"
        :right-default-checked="[]"
        :titles="['全选','全选']"
        :button-texts="['删除', '添加']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="dianArr"
        @change="handleSelectArrChange"
      >
        <span slot-scope="{ option }">{{ option.label }}</span>
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// qu是店群注意
import { getAllQus, getAllMenDianByQus } from '@/api/huodong.js';
import { getZDmd, getZDAllQu } from '@/views/huodong/util.js';
export default {
    name: 'Selectmendian',
    props: {
        'isAddMenDian': Boolean,
         'defaultObj': {
             type: Object,
             default: () => {}
         }
    },
    data() {
      return {
        dianArr: [],
        selectArr: [],
        selectArrObj: [],
        isIndeterminate: false,
        quOptions: [],
        checkAll: false,
        checkedQus: []
      };
    },
    watch: {
        'checkedQus': {
           async handler(val, oldVal) {
                if (val.length <= 0) {
                    this.dianArr = [];
                } else {
                    await this.getAllMenDianByQus();
                }
                const ids = this.dianArr.map(_ => _.mdId);
                const arr = this.selectArrObj.filter(item => !ids.includes(item.mdId));
                this.dianArr = [...this.dianArr, ...arr];
                if (JSON.stringify(this.defaultObj) !== '{}') {
                        // 可能是新增店铺 可能是编辑店铺
                       if (this.defaultObj.isDisabled) {
                           // 只能是新增店铺
                            this.dianArr = this.dianArr.map(item => {
                                if (this.defaultObj.selectedMds.includes(item.mdId)) {
                                    item.disabled = true;
                                }
                                return item;
                            });
                        }
                 }
           },
           immediate: true,
           deep: true
        }
    },
    created() {

    },
    methods: {
         open() {
                this.init();
                this.getAllQu();
                if (JSON.stringify(this.defaultObj) !== '{}') {
                this.checkedQus = [...this.defaultObj.selectedQus];
                this.selectArr = [...this.defaultObj.selectedMds];
                this.selectArrObj = [...this.defaultObj.selectedMdObjs];
                this.handleCheckedQusChange(this.checkedQus);
            }
        },
        init() {
            this.dianArr = [];
            this.checkedQus = [];
            this.checkAll = false;
            this.selectArr = [];
            this.selectArrObj = [];
            this.isIndeterminate = false;
            this.quOptions = [];
        },
        handleClose() {
            this.$emit('closeAddMenDian');
            this.init();
        },
        handleConfirm() {
            // this.$emit('confirmAddMenDian', this.selectArr);
            this.$emit('confirmAddMenDian', this.selectArr, this.selectArrObj);
            this.init();
        },
        handleSelectArrChange(value, direction, movedKeys) {
            console.log(this.dianArr);

            this.selectArrObj = this.dianArr.filter(item => {
                console.log(item.key);
                if (value.includes(item.key)) {
                    return true;
                } else {
                    return false;
                }
            });
            this.selectArr = value;

            console.log(value, direction, movedKeys);
        },
        handleCheckAllChange(val) {
            this.checkedQus = val ? this.quOptions.map(item => item.quId) : [];
            console.log(val ? this.quOptions.map(item => item.quId) : [], this.checkedQus);
            this.isIndeterminate = false;
        },
        // 点击单个区的时候  判断是否达到全选状态
        handleCheckedQusChange(value) {
            const checkedCount = value.length;
            this.checkAll = checkedCount === this.quOptions.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.quOptions.length;
        },
        async getAllMenDianByQus() {
            this.dianArr = [];
            const { code, data } = await getAllMenDianByQus({
                shop_group_ids: this.checkedQus.join(',')
            });
            if (code === 200) {
                if (Array.isArray(data) && data.length > 0) {
                    this.dianArr = getZDmd(data, 'all');
                } else {
                    this.dianArr = data;
                }
            }
        },
        async getAllQu() {
            const { code, data } = await getAllQus();
            if (code === 200) {
                if (Array.isArray(data) && data.length > 0) {
                    this.quOptions = getZDAllQu(data);
                } else {
                    this.quOptions = data;
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog{
     display: flex;
     flex-direction: column;
     width:50%;
     height:60%;
     .el-dialog__body{
         flex:1;
         display: flex;
         overflow-y: hidden;
        .quList{
            width:30%;
            margin-right:20px;
            border: 1px solid #EBEEF5;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            .quanxuan{
                padding-left:20px;
                background: #F5F7FA;
                .el-checkbox{
                    display: block;
                    .el-checkbox__label{
                        font-size: 16px;
                        color: #303133;
                        font-weight: 400;
                        line-height: 40px;
                    }

                }
            }
            .el-checkbox-group{
                flex:1;
                overflow-y:scroll;
                padding-left:20px;
                .el-checkbox{
                    display: block;
                    &:hover{
                        .el-checkbox__label{
                            color:#409EFF;
                        }
                    }
                    .el-checkbox__label{
                        font-size:14px;
                        font-weight: 500;
                        line-height: 30px;
                        color:#606266;
                    }
                }
            }

        }
        .el-transfer{
         flex:1;
         display: flex!important;
         .el-transfer-panel{
             width:40%;
             display: flex;
             flex-direction: column;
             .el-transfer-panel__body{
                 flex:1;
                 display: flex;
                 flex-direction: column;
                .el-checkbox-group{
                 &.is-filterable{
                    flex:1;
                 }
                    flex:1;
                }
             }
         }
         .el-transfer__buttons{
             display: flex;
             flex-direction: column;
             justify-content: center;
             flex:1;
            .el-transfer__button:first-child{
                margin-bottom: 20px;
            }
             .el-button+.el-button{
                 margin-left:0px ;
             }
         }
        }
    }
}
</style>
