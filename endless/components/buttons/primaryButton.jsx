function PrimaryButton({ title, outerStyle, onClick , type}) {
  return (
    <button
      className={`${outerStyle} px-2 py-2 rounded-sm group hover:ring-1  hover:ring-white transition-all duration-300`}
      onClick={onClick}
      type={type}
    >
      <div className="flex gap-1 items-center justify-center">
        <div></div>
        <div className="font-bold text-[0.6rem] text-center group-hover:text-white">
          {title}
        </div>
      </div>
    </button>
  );
}

export { PrimaryButton };
