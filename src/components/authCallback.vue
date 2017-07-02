<script>
import {getAccessToken, setConvertToken} from '../utils/auth'
export default {
  mounted () {
    this.$nextTick(() => {
      new Promise((resolve, reject) => {
        resolve(getAccessToken())
      }).then(r => setConvertToken(r))
    })
  }
}
</script>
