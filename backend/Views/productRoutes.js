const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const productSchema = require('../Model/productSchema');
const {isLoggedIn, isAdmin} = require('../Controller/userCtrl');
const {ObjectId} = require("mongodb");

router.post('/uploadProduct', isLoggedIn, isAdmin, (req, res) => {
    let form = new formidable.IncomingForm();
    console.log(form);
    form.parse(req, async (err, fields, file) => {
        if(err) {
            return res.json('Error')
        }else{
            let obj = {
                Title : fields.Title[0],
                Description : fields.Description[0],
                Price : Number(fields.Price[0]),
                Rating : Number(fields.Rating[0])
            };
            obj.Thumbnail = {
                data : "",
                contentType : ""
            }
            console.log(obj)
            if (file.Thumbnail[0]) {
                if (file.Thumbnail[0].size > 3000000) {
                    return res.status(400).json({
                        error : 'File size too big!'
                    });
                }
                let bufferData = fs.readFileSync(file.Thumbnail[0].filepath);
                let contentType = file.Thumbnail[0].mimetype;
                obj.Thumbnail.data = bufferData
                obj.Thumbnail.contentType = contentType
                let product = new productSchema(obj)
                let result = await product.save()
                return res.json({
                    Messages : 'Product uploaded',
                    result
                })    
            }
           
        }
    })
    
})

router.delete('/deleteProduct/:id', isLoggedIn, isAdmin, async (req, res) => {
    let {id} = req.params;
    let result = await productSchema.findOneAndDelete({ _id : new Object(id) })
    return res.json({
        Success : "Product deleted Successfully",
        result
    })
})

router.put('/updateProduct/:id',isLoggedIn, isAdmin, (req, res) => {
    let form = new formidable.IncomingForm()
    let productId = req.params.id
    form.parse(req, async(err, fields, file) => {
        if (err) {
            return res.json(err)
        } else {
            let obj = {
                Title : fields.Title[0],
                Description : fields.Description[0],
                Price : Number(fields.Price[0]),
                Rating : Number(fields.Rating[0])
            };
            obj.Thumbnail = {
                data : "",
                contentType : ""
            };
            if (file.Thumbnail[0]) {
                if (file.Thumbnail[0].size > 3000000) {
                    return res.status(400).json({
                        error : "File size too big!"
                    });
                }
                let bufferData = fs.readFileSync(file.Thumbnail[0].filepath);
                let contentType = file.Thumbnail[0].mimetype;
                obj.Thumbnail.data = bufferData
                obj.Thumbnail.contentType = contentType
                
                let result = await productSchema.findOneAndUpdate({ _id : new ObjectId(productId)}, obj, { new : true } )
                return res.json({
                    Messages : "Product Updated",
                    result
                })
            }
        }
    })
})

module.exports = router;

