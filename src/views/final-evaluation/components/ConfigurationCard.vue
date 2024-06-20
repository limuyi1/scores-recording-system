<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'

import { exportPDF } from '@/untils/pdfUntil'

import { useConfigurationStore } from '@/stores/configuration'

const store = useConfigurationStore()
const { data: formData } = storeToRefs(store)

const activeNames = reactive([])

const printFun = () => {
  const doms = document.getElementsByClassName('evaluation-card__wrapper')
  exportPDF(doms, formData.value.pageType)
}

const fontChange = (fontSize: number) => {
  store.fontSizeChange(fontSize)
}
</script>

<template>
  <el-card class="configuration-card__wrapper" shadow="always">
    <template #header>
      <div class="configuration-card--header">
        <span style="margin-right: 8px">配置</span>
        <el-tooltip effect="dark" content="导出PDF" placement="top">
          <el-button type="primary" size="small" icon="Printer" circle @click="printFun" />
        </el-tooltip>
      </div>
    </template>
    <el-form ref="form" label-position="top" :model="formData">
      <el-collapse class="configuration-collapse__wrapper" v-model="activeNames">
        <el-collapse-item title="基础配置" name="configuration">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="整体字号">
                <el-input-number
                  style="width: 100%"
                  v-model="formData.fontSize"
                  :min="12"
                  :max="22"
                  @change="fontChange"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="问候语字号">
                <el-input-number
                  style="width: 100%"
                  v-model="formData.salutationFontSize"
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
                  :min="12"
                  :max="22"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8"> </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="页面类型">
                <el-select
                  v-model="formData.pageType"
                  placeholder="请选择页面类型"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in formData.pageTypeList"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="落款名">
            <el-input
              style="width: 100%"
              v-model="formData.inscribe"
              size="large"
              show-word-limit
              :minlength="1"
              :maxlength="6"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.configuration-card__wrapper {
  margin-bottom: 16px;

  .configuration-card--header {
    display: flex;
    align-items: center;
  }

  .configuration-collapse__wrapper {
    margin-bottom: 16px;
  }
}
</style>
