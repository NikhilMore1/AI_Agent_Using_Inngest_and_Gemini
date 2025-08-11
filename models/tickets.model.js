import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    priority:{
        type:String
    },
    deadline:{
        type:Date
    },
    helpfullNotes:{
        type:String,
        required:true
    },
    reletedSkills:[String],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const ticketModel = mongoose.model("Tickets",ticketSchema);

export default ticketModel;