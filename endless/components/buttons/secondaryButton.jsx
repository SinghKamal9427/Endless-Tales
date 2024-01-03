function SecondaryButton({
  title,
  outerstyle,
  hoverTextColor,
  innerstyle,
  onClick,
}) {
  return (
    <button
      className={`${outerstyle} px-1 py-1 rounded-2xl  group transition-all duration-300  w-[100%]`}
      onClick={onClick}
    >
      <div className={`${innerstyle} flex px-2 py-1 rounded-xl gap-1 items-center justify-center`}>
        <div></div>
        <div
          className={`${hoverTextColor} font-bold  text-white  text-[0.8rem] transition-all duration-300 `}
        >
          {title}
        </div>
      </div>
    </button>
  );
}

export { SecondaryButton };
