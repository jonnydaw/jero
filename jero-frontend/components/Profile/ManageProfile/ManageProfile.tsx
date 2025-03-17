'use client'
import { useState } from "react";
import style from "./manageprofile.module.css"
import ProfileCard from "./ProfileCard";
import { UpdateFields } from "@/types/types";
/*
update name
update last name
add image
update password
add introduction
delete account
*/
interface UpdateFieldsWithSecret extends UpdateFields{
    oldPassword : string;
    password : string;
}

const ManageProfile = (props : UpdateFields) => {

    const [updateFields, setUpdateFields] = useState<UpdateFieldsWithSecret>(
        {
            firstName : props.firstName,
            lastName : props.lastName,
            introduction : props.introduction,
            imgLink : props.imgLink,
            oldPassword : "",
            password : ""
        }
    );

    const handleChange = (e : any) => {
        e.preventDefault();
        const {name, value} = e.target;
        setUpdateFields({...updateFields, [name] : value});
        console.log(name)
        console.log(value)
    }

    return(
        <div id={style.container}>
            <div id={style.subcontainer}>
                <section id={style.cardContainer}>
                    <ProfileCard firstName={""} lastName={""} introduction={""} imgLink={""}/>
                </section>
                <section className={style.updateSection}>
                    <form>
                        <label htmlFor="fname"> Update First Name
                        </label>
                        <input 
                            type="text" 
                            id="fname" 
                            name="fname" 
                            value={updateFields.firstName}
                            onChange={handleChange}
    
                        />

                        <button>Confirm Change</button>
                    </form>
                </section>

                <section className={style.updateSection}>
                    <form>
                        <label htmlFor="lname"> Update Last Name
                        </label>
                        <input 
                            type="text" 
                            id="lname" 
                            name="lname" 
                            value={updateFields.lastName}
                            onChange={handleChange}
                            />

                        <button>Confirm Change</button>
                    </form>
                </section>
                

                
                <section className={style.updateSection}> 
                <form>
                        <label htmlFor="intro"> Update Introduction
                        </label>
                        <input 
                            type="text" 
                            id="intro" 
                            name="intro"
                            value={updateFields.introduction}
                            onChange={handleChange}

                            />

                        <button>Confirm Change</button>
                    </form>
                </section>
                
                <section className={style.updateSection}>
                    <form>
                        <label htmlFor="photo"> Update Profile Photo
                        </label>
                        <input 
                            type="img" 
                            id="photo" 
                            name="photo" 
                            value={updateFields.imgLink}
                            onChange={handleChange}
    
                        />

                        <button>Confirm Change</button>
                    </form>
                </section>

                <section className={style.updateSection}>
                    <form>
                        <label htmlFor="oldpassword"> Old Password
                        </label>
                        <input 
                            type="text" 
                            id="oldpassword" 
                            name="oldpassword" 
                            value={updateFields.oldPassword}
                            onChange={handleChange}
                        />

                        <label htmlFor="password"> Change Password
                        </label>
                        <input 
                        type="text" 
                        id="password" 
                        name="password"
                        value={updateFields.password} 
                        onChange={handleChange}
                        />

                        <button>Confirm Change</button>
                    </form>
                </section>
                
                <button id={style.delete}>Delete Account</button>

            </div>
        </div>
    )
}

export default ManageProfile;