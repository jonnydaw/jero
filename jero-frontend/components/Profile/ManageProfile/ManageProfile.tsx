'use client'
import { useEffect, useState } from "react";
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
            firstName : "",
            lastName : "",
            introduction : "",
            imgLink : "",
            oldPassword : "",
            password : ""
        }
    );

    const firstNameProp = updateFields.firstName.length > 0 ? updateFields.firstName : props.firstName;
    const lastNameProp = updateFields.lastName.length  > 0 ?  updateFields.lastName :  props.lastName;
    const introductionProp = updateFields.introduction.length > 0 ? updateFields.introduction : props.introduction;
    const imgLinkProp = updateFields.imgLink.length > 0 ? updateFields.imgLink : props.imgLink;

    
    const handleChange = (e : any) => {
        const {name, value} = e.target;
        setUpdateFields({...updateFields, [name] : value});
        console.log(name)
        console.log(value)
    }

    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     console.log(e.name);
    // }

    return(
        <div id={style.container}>
            <div id={style.subcontainer}>
                <section id={style.cardContainer}>
                    <ProfileCard firstName={firstNameProp} lastName={lastNameProp} introduction={introductionProp} imgLink={imgLinkProp}/>
                </section>
                <section className={style.updateSection}>
                    <form
                    >
                        <label htmlFor="firstName"> Update First Name
                        </label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={updateFields.firstName}
                            onChange={handleChange}
    
                        />

                        <button>Confirm Change</button>
                    </form>
                </section>

                <section className={style.updateSection}>
                    <form>
                        <label htmlFor="lastName"> Update Last Name
                        </label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            value={updateFields.lastName}
                            onChange={handleChange}
                            />

                        <button>Confirm Change</button>
                    </form>
                </section>
                

                
                <section className={style.updateSection}> 
                <form>
                        <label htmlFor="introduction"> Update Introduction
                        </label>
                        <input 
                            type="text" 
                            id="introduction" 
                            name="introduction"
                            value={updateFields.introduction}
                            onChange={handleChange}

                            />

                        <button>Confirm Change</button>
                    </form>
                </section>
                
                <section className={style.updateSection}>
                    <form>
                        <label htmlFor="imgLink"> Update Profile Photo
                        </label>
                        <input 
                            type="img" 
                            id="imgLink" 
                            name="imgLink" 
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