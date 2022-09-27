import { useContext,useState } from "react";

// Context
import ShowsContext from '../contexts/shows/showsContext';

// Components
import Searchbar from "../components/Searchbar";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";

const Homepage = () => {
  const showsContext = useContext(ShowsContext);
  const { loading, shows } = showsContext;
  const [select,setSelect]=useState("");
  const showConsolea=()=>{
    setSelect("Actor");
  }
  const showConsolep=()=>{
    setSelect("Show");
  }
  // const { x }=select==="Actor"?(shows.filter((item)=>{item.})):shows;
  // console.log("aman-----------")
  return (
    <div className="homepage">
      <input type="radio" name="select" className="rradio" onClick={showConsolea}/>  Actor
      <input type="radio" name="select" className="rradio" onClick={showConsolep}/>  Show
      <Searchbar props={select}/>
      {loading ? (
        <Loader />
      ) : (
        <div className="homepage__list">
          {shows.map((item) => (
            <ListItem
              key={item.show.id}
              id={item.show.id}
              image={
                item.show.image
                  ? item.show.image.medium
                  : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
              }
              name={item.show.name}
              rating={
                item.show.rating.average
                  ? item.show.rating.average
                  : "No rating"
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;