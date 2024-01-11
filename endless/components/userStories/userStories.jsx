import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import UseStore from "../store/useStore";

export default function UserStories() {
  const [startDate, setStartDate] = useState(new Date());
  const [stepsData, setStepsData] = useState([]);
  const [contentTitle, setContentTitle] = useState();
  const [toggleContentEditable, setToggleContentEditable] = useState();
  const [filterStepsData  , setFilterStepsData] = useState()
  const [userStoriesValue, setUserStoriesValue] = useState({
    date: "",
    searchText: "",
    archivedStories: false,
    archivedChapters: false,
  });

  const {apiUrls} = UseStore()
  const titleRef = useRef(null)

// Store values in [userStoriesValue] State
  const handleChangeValue = (e) => {
    const { value, checked, name } = e.target;
    if (name == "archivedStories" || name == "archivedChapters") {
      setUserStoriesValue((val) => ({ ...val, [name]: checked }));
    } else {
      setUserStoriesValue((val) => ({ ...val, [name]: value }));
    }
  
  };


//Filter valuses   
  const handleFilter = (val) => {

    const title = !userStoriesValue.searchText || val.userSteps[0].title.toLowerCase().startsWith(userStoriesValue.searchText.toLowerCase())

    const date = !userStoriesValue.date || new Date(userStoriesValue.date.toString()).toLocaleDateString() == new Date(val.date.toString()).toLocaleDateString()

    return title && date
  }


//Filter valuses  
  useEffect(()=>{
    const filter =  stepsData?.filter(handleFilter);
    setFilterStepsData(filter)
  },[userStoriesValue])


//Updating filterStepsData when the stepData is changed  
  useEffect(()=>{
    if(stepsData){
      setFilterStepsData(stepsData)}
  },[stepsData])

 
//Inserting date in [userStoriesValue] State and  [setStartDate] State
  const handleChangeValueDate = (date) => {
    setStartDate(date);
    setUserStoriesValue((val) => ({ ...val, date: date.toString() }));
  };


//Getting the User plauylist data  and storing it in [setStepsData] 
  const handlegetUserSteps = async () => {

    if(localStorage.getItem('token')){
    await axios
      .get(`${apiUrls}getUserSteps`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setStepsData(res.data.body);
      })
      .then(() =>
        setToggleContentEditable(
          Array.from({ length: stepsData.length }, () => false)
        )
      );
        }
  };

//Calling handlegetUserSteps
  useEffect(() => {
    handlegetUserSteps();
  }, [apiUrls]);


//Toggling the ContentEditable using the index and StepData.length [...see handlegetUserSteps] 
  const handleToggleContentEditable = (index, check) => {
    setToggleContentEditable((val) => {
      const updated = [...val];
      updated[index] = check;
      return updated;
    });
    titleRef.current.focus()
  };


// Post routes for editing title
  const handlePostContentEditable = async (value) => {
    await axios.post(`${apiUrls}editUserSteps` ,value )
  }

//Changing Title in [stepsData] and calling handlePostContentEditable
  const handleContentEditable = ( index) => {
    if(contentTitle){
    setStepsData((val) => {
       const  updatedStepsData =  [...val];
       updatedStepsData[index].userSteps[0].title =  contentTitle;
       handlePostContentEditable(updatedStepsData[index])
       return  updatedStepsData;
    });
    setContentTitle()
  }
    handleToggleContentEditable(index, false);
  };


//Routes for Deleteing steps
  const handleContentDelete = async (id) => {
    await axios.post(`${apiUrls}deleteUserSteps` ,{id})
    setStepsData((val)=> {
      const filter = val.filter((val)=> val._id !== id)
      return filter
    })
  }

  return (
   <div className="h-[100%]">
      <div className="flex justify-center items-center gap-3 py-6 px-6 border  border-gray-300 rounded-tr-lg">
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleChangeValueDate(date)}
            className="ring-1 ring-gray-300 px-2 py-2 rounded-xl text-sm"
          />
        </div>

        <input
          type="text"
          className="ring-1 ring-gray-300 px-2 py-2 rounded-xl text-sm"
          placeholder="search by title"
          onChange={handleChangeValue}
          name="searchText"
        />
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="archivedStories"
            name="archivedStories"
            onChange={handleChangeValue}
          />
          <label htmlFor="archivedStories" className="text-[10px]">
            Archived Stories
          </label>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="archivedChapters"
            name="archivedChapters"
            onChange={handleChangeValue}
          />
          <label htmlFor="archivedChapters" className="text-[10px]">
            Archived Chapter
          </label>
        </div>
        <button className="px-2 py-2 rounded-sm group hover:ring-1  hover:ring-white transition-all duration-300 bg-transparent hover:bg-sky-400 text-black ring-1 ring-black">
          <div className="flex gap-1 items-center justify-center">
            <div></div>
            <div className="font-bold text-[0.6rem] text-center group-hover:text-white">
              Search
            </div>
          </div>
        </button>
        <button className="px-2 py-2 rounded-sm group hover:ring-1  hover:ring-white transition-all duration-300 bg-transparent hover:bg-sky-400 text-black ring-1 ring-black">
          <div className="flex gap-1 items-center justify-center">
            <div></div>
            <div className="font-bold text-[0.6rem] text-center group-hover:text-white">
              Reset
            </div>
          </div>
        </button>
      </div>
      <div className="flex justify-between pb-24  p-4 border border-gray-300 border-t-0 rounded-b-lg h-[70%] overflow-y-scroll">
        <table className="w-[100%] border-separate border-spacing-2">
          <thead className="font-bold">
            <tr>
              <th>S.no</th>
              <th>Date</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {filterStepsData?.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val.date.split("T")[0]}</td>
                  <td className="w-[25%]">
                    <div className="flex items-center justify-between px-4">
                      <div
                      ref={titleRef}
                        className={`w-[80%] p-1 ${
                          !toggleContentEditable[index] ? "truncate" : "border-2 border-gray-300 rounded-lg"
                        } `}
                        contentEditable={toggleContentEditable[index]}
                        onInput={(e) => setContentTitle(e.target.textContent)}
                      >
                        {val.userSteps[0]?.title}
                      </div>

                      {toggleContentEditable[index] ? (
                        <div className="flex items-center gap-2">
                          <FaCheck
                            size={20}
                            onClick={() => handleContentEditable( index)}
                          />
                          <RxCross1
                            size={20}
                            onClick={() =>
                              handleToggleContentEditable(index, false)
                            }
                          />{" "}
                        </div>
                      ) : (
                        <div className=" ">
                          <FaEdit
                            size={20}
                            onClick={() =>
                              handleToggleContentEditable(index, true)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-4">
                      <button className="px-2 py-2 rounded-sm group hover:ring-1  hover:ring-white transition-all duration-300 bg-transparent hover:bg-sky-400 text-black ring-1 ring-black">
                        <div className="flex gap-1 items-center justify-center">
                          <div></div>
                          <div className="font-bold text-[0.6rem] text-center group-hover:text-white">
                            Read
                          </div>
                        </div>
                      </button>
                      <button className="px-2 py-2 rounded-sm group hover:ring-1  hover:ring-white transition-all duration-300 bg-transparent hover:bg-sky-400 text-black ring-1 ring-black">
                        <div className="flex gap-1 items-center justify-center">
                          <div></div>
                          <div className="font-bold text-[0.6rem] text-center group-hover:text-white">
                            Archive
                          </div>
                        </div>
                      </button>
                      <button className="px-2 py-2 rounded-sm group hover:ring-1  hover:ring-white transition-all duration-300 bg-transparent hover:bg-sky-400 text-red-400 ring-1 ring-red-400" onClick={()=>handleContentDelete(val._id)}>
                        <div className="flex gap-1 items-center justify-center">
                          <div></div>
                          <div className="font-bold text-[0.6rem] text-center group-hover:text-white">
                            Delete
                          </div>
                        </div>
                      </button>
                      <div></div>
                    </div>
                  </td>
                </tr>
              );
            })}
           
          </tbody>
        </table>
      </div>
    </div>
  );
}
