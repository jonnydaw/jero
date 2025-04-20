'use client'
import { useEffect, useState } from "react";
import style from "./manageprofile.module.css"
import ProfileCard from "./ProfileCard";
import { UpdateFields } from "@/types/types";
import axios from "axios";
import { inDevEnvironment } from "@/base";
import { useTranslations } from "next-intl";
/*
update name
update last name
add image
update password
add introduction
delete account
*/


const ManageProfile = (props : UpdateFields) => {

    const t = useTranslations('ManageProfile');
    const baseApi = inDevEnvironment ? "http://localhost:8080" : "https://api.jero.travel";
    


    const [updateFields, setUpdateFields] = useState<UpdateFields>(
        {
            firstName : "",
            lastName : "",
            introduction : "",
            imgULR : "",
        }
    );

    const firstNameProp = updateFields.firstName.length > 0 ? updateFields.firstName : props.firstName;
    const lastNameProp = updateFields.lastName.length  > 0 ?  updateFields.lastName :  props.lastName;
    const introductionProp = updateFields.introduction.length > 0 ? updateFields.introduction : props.introduction;
    const imgLinkProp = updateFields.imgULR.length > 0 ? updateFields.imgULR : props.imgULR;

    
    const handleChange = (e : any) => {
        const {name, value} = e.target;
        setUpdateFields({...updateFields, [name] : value});
        console.log(name)
        console.log(value)
    }

    const handleDelete = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${baseApi}/auth/delete`,
                { withCredentials: true}
            );
            console.log("hi" + response.data);
        } catch (error : any) {
            console.log(error)
            //onsole.log('Login failed:', error.response ? error.response.data : error.message);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const name : keyof UpdateFields = e.target.name;
        const endpointFin = e.target.name.toLowerCase();
        console.log(updateFields[name]);
        // const postVal = ;
        try {
            const response = await axios.put(`${baseApi}/profile/update-${endpointFin}`, {
                    updateVal : updateFields[name]
                },
                { withCredentials: true}
            );
            console.log(response.data);
        } catch (error : any) {
            console.log('update failed:', error.response ? error.response.data : error.message);
    }
    }

    return(
        <div id={style.container}>
                            <section id={style.cardContainer}>
                    <ProfileCard firstName={firstNameProp} lastName={lastNameProp} introduction={introductionProp} imgLink={imgLinkProp}/>
                </section>
            <div id={style.subcontainer}>



                <section className={style.updateSection}>
                    <form
                    onSubmit={handleSubmit}
                    name="firstName"
                    >
                        <label htmlFor="firstName">{t('updateFirstName')}
                        </label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={updateFields.firstName}
                            onChange={handleChange}
                        />
                        <button className="basicButton">{t('confirm')}</button>
                    </form>
                </section>

                <section className={style.updateSection}>
                    <form 
                            onSubmit={handleSubmit}
                            name="lastName"
                                        >
                        <label htmlFor="lastName"> {t('updateLastName')}
                        </label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            value={updateFields.lastName}
                            onChange={handleChange}
                            />

                        <button className="basicButton">{t('confirm')}</button>
                    </form>
                </section>
                

                
                <section className={style.updateSection}> 
                <form 
                                    onSubmit={handleSubmit}
                                    name="introduction">
                        <label htmlFor="introduction"> {t('updateIntro')}
                        </label>
                        <input 
                            type="text" 
                            id="introduction" 
                            name="introduction"
                            value={updateFields.introduction}
                            onChange={handleChange}

                            />

                        <button className="basicButton">{t('confirm')}</button>
                    </form>
                </section>
                
                <section className={style.updateSection}>
                    <form                     
                    onSubmit={handleSubmit}
                    name="imgLink">
                        <label htmlFor="imgLink">{t('updatePhoto')}
                        </label>
                        <input 
                            type="img" 
                            id="imgLink" 
                            name="imgLink" 
                            value={updateFields.imgULR}
                            onChange={handleChange}
    
                        />
                        <button className="basicButton">{t('confirm')}</button>
                    </form>
                </section>
                                                                                                                                                                
                
                <button onClick={handleDelete} className="basicButton" id={style.delete}>{t('delete')}</button>

            </div>
        </div>
    )
}

export default ManageProfile;