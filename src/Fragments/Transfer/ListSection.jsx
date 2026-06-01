import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
import Pagination from '../../components/Pagination';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';
import { useEffect } from 'react';
import { getReceivers } from '../../redux/slice/transactionSlice';
import { useNavigate } from 'react-router';

function ListSection() {
  const navigate = useNavigate();
  const { receivers: users } = useSelector((state) => state.transaction);
  const handleClick = (id) => {
    navigate(`/transfer/${id}`);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReceivers());
    console.log('masuk get receiver');
  }, [dispatch]);

  console.log(users.length);
  return (
    <section className="flex flex-col gap-3 py-6 z-0 relative">
      {users.length > 0 ? (
        users.map((d, idx) => (
          <div
            key={d.Id}
            onClick={() => {
              handleClick(d.Id);
            }}
            className={`flex justify-between bg-gray-100 p-3 cursor-pointer hover:bg-white rounded-md ${idx % 2 == 0 ? 'bg-white hover:bg-gray-100' : ''}`}
          >
            <img
              src={getProfileImageSrc(d)}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
              }}
              alt={`${d.fullName} icon`}
              className="w-13"
            />
            <div className="flex-2 ms-10 md:ms-30 md:me-30 md:flex md:gap-4 md:items-center md:justify-between">
              <p className="text-lg">{d.FullName}</p>
              <p>{d.Phone || '0000000000'}</p>
            </div>

            <img src={`/assets/utils/star.svg`} alt={`star icon`} />
          </div>
        ))
      ) : (
        <p className="text-center">{`Tidak ada data`}</p>
      )}
      {/* <p>p</p> */}
    </section>
  );
}

export default ListSection;
