<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const { query } = router.currentRoute.value
router.replace({ path: (query as { path: string }).path })

</script>