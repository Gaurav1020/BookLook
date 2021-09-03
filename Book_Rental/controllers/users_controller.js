var Users= require('../models/users_model');
var Books= require('../models/books_log');


module.exports.profile = function(req, res){
    if(!req.query.q){
        return res.render('userProfile');
    }
    else{
        Users.findOne({username: req.query.q},
            function(err,user){
                if(err){
                    console.log("Couldn't find the user");
                    return res.redirect('/user/profile');
                }
                console.log(user);
                return res.render('foreignProfile',{
                    fuser:user
                })
            }    
        )
        
    }
}

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signUp');
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signIn');
}


module.exports.addUser= function(req,res){
    if(req.body.pwd==req.body.cpwd){
        Users.create({
            name:req.body.name,
            email:req.body.email,
            dob:req.body.dob,
            username:req.body.username,
            password:req.body.pwd,
            phno:req.body.phno,
            address: req.body.address
        }, function(err, user){
            console.log(req.body);
            if(err){
                console.log('Error adding user', err);
                return res.redirect('/users/sign-up');
            }
            console.log('New user added: ', user);
            return res.redirect('/users/sign-in');
        })
    }
    else{
        console.log("Password and Confirm Password fields not matching.");
        return res.redirect('back');
    }
}


module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}

module.exports.signout = function(req,res){
    req.logout();
    return res.redirect('/');
}







module.exports.rent = function(req,res){
    //Count of number of elements
    let n=0;
    Books.find({renter:req.user.id}).
    count(function (err, count) {
        if (err) console.log(err);
        else n=count;
    })
    //Populate and return the values
    Books.find({renter:req.user.id}).
    populate('renter').
    populate('borrower').
    populate('Validatedborrower').
    exec(function(err,books){
        if(err){
            console.log('Error fetching data');
        }
        //console.log(books);
        //console.log(books[n-1].description);
        return res.render('rent',{
            books: books
        })
    })


    // Books.find({renter:req.user.id},function(err,books){
    //     if(err){
    //         console.log('Error fetching data');
    //     }
    //     console.log(books);
    //     return res.render('rent',{
    //         books: books
    //     })
    // })

    //return res.render('rent');
}

module.exports.rentadd = function(req,res){
    Books.create({
        bookname: req.body.bname,
        bookauthor: req.body.author,
        borrowprice: req.body.price,
        borrowduration: req.body.duration,
        compensationprice: req.body.cprice,
        phno: req.body.phno,
        description: req.body.desc,
        renter: req.body.renter,
    }
    , function(err,book){
        console.log(req.body);
        if(err){
            console.log('Error adding book', err);
            return res.redirect('/');
        }
        console.log('New book added: ', book);
        return res.redirect('/users/profile');
    })
}

module.exports.borrow =function(req, res){
    Books.find({}).
    populate('renter').
    populate('borrower').exec(function(err,books){
        if(err){
            console.log('Error fetching data');
        }
        //console.log(books);
        //console.log(books[n-1].description);
        return res.render('borrow',{
            books: books
        })
    })
}

module.exports.borrowal= function(req,res){
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.log(utc);
    console.log(req.query);
        if(req.query.rid != req.user.id){
            //console.log(req.query.rid +"  "+ req.user.id)
            Books.update({_id:req.query.book}, {$set: { borrower: req.user.id, borrowdate: utc}}, {upsert: true}, function(err){
                if(err){
                    console.log('Error updating data');
                }
                //console.log(books);
                //console.log(books[n-1].description);
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
}

module.exports.validate=function(req, res){
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    var des=req.query.des;
    var vid=req.query.vid;
    var bid=req.query.bid;
    if(des=='Y'){
        console.log("Validated");
        Books.update({_id:bid}, {$set: { Validatedborrower: vid, borrowdate: utc}}, {upsert: true}, function(err){
            if(err){
                console.log('Error updating data');
            }
            //console.log(books);
        })
        Books.update({_id:bid}, {$set: { borrower: null}}, {upsert: true}, function(err){
            if(err){
                console.log('Error updating data');
            }
            //console.log(books);
        })
        return res.redirect('back');
    }
    else{
        console.log("Declined");
        Books.update({_id:bid}, {$set: { borrower: null}}, {upsert: true}, function(err){
            if(err){
                console.log('Error updating data');
            }
            //console.log(books);
        })
        return res.redirect('back');
    }
    return res.redirect('back');
}