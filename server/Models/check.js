let checkadmin= (req,res, next)=>{
    
    if(req.session.user){
        if(req.session?.user.isAdmin){
            next()
            return
        }
    }
    res.json({err:"dont have any permisson"})
}
let checkqa = (req)=>{
    if(req.session?.user.isQA){
        next()
        return
    }
    es.json({err:"dont have any permisson"})
}
let checkstaff= (req)=>{
    if(req.session.user){
        if(req.session.user.role==2){
            return true
        }
    }
    return false
}
exports.checkadmin = checkadmin
exports.checkqa = checkqa
exports.checkstaff = checkstaff