const contactSchema = new mongoose.Schema(
    {
        name:{
        type:String,
        requiered:true,
        trim:true,
        minlength:2,
        maxlength:100,
        },
        email:{
            type:String,
            requiered:true,
            trim:true,
            lowercase:true,
            unique:true,
            match:[/.+\@.+\..+/,'Please fill a valid email address']
        },
        phone:{
            type:String,
            trim:true,
            match:[/^\+?[1-9]\d{1,14}$/,'Please fill a valid phone number']
}
    },    
    {_id:false}
);

export const Contact = mongoose.model('Contact',contactSchema); 