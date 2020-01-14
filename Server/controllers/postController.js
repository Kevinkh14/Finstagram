module.exports ={

    getAllPost : async(req, res) =>{
        const db = req.app.get('db')
        db.post.getAllPost().then(posts =>{
            res.status(200).json(posts)
        }).catch(err =>{console.log(err)})
    },
    getFollowingPost:async (req,res) =>{

    },
    getUserPost:async(req,res) =>{

    },
    createPost: async (req,res)=>{
        const db = req.app.get("db")
        const {content , picture, likes} = req.body
        console.log(req.session.user)
        const {user_id} =req.session.user
        
        if (!content){
            res.status(409).json("post is empty")
        }else{
            const addPost = db.post.createPost(user_id,content, picture, likes)
            res.status(200).json(addPost)
        }

    } 
 }