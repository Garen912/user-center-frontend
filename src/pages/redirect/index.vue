<template>
  <div></div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

// 获取路由实例
const router = useRouter()

// 获取当前路由的查询参数
const { query } = router.currentRoute.value

// 执行重定向
router.replace({ path: (query as { path: string }).path })
</script>