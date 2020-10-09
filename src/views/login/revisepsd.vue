<template>
  <div class="box">
    <el-row style="width: 500px;">
      <el-col :span="24">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-position="left"
          label-width="120px"
          class="ruleForm"
        >
          <el-form-item
            label="原密码:"
            prop="old"
          >
            <el-input
              v-model.number="ruleForm.old"
              clearable
              type="password"
            />
          </el-form-item>
          <el-form-item
            label="新密码:"
            prop="pass"
          >
            <el-input
              v-model="ruleForm.pass"
              clearable
              type="password"
            />
          </el-form-item>
          <el-form-item
            label="确认密码:"
            prop="checkPass"
          >
            <el-input
              v-model="ruleForm.checkPass"
              clearable
              type="password"
            />
          </el-form-item>
        </el-form>
        <div class="btns">
          <el-button
            @click="resetForm('ruleForm')"
          >重置</el-button>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >提交</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { changePassword } from '@/api/user';
export default {
  data() {
    const checkold = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原密码不能为空'));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        old: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validateNewPass, trigger: 'blur' }
        ],
        old: [
          { validator: checkold, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (this.ruleForm.pass !== this.ruleForm.checkPass) {
        return this.$message.info('两次密码输入不一致');
      } else {
        changePassword({ password: this.ruleForm.pass }).then(({ msg }) => {
          this.$message.success(msg);
          this.resetForm('ruleForm');
          this.logout();
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async logout() {
      this.$message.success(await this.$store.dispatch('user/logout'));
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  padding: 30px;
  .ruleForm {
    width: 100%;
  }
  .btns {
    width: 200px;
    margin: 0 auto;
  }
}
</style>
