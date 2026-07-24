var db = null
try {
  wx.cloud.init({ env: 'cloudbase-d1gq1v8xl0c056a2a' })
  db = wx.cloud.database()
} catch(e) {}
var _ = db ? db.command : null

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

// ===== FISHING SPOTS =====
function getSpots(success, fail) {
  if (!db) return fail && fail()
  db.collection('fishing_spots').orderBy('createTime', 'desc').limit(200).get({
    success: function(r) { success(r.data) },
    fail: fail
  })
}

function addSpot(data, success, fail) {
  if (!db) return fail && fail()
  data.createTime = db.serverDate()
  db.collection('fishing_spots').add({ data: data, success: success, fail: fail })
}

// ===== USER SPOTS (personal weather spots, visible to all) =====
function getAllUserSpots(success, fail) {
  if (!db) return fail && fail()
  db.collection('user_spots').limit(500).get({
    success: function(r) { success(r.data) },
    fail: fail
  })
}

function saveUserSpots(userId, spots, success, fail) {
  if (!db) return fail && fail()
  db.collection('user_spots').where({ userId: userId }).get({
    success: function(r) {
      if (r.data.length) {
        db.collection('user_spots').doc(r.data[0]._id).update({ data: { spots: spots } })
      } else {
        db.collection('user_spots').add({ data: { userId: userId, spots: spots, createTime: new Date() } })
      }
      if (success) success()
    },
    fail: fail
  })
}

module.exports = { saveAtlas, getAtlas, getSpots, addSpot, getAllUserSpots, saveUserSpots }
