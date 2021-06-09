import { useSelector } from "react-redux";
import { rootState } from "../../../redux/init";

export const UploadAvatar = () => {
  const user = useSelector((state: rootState) => state.userState?.user);
  console.log(user.avatar);
  
  return (
    <>
    <img src={user.avatar ? 'https://res.cloudinary.com/dcvhz3sqn/image/upload/v1623181013/empty_onzxyb.png' : 'https://res.cloudinary.com/dcvhz3sqn/image/upload/v1623160194/wqjpdmitaojbp3gr3egp.jpg'} />
    </>
  )
}
