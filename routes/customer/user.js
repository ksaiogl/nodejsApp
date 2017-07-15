var TAG = "--- Customer Registraion ---    ";
var dbConfig = require('../../Environment/mongoDatabase.js');
var log = require('../../Environment/log4js.js');
var crypto = require("crypto");
var async = require('async');

exports.login = function(req, callback) {

  try {

    var logger = log.logger_cus;
    var db = dbConfig.mongoDbConn;

    logger.info(TAG + " inside login, input body: " + JSON.stringify(req.body))

    if(req.body.username && req.body.password){

        db.collection('User').findOne({"username":req.body.username,"password":req.body.password},{"_id":0},function(err,result){
            if(!err && result != null){
                req.session.customer = result;
                logger.error(TAG + "User Logged in successfully");
                var resJson = {
                  "http_code": "200",
                  "message": "User Logged in successfully",
                  "session":req.session.customer
                }
                return callback(true, resJson);
            } else if(!err && result == null){
                logger.error(TAG + "User Not Found");
                var resJson = {
                  "http_code": "404",
                  "message": "User Not Found"
                }
                return callback(true, resJson);
            } else {
                logger.error(TAG + "Error in login, error :" + err);
                var resJson = {
                  "http_code": "500",
                  "message": "Internal Server Error."
                }
                return callback(true, resJson);
            }
        })

    } else {
        logger.error(TAG + "Bad request");
        var resJson = {
          "http_code": "400",
          "message": "Bad request"
        }
        return callback(true, resJson);
    }

  } catch (e) {

    logger.error(TAG + "Exception in login, error :" + e.stack);
    var resJson = {
      "http_code": "500",
      "message": "Internal Server Error."
    }
    return callback(true, resJson);
  }
}

exports.register = function(req, callback) {

  try {

    var logger = log.logger_cus;
    var db = dbConfig.mongoDbConn;

    logger.info(TAG + " inside register, input body: " + JSON.stringify(req.body))

    if(req.body.username && req.body.password && req.body.mobile && req.body.email){

        db.collection('User').findOne({ $or: [ { "mobile": req.body.mobile }, { "email": req.body.email }, { "username": req.body.username } ] },function(err,result){
            if(!err && result == null){

                db.collection('User').insert(req.body,function(err,wResult){
                    if(!err){
                        req.session.customer = req.body
                        logger.error(TAG + "User Registered successfully");
                        var resJson = {
                          "http_code": "200",
                          "message": "User Registered successfully",
                          "session":req.session.customer
                        }
                        return callback(true, resJson);
                    } else {
                        logger.error(TAG + "Error in register, error :" + err.stack);
                        var resJson = {
                          "http_code": "500",
                          "message": "Internal Server Error."
                        }
                        return callback(true, resJson);
                    }
                })
            } else if(!err && result != null){
                logger.error(TAG + "User with this details Already Exists");
                var resJson = {
                  "http_code": "400",
                  "message": "User with this details Already Exists",
                  "deatils":result
                }
                return callback(true, resJson);
            } else {
                logger.error(TAG + "Error in register, error :" + err.stack);
                var resJson = {
                  "http_code": "500",
                  "message": "Internal Server Error."
                }
                return callback(true, resJson);
            }
        })

    } else {
        logger.error(TAG + "Bad request");
        var resJson = {
          "http_code": "400",
          "message": "Bad request"
        }
        return callback(true, resJson);
    }

  } catch (e) {

    logger.error(TAG + "Exception in register, error :" + e.stack);
    var resJson = {
      "http_code": "500",
      "message": "Internal Server Error."
    }
    return callback(true, resJson);
  }
}

exports.fetchCourses = function(req, callback) {

  try {

    var logger = log.logger_cus;
    var db = dbConfig.mongoDbConn;

    logger.info(TAG + " inside fetchCourses, input body: " + JSON.stringify(req.body))
    //console.log("req.session.customer: "+JSON.stringify(req.session.customer))
    //console.log("req.session: "+JSON.stringify(req.session))
    if(req.session.customer){
        var resJson = {
          "http_code": "200",
          "message": req.session.customer.courses
        }
        logger.error(TAG + "fetched Courses successfully");
        return callback(true, resJson);
    } else {
        logger.error(TAG + "Bad request,session is required");
        var resJson = {
          "http_code": "400",
          "message": "Bad request,session is required"
        }
        return callback(true, resJson);
    }

  } catch (e) {

    logger.error(TAG + "Exception in fetchCourses, error :" + e.stack);
    var resJson = {
      "http_code": "500",
      "message": "Internal Server Error."
    }
    return callback(true, resJson);
  }
}

exports.addCourse = function(req, callback) {

  try {

    var logger = log.logger_cus;
    var db = dbConfig.mongoDbConn;

    logger.info(TAG + " inside addCourse, input body: " + JSON.stringify(req.body))

    if(req.session.customer){

        if(req.body.course){
            db.collection('User').update({"mobile":req.session.customer.mobile},{ $push: { "courses": req.body.course } },function(err,result){
                if(!err){
                    db.collection('User').findOne({"mobile":req.session.customer.mobile},{"_id":0},function(err,result){
                        if(!err){
                            req.session.customer = result
                            var resJson = {
                              "http_code": "200",
                              "message": "Course added successfully"
                            }
                            logger.error(TAG + "Course added successfully");
                            callback(true, resJson);
                        } else {
                            logger.error(TAG + "Error updating session, error :" + err.stack);
                            var resJson = {
                              "http_code": "500",
                              "message": "Error updating session"
                            }
                            return callback(true, resJson);
                        }
                    }) 
                } else {
                    logger.error(TAG + "Error in adding Course, error :" + err.stack);
                    var resJson = {
                      "http_code": "500",
                      "message": "Internal Server Error."
                    }
                    return callback(true, resJson);
                }
            })
        } else {
            logger.error(TAG + "Bad request,course is required");
            var resJson = {
              "http_code": "400",
              "message": "Bad request,course is required"
            }
            return callback(true, resJson);
        }
    } else {
        logger.error(TAG + "Bad request,session is required");
        var resJson = {
          "http_code": "400",
          "message": "Bad request,session is required"
        }
        return callback(true, resJson);
    }

  } catch (e) {

    logger.error(TAG + "Exception in addCourse, error :" + e.stack);
    var resJson = {
      "http_code": "500",
      "message": "Internal Server Error."
    }
    return callback(true, resJson);
  }
}

exports.deleteCourse = function(req, callback) {

  try {

    var logger = log.logger_cus;
    var db = dbConfig.mongoDbConn;

    logger.info(TAG + " inside deleteCourse, input body: " + JSON.stringify(req.body))

    if(req.session.customer){

        if(req.body.course){
            db.collection('User').update({"mobile":req.session.customer.mobile},{ $pull: { "courses": req.body.course } },function(err,result){
                if(!err){
                    db.collection('User').findOne({"mobile":req.session.customer.mobile},{"_id":0},function(err,result){
                        if(!err){
                            req.session.customer = result
                            var resJson = {
                              "http_code": "200",
                              "message": "Course deleted successfully"
                            }
                            logger.error(TAG + "Course deleted successfully");
                            callback(true, resJson);
                        } else {
                            logger.error(TAG + "Error updating session, error :" + err.stack);
                            var resJson = {
                              "http_code": "500",
                              "message": "Error updating session"
                            }
                            return callback(true, resJson);
                        }
                    }) 
                } else {
                    logger.error(TAG + "Error in deleting Course, error :" + err.stack);
                    var resJson = {
                      "http_code": "500",
                      "message": "Internal Server Error."
                    }
                    return callback(true, resJson);
                }
            })
        } else {
            logger.error(TAG + "Bad request,course is required");
            var resJson = {
              "http_code": "400",
              "message": "Bad request,course is required"
            }
            return callback(true, resJson);
        }
    } else {
        logger.error(TAG + "Bad request,session is required");
        var resJson = {
          "http_code": "400",
          "message": "Bad request,session is required"
        }
        return callback(true, resJson);
    }

  } catch (e) {

    logger.error(TAG + "Exception in deleteCourse, error :" + e.stack);
    var resJson = {
      "http_code": "500",
      "message": "Internal Server Error."
    }
    return callback(true, resJson);
  }
}

exports.logout = function(req, callback) {

  try {

    var logger = log.logger_cus;
    var db = dbConfig.mongoDbConn;

    logger.info(TAG + " inside logout, input body: " + JSON.stringify(req.body))

    if(req.session.customer){
        //delete req.session.customer;
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            } else {
                console.log("-=-===========");
            }
        });            
        var resJson = {
          "http_code": "200",
          "message": "logged out successfully"
        }
        logger.error(TAG + "logged out successfully");
        return callback(true, resJson);
    } else {
        logger.error(TAG + "Bad request,session is required");
        var resJson = {
          "http_code": "400",
          "message": "Bad request,session is required"
        }
        return callback(true, resJson);
    }

  } catch (e) {

    logger.error(TAG + "Exception in logout, error :" + e.stack);
    var resJson = {
      "http_code": "500",
      "message": "Internal Server Error."
    }
    return callback(true, resJson);
  }
}