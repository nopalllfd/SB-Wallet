function HeaderSection() {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:justify-between ">
      <div>
        <div className="flex items-center gap-3">
          <img src="/assets/profile/user-blue.svg" alt="profile icon" className="w-6 h-6" />
          <h1 className="font-semibold text-md text-gray-900">Profile</h1>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
