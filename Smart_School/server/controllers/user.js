var Users  = require('../models/users');
var Classes  = require('../models/classes');
// Wrap all the methods in an object

var user = {
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
    Users.find(function(err, data){
      if(err) console.error;
      res.json(data);
    })
  },   
  getUser: function(req, res, next){
      Users.findOne({UserId:req.body.user,password:req.body.password},function(err, data){
        if(err) console.error;
        res.json(data);
        })
    } ,
    updatePassword: function(req, res, next){
        Users.find({user:req.body.user,password:req.body.password},function(err, data){
            if(err) console.error;
            res.json({type: "Update", id: data.id, password: req.body.newPassword });

        });
            //res.json(data)

    },
    // updateStaff: function(req, res, next){
    //
    //     var myUserId=req.body.UserOriginalId;
    //
    //         if (err) return console.error(err);
    //         console.log(data1.UserId);
    //         console.log(req.body.UserId);
    //         if (data1.UserName != req.body.UserName)
    //             console.log("i am in update name");
    //             Users.findOneAndUpdate({UserId: myUserId}, {
    //                 UserName: req.body.UserName,
    //                 UserId: req.body.UserId,
    //                 Type: req.body.Type
    //             },
    //
    //                 function (err, data) {
    //                 if (err) return console.error(err);
    //
    //             });
    //
    // },
        //});
    updateStaff: function(req, res, next) {
        console.log("update staff ");
        Users.findOne({UserId: req.body.UserOriginalId},function (err, data1) {
            if (err) return console.error(err);
        Users.findOneAndUpdate({UserId: req.body.UserOriginalId}, {
            UserName: req.body.UserName,
            Type: req.body.Type

        }, function (err, data) {
            if (err) return console.error(err);
            console.log(req.body.UserOriginalId);
            console.log("update staff ");
            console.log("update staff ");
            console.log("update staff ");

            res.send("המשתמש עודכן");
        });});
    },
    createStuff:function(req, res, next){
        Users.findOne({UserId: req.body.UserId},function (err, data3) {
            if (err) return console.error(err);
            if (data3 == null) {
                Users.create({
                    UserName: req.body.UserName,
                    UserId: req.body.UserId,
                    Type: req.body.Type,
                    password: req.body.password
                }, function (err, data) {
                    if (err) return console.error(err);
                    res.send("איש הצוות נכנס למערכת");
                });
            }
            else
                res.send("איש צוות כבר קיים במערכת");

        });
    },
    deleteUser:function(req, res, next) {
        console.log("in server  delete" + req.body.UserId);
        Users.findOne({UserId: req.body.UserId}, function (err, data) {
            if (err) return console.error(err);
            else if (data == null)

                console.log("the stuff " + req.body.UserId + " not  exists");
            //}
            else {
                var if_exist=0;
                Classes.find(function(err, data) {
                        data.forEach(function (dataClasses, index) {

                           if(dataClasses.EducatorId==req.body.UserId||dataClasses.CoordinatorId==req.body.UserId)
                               if_exist=1;

                           else
                               for (var j = 0;if_exist==0&& j < dataClasses.Courses.length; j++) {

                                 if(dataClasses.Courses.TeacherId==req.body.UserId)
                                      if_exist=1;
                            }
                });
                    if(if_exist==1)
                        res.send("יש לעדכן בכיתות ובקורסים");
                    else
                        Users.remove({UserId: req.body.UserId}, function(err) {
                            if (!err) {
                                console.log("the staff"+req.body.UserId+ " delete from the users list");
                                res.send("איש הצוות נמחק");
                            }
                            else {
                                console.log("erro");
                            }
                        });

                  });
            }
        });
    }
}

// Return the object
module.exports = user;
