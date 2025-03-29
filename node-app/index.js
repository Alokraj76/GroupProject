const express = require('express')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads')
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1E9)
        cb(null,file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({storage: storage})
const bodyParser = require('body-parser')
const app = express()
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 5000;
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://alokra7651:0987alok@cluster0.xmzr1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");



const Users = mongoose.model('Users',{ 
    username: String, 
    password:String,
    // likeProducts : [{type: mongoose.Schema.Types.ObjectId, ref: 'Products'}]
});

const Products = mongoose.model('Products',{ pname: String, pdesc:String, category: String, pimage: String});
app.get('/',(req ,res)=>{
    res.send('Hello world')
})

// app.post('/like-product' , (req,res)=>{

//     let productId = req.body.productId;
//     let userId = req.body.userId;
//     // console.log(req.body);

//     Users.updateOne({ _id: userId},{ $addToSet:{likeProducts: productId}})
//     .then(()=>{
//         res.send({message: 'like success'})
//     })
//     .catch(()=>{
//         res.send({message: 'like failed'})
//     })
// })

app.post('/add-product',upload.single('pimage'),(req,res)=>{
// console.log(req.body);
// console.log(req.file.path);
const pname = req.body.pname;
const pdesc = req.body.pdesc;
const category = req.body.category;
const pimage = req.file.path;

const product  = new Products({ pname, pdesc, category, pimage })
product.save()
.then(()=>{
    res.send({message: 'saved success'})
})
.catch(()=>{
    res.send({message: 'server err'})
})


})

app.get('/get-products',(req,res)=>{
    Products.find()
    .then((result)=>{
        // console.log(result,"user data")
        res.send({message: 'success', products: result})
    })
    .catch((err)=>{
        res.send({message: 'product server err'})
    })
})

app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    // console.log(req.body);
    
    const user = new Users({username: username ,password : password });
    user.save().then(()=>{
        res.send({message :'saved success. '})
    })
    .catch(()=>{
        res.send({message: ' server err1'})
    })
})

app.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    // console.log(req.body);
    
    Users.findOne({username: username})
    .then((result)=>{
        // console.log(result,"user data")
        if(!result){
            res.send({message: 'user not found'})
        }
        else{
            if(result.password ==password){
                const token= jwt.sign({
                    data: result
                },'MyKey',{expiresIn: '1h'});
                res.send({message: 'find success.',token: token})
            }
            if(result.password != password){
                res.send({message: 'password wrong'})
            }
        }  
    })
    .catch(()=>{
        res.send({message: ' server err'})
    })

})
app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})