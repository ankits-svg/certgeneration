const mongoose=require("mongoose")

const certSchema=mongoose.Schema({
    "date":{ type: Date, default: Date.now },
    "studentId":String,
    "certtype":String,
    "body":String,
    "name":String,
    "cofounder":String,
    "founder":String
})

const CertModel=mongoose.model("cert",certSchema)

module.exports={
    CertModel
}