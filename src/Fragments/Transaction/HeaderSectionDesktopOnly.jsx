function HeaderSectionDesktopOnly() {
  return (
    <header className="hidden md:block">
      <div className="flex gap-4 mb-6">
        <img
          src="/assets/utils/history-blue.svg"
          alt="history icon"
        />
        <h2 className="font-semibold">History Transaction</h2>
      </div>
    </header>
  );
}

export default HeaderSectionDesktopOnly;
