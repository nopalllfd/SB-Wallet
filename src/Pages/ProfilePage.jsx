import HeaderSection from '../Fragments/Profile/HeaderSection';
import ProfileForm from '../Fragments/Profile/ProfileForm';
import { DashboardLayout } from '../Layouts/DashboardLayout';

function ProfilePage() {
  return (
    <DashboardLayout>
      <section className="max-md:py-6 px-6 flex flex-col gap-4">
        <HeaderSection />
        <ProfileForm />
      </section>
    </DashboardLayout>
  );
}

export default ProfilePage;
