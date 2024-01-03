export default function MyPlaylist() {
  return (
    <div className="min-w-[500px]">
      <div className="flex justify-end items-center gap-3 py-6 px-6 border  border-gray-300 rounded-tr-lg ">
        <button className="px-2 py-2 rounded-sm group hover:ring-1  hover:ring-white transition-all duration-300 bg-transparent hover:bg-sky-400 text-black ring-1 ring-black">
          <div className="flex items-center justify-center">
            <div></div>
            <div className="font-bold text-[0.6rem] text-center group-hover:text-white">
              Create Playlist
            </div>
          </div>
        </button>
      </div>
      <div className="flex justify-between font-bold  p-4 border border-gray-300 border-t-0 rounded-b-lg">
        <div>S.no</div>
        <div>Date</div>
        <div>Title</div>
        <div>Actions</div>
      </div>
    </div>
  );
}
