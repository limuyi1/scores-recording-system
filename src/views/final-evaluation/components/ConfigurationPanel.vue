<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
  fontSize: 12, // 整体字号
  salutationFontSize: 12, // 问候语字号
  textFontSize: 12, // 正文字号
  sealFontSize: 12, // 印章字号
  classTeacherFontSize: 12, // 班主任字号
  inscribeFontSize: 12, // 落款字号
  inscribe: '' // 签名名称
})
const activeNames = reactive([])
</script>

<template>
  <el-card shadow="always">
    <template #header>页面配置</template>
    <el-form ref="form" label-position="top" label-width="100px" :model="formData">
      <el-collapse class="configuration-collapse__wrapper" v-model="activeNames">
        <el-collapse-item title="字体配置" name="configuration">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="整体字号">
                <el-input-number
                  style="width: 100%"
                  v-model="formData.fontSize"
                  size="large"
                  :min="12"
                  :max="22"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="问候语字号">
                <el-input-number
                  style="width: 100%"
                  v-model="formData.salutationFontSize"
                  size="large"
                  :min="12"
                  :max="22"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="正文字号">
                <el-input-number
                  style="width: 100%"
                  v-model="formData.textFontSize"
                  size="large"
                  :min="12"
                  :max="22"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="学校（章）字号">
                <el-input-number
                  style="width: 100%"
                  v-model="formData.sealFontSize"
                  size="large"
                  :min="12"
                  :max="22"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班主任字号">
                <el-input-number
                  style="width: 100%"
                  v-model="formData.classTeacherFontSize"
                  size="large"
                  :min="12"
                  :max="22"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="落款字号">
                <el-input-number
                  style="width: 100%"
                  v-model="formData.inscribeFontSize"
                  size="large"
                  :min="12"
                  :max="22"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8"> </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="落款名称">
            <el-input style="width: 100%" v-model="formData.inscribe" size="large"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.configuration-collapse__wrapper {
  margin-bottom: 16px;
}
</style>
