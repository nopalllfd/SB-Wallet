import PersonIcon from '@mui/icons-material/Person';

function HeaderSection() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
      <div className="flex items-center gap-3">
        <PersonIcon className="text-blue-700" />
        <h1 className="font-semibold text-base md:text-lg text-gray-900">Profile</h1>
      </div>
    </div>
  );
}

export default HeaderSection;
