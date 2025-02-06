export const isFieldMatch = (email1: string, email2: string): boolean => {
    return email1 === email2;
};

export const isValidEmail = (email : string) : boolean => {
    const re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    //console.log("hit")
    return re.test(email);
}

export const isValidPassword = (password : string) : boolean =>{
    // https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string
    const noSpaces = password.trim().length === password.length
    const reSpecialChar =  new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/);
    const reDigit = new RegExp(/\d/);
    return password.length >= 8 && reSpecialChar.test(password) && reDigit.test(password) && noSpaces;
}