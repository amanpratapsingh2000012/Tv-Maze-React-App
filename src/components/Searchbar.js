import { useState, useContext } from "react";

// Context
import ShowsContext from "../contexts/shows/showsContext";
import AlertsContext from '../contexts/alerts/alertsContext';

// Components
import Alert from "./Alert";

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const showsContext = useContext(ShowsContext);
  const { searchShows } = showsContext;
  const { alert, setAlert } = useContext(AlertsContext);
  const [sselect,setSSelect]=useState("");

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      setAlert("Please enter something", "danger");
    } else {
      searchShows(searchTerm,sselect);
    }
  };

  return (
    <div className="searchbar">
      {alert ? <Alert message={alert.message} type={alert.type} /> : null}
      <form className="searchbar__form">
        {
        props.props==="Actor"?<input
          type="text"
          placeholder="Search For Tv Actor"
          value={searchTerm}
          onChange={(e) =>{setSSelect(props.props);setSearchTerm(e.target.value)}}
        />:<input
        type="text"
        placeholder="Search For Tv Show"
        value={searchTerm}
        onChange={(e) =>{setSSelect(props.props);setSearchTerm(e.target.value)}}
      />
        }
        <button className="btn btn-block" onClick={onSearchHandler}>
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default Searchbar;