var db = null
try {
  wx.cloud.init({ env: 'cloudbase-d1gq1v8xl0c056a2a' })
  db = wx.cloud.database()
  console.log('Cloud DB initialized')
} catch(e) {
  console.error('Cloud DB init failed:', e)
}

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

// Comments - stored directly on post document
function addComment(postId, comment, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  // Get current comments, append new one, update post
  db.collection('posts').doc(postId).get({
    success: function(res) {
      var comments = res.data.comments || []
      comments.push({
        text: comment.text, userName: comment.userName,
        replyTo: comment.replyTo || '', createTime: new Date()
      })
      db.collection('posts').doc(postId).update({
        data: { comments: comments },
        success: success, fail: fail
      })
    },
    fail: function(err) {
      // Fallback: try adding to comments collection
      db.collection('comments').add({
        data: { postId: postId, text: comment.text, userName: comment.userName, replyTo: comment.replyTo || '', createTime: new Date() },
        success: success, fail: fail
      })
    }
  })
}

function getComments(postId, success, fail) {
  if (!db) { fail && fail('no cloud'); return }
  // First try post document
  db.collection('posts').doc(postId).get({
    success: function(res) {
      if (res.data.comments && res.data.comments.length) {
        success(res.data.comments)
      } else {
        // Try comments collection
        db.collection('comments').where({ postId: postId }).orderBy('createTime', 'asc').get({
          success: function(r2) { success(r2.data) },
          fail: fail
        })
      }
    },
    fail: function() {
      db.collection('comments').where({ postId: postId }).orderBy('createTime', 'asc').get({
        success: function(r2) { success(r2.data) },
        fail: fail
      })
    }
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
