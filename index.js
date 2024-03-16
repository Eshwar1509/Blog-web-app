import express from "express";
import bodyParser from "body-parser";

var arr = [];
var n=0;
var index=0;
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("initial.ejs",{arr:arr});
})

app.post("/submit",(req,res)=>{
    res.render("createBlog.ejs");
})

app.post("/create",(req,res)=>{
    console.log(req.body);
    addNewBlog(req,res);
    console.log(arr);
    // res.render("initial.ejs",{
    //     arr: arr
    // })
    res.redirect("/");
})

app.get("/edit/:id",(req,res)=>{
    index = parseInt(req.params.id);
    res.render("editBlog.ejs",{postId:index});
})

app.post("/edit/:id",(req,res)=>{
    index = parseInt(req.params.id);
    console.log(index);
    for(var i=0; i<arr.length; i++){
        if(arr[i].id == index){
            arr[i] = {
                id : index,
                title : req.body.newPostTitle,
                content : req.body.newPost
            }
            console.log("Changed");
            break;
        }
    }
    console.log("NEW>>>");
    console.log(arr);
    res.redirect("/");
})

app.post("/delete/:id",(req,res)=>{
    const ind = parseInt(req.params.id);
    for(var i=0; i<arr.length; i++){
        if(arr[i].id === ind){
            arr.splice(i,1);
            break;
        }
    }
    console.log("After deletion");
    console.log(arr);
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

function addNewBlog(req,res){
    n++;
    const obj = {
        id: n,
        title: req.body["newPostTitle"],
        content: req.body["newPost"]
    }
    arr.push(obj);
}