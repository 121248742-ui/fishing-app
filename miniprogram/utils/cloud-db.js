var db = null
try {
  wx.cloud.init({ env: 'cloudbase-d1gq1v8xl0c056a2a' })
  db = wx.cloud.database()
} catch(e) {}
var _ = db ? db.command : null

// ===== POSTS =====
function getPosts(success, fail) {
  if (!db) return fail && fail()
  db.collection('posts').orderBy('createTime', 'desc').limit(100).get({
    success: function(r) { success(r.data) },
    fail: fail
  })
}

function addPost(data, success, fail) {
  if (!db) return fail && fail()
  data.createTime = new Date()
  data.comments = []
  data.likes = 0
  data.likedBy = []
  db.collection('posts').add({ data: data, success: success, fail: fail })
}

function updatePost(id, data, success, fail) {
  if (!db) return fail && fail()
  db.collection('posts').doc(id).update({ data: data, success: success, fail: fail })
}

function removePost(id, success, fail) {
  if (!db) return fail && fail()
  db.collection('posts').doc(id).remove({ success: success, fail: fail })
}

// ===== COMMENTS (stored on post) =====
function addComment(postId, comment, success, fail) {
  if (!db) return fail && fail()
  db.collection('posts').doc(postId).get({
    success: function(r) {
      var comments = r.data.comments || []
      comments.push({ text: comment.text, userName: comment.userName, replyTo: comment.replyTo || '', createTime: new Date() })
      db.collection('posts').doc(postId).update({ data: { comments: comments }, success: success, fail: fail })
    },
    fail: fail
  })
}

// ===== ATLAS =====
function saveAtlas(userId, data, success, fail) {
  if (!db) return fail && fail()
  db.collection('atlas').where({ userId: userId }).get({
    success: function(r) {
      if (r.data.length) db.collection('atlas').doc(r.data[0]._id).update({ data: { fishes: data } })
      else db.collection('atlas').add({ data: { userId: userId, fishes: data, createTime: new Date() } })
      if (success) success()
    },
    fail: fail
  })
}

function getAtlas(userId, success, fail) {
  if (!db) return fail && fail()
  db.collection('atlas').where({ userId: userId }).get({
    success: function(r) { success(r.data.length ? r.data[0].fishes : {}) },
    fail: fail
  })
}

module.exports = { getPosts, addPost, updatePost, removePost, addComment, saveAtlas, getAtlas }
