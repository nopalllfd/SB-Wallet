function HeaderSectionDesktopOnly() {
  return (
    <header className="hidden md:block">
      <div>
        <img
          src=""
          alt=""
        />
        <h2>Transfer Money</h2>
      </div>
      <div class="flex items-center justify-start w-full max-w-3xl p-4 font-sans">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-6 h-6 text-sm text-white bg-blue-600 rounded-full">1</div>
          <span class="text-base text-blue-600">Find People</span>
        </div>

        <div class="w-16 mx-4 border-t-2 border-gray-300 border-dashed sm:w-20"></div>

        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-slate-600">2</div>
          <span class="text-base text-slate-500">Set Nominal</span>
        </div>

        <div class="w-16 mx-4 border-t-2 border-gray-300 border-dashed sm:w-20"></div>

        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full bg-slate-600">3</div>
          <span class="text-base text-slate-500">Finish</span>
        </div>
      </div>
    </header>
  );
}

export default HeaderSectionDesktopOnly;
