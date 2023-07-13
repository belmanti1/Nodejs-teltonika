var Group= require('../models/groupModel.js');
const User = require('../models/User.js');

// create and save new Group
exports.create=(req,res)=>{
   // validate request
   if(!req.body){
      res.status(400).send({message:"Content can not be empty!"});
      return;
   }
   // Get the current user ID from the request or session (depending on your setup)
   const currentUserId= req.body.id; //assuming the user ID is available in req.user.id
   // Find  the user by ID and retrieve their name 
  
   User.findById(currentUserId)
   .then(user =>{
        if(!user){
          res.status(404).send({message :"Utilisateur not exist"});
          return ; 
        }
   });
   // new group
   const group =new Group({
       id_person:currentUserId,
       group_nom : req.body.group_nom
      })
   group
        .save(group)
        .then(data=>{
          res.redirect('/group/add_group')
        })
        .catch(err=>{
          res.status(500).send({
            message:err.message || "Some error occured while creating a create operation"
          });
        });
}


// retrieve and return all groups/retrieve and return a single group
exports.find=(req,res)=>{
     if(req.query.id){
          const id=req.query.id;
          Group.findById(id)
             .populate('id_person','name')
             .then(data=>{
                 if(!data){
                  res.status(404).send({message:"Not found group with id" +id})
                 }else{
                   res.send(data)
                 }
             })
             .catch(err=>{
                 res.send(500).send({message:"Error retriving group with id"+id})
             })
     }else{
       Group.find()
        .populate('id_person','name')
        .then(user=>{
          res.send(user)
        })
        .catch(err=>{
          res.status(500).send({ message:err.message || "Error Occured while retriving group information"})
        })

     }
     
}

//update a new identified group by group id 
exports.update=(req,res)=>{
      if(!req.body){
        return res
           .status(400)
           .send({ message :"Data to update can note be empty"})
      }
      const id=req.params.id;
      Group.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
         .then(data=>{
            if(!data){
              res.status(404).send({message:`Cannot Update group with${id}.Maybe group not found!`})
            }
            else{
              res.send(data)
            }
         })
         .catch(err =>{
          res.status(500).send({message:"Error Update group information"})
         })
}
// Delete a Group with specified group id  in the request
exports.delete=(req,res)=>{
     const id =req.params.id;

     Group.findByIdAndDelete(id)
       .then(data=>{
           if(!data){
            res.status(404).send({message:`Cannot Delete with id ${id}.Maybe id is wrong`})
           }else{
              res.send({
                message:"Group was delete successfully!"
              })
           }
       })
       .catch(err => {
        res.status(500).send({
          message:"Could not delete Group with id="+id
        })
       });
}

