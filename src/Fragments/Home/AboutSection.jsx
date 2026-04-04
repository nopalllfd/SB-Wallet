import Card from '../../components/Card';

function AboutSection() {
  return (
    <section className="py-10 px-5 about flex items-center justify-center flex-col gap-5 md:px-10 lg:px-14">
      <div className="flex flex-col gap-5 w-full max-w-7xl md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="flex flex-col gap-3 md:w-1/2 md:pt-6">
          <h1 className="w-1/2 text-3xl font-normal text-center md:w-full md:text-left">About The Aplication</h1>
          <p className="text-center text-gray-500 md:text-left">We have some great features from the application and it’s totally free to use by all users around the world.</p>
        </div>
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <Card
            icon={'/assets/home/about/support.svg'}
            alt={'support icon'}
            text={'We have 24/7 contact support so you can contact us whenever you want and we will respond it.'}
          >
            24/7 Support
          </Card>
          <Card
            icon={'/assets/home/about/data.svg'}
            alt={'data icon'}
            text={'We make sure your data is safe in our database and we will encrypt any data you submitted to us.'}
          >
            Data Privacy
          </Card>
          <Card
            icon={'/assets/home/about/download.svg'}
            alt={'download icon'}
            text={'Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.'}
          >
            Easy Download
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
