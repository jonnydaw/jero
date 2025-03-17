
interface Props  {
    firstName: string;
    lastName : string;
    introduction : string;
    imgLink : string;
}

const ProfileCard = (props : Props) => {
    return(
        <div>
            <p>{props.firstName}</p>
            <p>{props.lastName}</p>
            <p>{props.introduction}</p>
            <p>{props.imgLink}</p>
            <p>hi</p>

        </div>
    )
}

export default ProfileCard;