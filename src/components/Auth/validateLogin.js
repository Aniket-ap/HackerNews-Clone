export default function validateLogin(values) {
    let errors = {}

    // email error
    if(!values.email){
        errors.email = "Email Required"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Invalid Emial Address"
    }

    // password error
    if(!values.password){
        errors.password = "Password Required"
    }else if(values.password.length < 6){
        errors.password = "Password Must be al least 6 Charcters"
    }

    return errors
}
