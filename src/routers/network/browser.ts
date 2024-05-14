import axios from 'axios'
const bitApi = 'http://127.0.0.1:54345'
export default {
  bit: {
    lst: async () => {
      const r = await axios.post(bitApi + '/browser/list', { page: 0, pageSize: 100 })
      const result = r.data.data.list.map((item) => {
        return {
          _id: item.id,
          id: item.seq,
          name: item.name,
          remark: item.remark,
          lastRunTime: new Date(item.operTime).getTime()
        }
      })
      return result
    }
  }
}
