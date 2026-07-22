var db = null
try { db = wx.cloud.database() } catch(e) {}

function getDB() { return db }

// Posts
function getPosts(success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  db.collection('posts').orderBy('createTime', 'desc').limit(100).get({
    success: function(res) { success(res.data) },
    fail: fail
  })
}

function addPost(post, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  db.collection('posts').add({
    data: Object.assign({}, post, { createTime: new Date() }),
    success: success,
    fail: fail
  })
}

function updatePost(id, data, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  db.collection('posts').doc(id).update({ data: data, success: success, fail: fail })
}

function removePost(id, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  db.collection('posts').doc(id).remove({ success: success, fail: fail })
}

// Comments
function addComment(postId, comment, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  db.collection('comments').add({
    data: { postId: postId, text: comment.text, userName: comment.userName, replyTo: comment.replyTo || '', createTime: new Date() },
    success: success, fail: fail
  })
}

function getComments(postId, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  db.collection('comments').where({ postId: postId }).orderBy('createTime', 'asc').get({
    success: function(res) { success(res.data) },
    fail: fail
  })
}

// Likes
function toggleLike(postId, userId, isLiked, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  var coll = db.collection('likes')
  if (isLiked) {
    coll.add({ data: { postId: postId, userId: userId, createTime: new Date() }, success: success, fail: fail })
  } else {
    coll.where({ postId: postId, userId: userId }).remove({ success: success, fail: fail })
  }
}

// Atlas
function saveAtlas(userId, data, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  db.collection('atlas').where({ userId: userId }).get({
    success: function(res) {
      if (res.data.length) {
        db.collection('atlas').doc(res.data[0]._id).update({ data: { fishes: data }, success: success, fail: fail })
      } else {
        db.collection('atlas').add({ data: { userId: userId, fishes: data, createTime: new Date() }, success: success, fail: fail })
      }
    },
    fail: fail
  })
}

function getAtlas(userId, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  db.collection('atlas').where({ userId: userId }).get({
    success: function(res) { success(res.data.length ? res.data[0].fishes : {}) },
    fail: fail
  })
}

module.exports = { getPosts, addPost, updatePost, removePost, addComment, getComments, toggleLike, saveAtlas, getAtlas, getDB }
