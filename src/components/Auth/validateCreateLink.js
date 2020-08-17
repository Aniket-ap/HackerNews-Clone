export default function validateCreateLink(values) {
    let errors = {}

    // Description error
    if(!values.description){
        errors.description = "Description Required"
    } else if(values.description.length < 10){
        errors.description = "Description must be at least 10 characters"
    }

    // url error
    if(!values.url){
        errors.url = "URL Required"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        errors.url = "URL must be valid"
    }

    return errors
}
