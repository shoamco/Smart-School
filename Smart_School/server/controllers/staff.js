
var Staff = require('../models/staff');
// Wrap all the methods in an object

var staff = {
    read: function(req, res, next){
        res.json({type: "Read", id: req.params.id});
    },
    create: function(req, res, next){
        res.send(req.body);
    },
    update: function(req, res, next){
        res.json({type: "Update", id: req.params.id, body: req.body });
    },
    delete: function(req, res, next){
        res.json({type: "Delete", id: req.params.id});
    },
    getAll: function(req, res, next){
        Staff.find(function(err, data){
            if(err) console.error;
            res.json(data);
        })
    },
    getAll: function(req, res, next){
        Staff.find({user:req.params.user,password:req.params.password},function(err, data){
        if(err) console.error;
      res.json(data);
    })
}

}

// Return the object
module.exports =staff;
