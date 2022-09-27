import { useEffect, useReducer } from "react";
import axios from "axios";
import ShowsContext from "./showsContext";
import ShowsReducer from "./showsReducer";
import {
  SEARCH_SHOWS,
  SET_LOADING,
  SET_SINGLE_SHOW,
  CLEAR_SINGLE_SHOW,
} from "../types";

const ShowsState = (props) => {
  const initialState = {
    shows: [],
    singleShow: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(ShowsReducer, initialState);

  useEffect(()=>{
    const getDefaultShows=async ()=>{
      const {data}= await axios.get(`https://api.tvmaze.com/search/shows?q=india`);
      dispatch({
        type:SEARCH_SHOWS,
        payload:data
      })
    }
    getDefaultShows();
  },[])

  const searchShows = async (searchTerm, sselect) => {

    dispatch({ type: SET_LOADING });

     console.log(sselect);

     if(sselect==="Actor"){
      const {data}=await axios.get(`https://api.tvmaze.com/search/people?q=${searchTerm}`);
      const person=data.filter((item)=>{return item.person.name.toLowerCase().split(" ").includes(searchTerm.toLowerCase())});
      console.log(data);
      if(person.length>0){
        const actorId=person[0].person.id;
        console.log(actorId);
        const showData=await axios.get(`https://api.tvmaze.com/people/${actorId}/castcredits?embed=show`);
        const actualData=[];
        actualData.push(showData.data[0]._embedded);
        console.log(actualData);
        dispatch({
          type:SEARCH_SHOWS,
          payload:actualData
        })
      }
     }
     else{
      const { data } = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
      dispatch({
        type:SEARCH_SHOWS,
        payload:data,
      })
     }
    }

  const getSingleShow = async (id) => {
    dispatch({
     type: SET_LOADING
    });

    const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`);

    dispatch({
      type: SET_SINGLE_SHOW,
      payload: data,
    });
  };

  const clearSingleShow = () => {
    dispatch({
      type: CLEAR_SINGLE_SHOW,
    });
  };

  return (
    <ShowsContext.Provider
      value={{
        shows: state.shows,
        singleShow: state.singleShow,
        loading: state.loading,
        searchShows,
        getSingleShow,
        clearSingleShow,
      }}
    >
      {props.children}
    </ShowsContext.Provider>
  );
};

export default ShowsState;

