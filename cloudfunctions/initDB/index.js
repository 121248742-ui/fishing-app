const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async () => {
  const cols = ['posts', 'comments', 'likes', 'atlas']
  const results = []
  for (const name of cols) {
    try {
      await db.createCollection(name)
      results.push(name + ': created')
    } catch (e) {
      if (e.errCode === -1) results.push(name + ': already exists')
      else results.push(name + ': ' + e.message)
    }
  }
  return { ok: true, results }
}
