const categoryModel =require("../models/categoryModel");

const getCategories = async (req, res) => {
    const categories = await categoryModel.find({})
    //Access(res);
    res.status(200).send(categories);
    }

    const getCategoryById = async(req, res) => {
        const {id} = req.params;
        //console.log("hi"+id);
        const categoryById =await categoryModel.findById(id)
       // console.log(categoryById );
       // Access(res);
        res.status(200).send(categoryById);
    }

    const addCategory = async (req, res, next) => {
        
        console.log(req.body);
       
        const {category} = req.body;
         var newCategory = await categoryModel.create({categoryName:category});
         //Access(res); 
         res.status(200).send(newCategory);
         console.log(newCategory);
     };

     const editCategory =async (req, res, next) => {
        try{
        const  {id}= req.params;
        const {category} = req.body;
        //console.log(req.body)
         await categoryModel.findByIdAndUpdate(id, {categoryName:category});
       // Access(res);
        res.status(200).send({message:"category updated"});
        }catch(error){
            next(error);
        }
    }

    
const deleteCategory= async (req, res, next) => {
    const { id } = req.params;
    categoryModel.findByIdAndDelete( id , function (err) {
        if (err) return handleError(err);
      });
      //Access(res);
    res.status(204).send();
}


    module.exports={
        getCategories,
        getCategoryById ,
        addCategory, 
        editCategory,
        deleteCategory
    }