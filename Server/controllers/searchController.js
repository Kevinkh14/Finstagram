module.exports = {

    getAllUsers : async (req,res) =>{
        const db = req.app.get('db')
        db.search.userSearch().then(users =>{
            res.status(200).json(users)
        }).catch(err =>{console.log(err)})
    }

}