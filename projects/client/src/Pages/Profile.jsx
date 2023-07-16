import { MdPerson } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import UserEditModal from '../Components/User/UserEditModal';
import { useSelector } from 'react-redux';
import { convertDate } from '../Helper/userHelper';

export default function Profile() {
  // console.log(window.location.pathname);
  // if (!localStorage.getItem('token')) {
  //   <Navigate to="/login" />;
  // }
  let token = localStorage.getItem('token');

  const { user } = useSelector((state) => state.user);
  console.log(token);
  // console.log(localStorage.getItem('token'));
  if (!token) return <Navigate to={'/login'} />;
  // console.log(user);
  return (
    <div className="flex sm:flex-col justify-center sm:items-center px-4 gap-4 pt-2">
      <div className="p-4 w-full lg:max-w-[255px]">
        <div className="h-full flex flex-col sm:flex-row shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg">
          <Link
            to="/user/profile"
            className={
              window.location.pathname === '/user/profile'
                ? 'p-3 text-[#00A8B5] font-bold'
                : 'p-3'
            }
          >
            Profile
          </Link>
          <Link to="/user/address" className="p-3">
            Address
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[772px] p-4 rounded-lg">
        <div className="flex justify-between pl-4 mb-4">
          <h3 className="text-[23px] font-bold">Profile</h3>
          <UserEditModal data={user} />
        </div>
        <div className="text-[16px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg p-4">
          <div className="flex">
            {user?.profile_image ? (
              <img></img>
            ) : (
              <MdPerson className="w-[100px] h-[100px]" />
            )}
            <div>
              <p className="font-bold text-[18px]">{user?.full_name}</p>
              <p className="text-[16px]">{user?.phone_number}</p>
              <p className="text-[16px]">{user?.email}</p>
            </div>
          </div>
          <div className="flex justify-between py-4 border-b-2 border-[#eeeeee;]">
            <p>Birth of date</p>
            <p>{convertDate(user?.birthdate)}</p>
          </div>
          <div className="flex justify-between pt-4">
            <p>Gender</p>
            <p>{user?.gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
