export const doEmailsMatch = (email1: string, email2: string): boolean => {
    return email1 === email2;
};

export const isValidEmail = (email : string) : boolean => {
    const re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    //console.log("hit")
    return re.test(email);
}