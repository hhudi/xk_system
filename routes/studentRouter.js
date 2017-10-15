var express = require('express');
var studentDB = require('../db/studentDB');
var studentRouter = express.Router();
var querystring = require('querystring');
var url = require('url');

studentRouter.get("/findAll",function (req,resp) {
	studentDB.findAll(function (results) {
		resp.json(results);
	});
	/*resp.writeHead(200,'ok',{"Content-Type":"text/plain;charset=utf-8","Access-Control-Allow-Origin":"*"});
	studentDB.findAll(function (results) {
		console.log(results);
		resp.write(JSON.stringify(results));
		resp.end();
	});*/
});
studentRouter.post("/findById",function (req,resp) {
	var id = req.body.val;
	console.log(id);
	studentDB.findById(id,function (results) {
		resp.json(results);
	});
});

studentRouter.post("/batchDelete",function (req,resp) {
	var ids = req.body.ids;
	console.log('ids:', ids);
	studentDB.batchDelete(ids,function (result) {
		resp.json(result);
	});
});
studentRouter.post("/updateById",function (req,resp) {
	//console.log(req);
	var id = +req.body.id;
	var name=  req.body.name;
	var gender = req.body.gender;
	var birth = req.body.birth;
	if(gender=='male'){
		gender = "男";
	}else{
		gender = "女";
	}
	console.log("~~~~~~~~~~~~~~~~~");
	console.log(id,name,gender,birth);
	studentDB.updateById(id,name,gender,birth,function (result) {
		console.log("啦啦啦r",id,name,gender,birth);
		resp.json(result);
	});
});

studentRouter.post("/addStudent",function (req,resp) {
	//console.log(req);
	var name = req.body.name;
	var gender = req.body.gender;
	var birth = req.body.birth;
	var clazz_id = +req.body.clazz_id;
	if(gender=='male'){
		gender = "男";
	}else{
		gender = "女";
	}
	console.log(name,gender,birth,clazz_id);
	console.log(typeof clazz_id);
	studentDB.addStudent(name,gender,birth,clazz_id,function (result) {
		/*console.log("-----------------");
		console.log(name,gender,birth);*/
		resp.json(result);
	});
});

module.exports = studentRouter;
