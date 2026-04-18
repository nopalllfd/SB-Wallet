import HeaderSection from '../Fragments/Profile/HeaderSection';
import ProfileForm from '../Fragments/Profile/ProfileForm';
import { DashboardLayout } from '../Layouts/DashboardLayout';

function ProfilePage() {
  return (
    <DashboardLayout>
      <section className="max-md:py-6 px-6 flex flex-col gap-8">
        <HeaderSection />
        <div className="bg-white md:border md:p-6 md:border-gray-300 md:rounded-md md:py-4">
          <ProfileForm />
        </div>
      </section>
    </DashboardLayout>
  );
}

export default ProfilePage;
