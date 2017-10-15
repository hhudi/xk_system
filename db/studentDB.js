
var pool = require('./pool');
//console.log(pool);
//查询所有学生
function findAll(handler){
    //console.log("111:");
    pool.getConnection(function(err,connection){
        if(err){
            throw err;
        } else {
            var sql = 'select * from xk_student';
            connection.query(sql,function(err,results){
                if(err){
                    throw err;
                }else {
                    handler.call(this,results);
                }
                //回收
                connection.release();
            });
        }
    });
}
//删除
function batchDelete(ids,handler){
    console.log(ids);
    pool.getConnection(function(err,connection){
        if(err){
            throw err;
        } else{

            var sql = "delete from xk_student where id in ("+ids+")";
            connection.query(sql,function(err,results){
                if(err){
                    throw err;
                } else {
                    handler.call(this,results);
                }
                connection.release();
            });
        }
    });
}

//通过ｉｄ查找学生
function findById(id,handler){
    pool.getConnection(function(err,connection){
        if(err){
            throw err;
        } else{
            var sql = "select * from xk_student where id = ?";
            connection.query(sql,[id],function(err,result){
                if(err){
                    throw err;
                } else{
                    handler.call(this,result);
                }  
                connection.release();
            });
        }
    });
}

// 通过id修改（id,name,gender,birth)
function updateById (id,name,gender,birth,handler) {
    console.log("啦啦啦d",id,name,gender,birth);
    
    //var dd = new Date(birth);
    //console.log(typeof dd);
    pool.getConnection(function (err,connection) {
        if(err){
            throw err;
        }else{
            var sql = "update xk_student set name=?,gender=?,birth=? where id=?";
            connection.query(sql,[name,gender,birth,id],function (err,result) {
                if(err){
                    throw err;
                }else{
                    handler.call(this,result);
                }
                connection.release();
            });
        }
    });
}
function addStudent(name,gender,birth,clazz_id,handler){
    console.log(name,gender,birth);
    console.log(clazz_id,typeof clazz_id);
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        }else{
            var sql = "insert into xk_student(name,gender,birth,clazz_id) values(?,?,?,?)";
            conn.query(sql,[name,gender,birth,clazz_id],function(err,result){
                if(err){
                    throw err;
                }else{
                    handler.call(this,result);
                }
                conn.release();
            });
        }
    });
}


//暴露接口
module.exports = {
    findAll:findAll,
    batchDelete:batchDelete,
    findById:findById,
    updateById:updateById,
    addStudent,addStudent
}
