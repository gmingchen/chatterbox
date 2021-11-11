<template>
  <div>
    <el-button type="text" class="add-group-btn" @click="addGroup">添加分组</el-button>
    <el-collapse v-model="active" accordion>
      <el-collapse-item
        v-for="(item, index) in data"
        :key="index">
        <template #title>
          <div class="group-name-box">
            <div class="group-icon-btn-group" v-show="item.can_deleted === 1">
              <span class="iconfont icon-fork" @click.stop="removeHandle(index, item[options.key])" />
            </div>
            <div class="group-name padding_l-25 ellipse-1">
              {{item[options.label]}}
            </div>
          </div>
        </template>
        <slot :index="index" :row="item" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  emits: ['onAdd', 'onDelete'],
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {
        return {
          label: 'name',
          key: 'id'
        }
      }
    }
  },
  setup(_props, { emit }) {
    const active = ref()

    /**
     * @description: 添加分组
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const addGroup = () => {
      ElMessageBox.prompt('请输入分组名称', '添加分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '分组名称不能为空'
      }).then(({ value }) => {
        emit('onAdd', value)
      }).catch(() => {
        //
      })
    }

    /**
     * @description: 删除分组
     * @param {*} index 索引
     * @param {*} id 主键
     * @return {*}
     * @author: gumingchen
     */
    const removeHandle = (index, id) => {
      ElMessageBox.confirm('此操作将永久删除该分组，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        emit('onDelete', { index, id })
      }).catch(() => {
        //
      })
    }
    return {
      active,
      addGroup,
      removeHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
.el-collapse, ::v-deep(.el-collapse-item__header), ::v-deep(.el-collapse-item__wrap) {
  border: none;
}
::v-deep(.el-collapse-item__header), ::v-deep(.el-collapse-item__wrap) {
  background-color: transparent;
}
::v-deep(.el-collapse-item__header:hover) {
  background-color: $darkColor-3;
}
::v-deep(.el-collapse-item__arrow) {
  color: $darkColor-6;
}
.add-group-btn {
  color: $darkColor-6;
  &:hover {
    color: $activeColor;
  }
}
.group-name-box {
  position: relative;
  display: flex;
  width: 100%;
  text-align: left;
  .group-name {
    color: $lightColor-1;
    flex: 1;
  }
  .group-icon-btn-group {
    position: absolute;
    left: -30px;
    width: 20px;
    color: $darkColor-6;
    transition: .2s;
    .iconfont {
      font-size: 12px;
    }
    .icon-fork:hover {
      color: $warmColor;
    }
  }
  &:hover {
    .group-icon-btn-group {
      left: 5px;
    }
  }
}

</style>
