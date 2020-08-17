import React from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function SearchLinks() {
  const { firebase } = React.useContext(FirebaseContext);
  const [filteredLinks, setFilteresLinks] = React.useState([]);
  const [links, setLinks] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    getInitialLink();
  }, []);

  function getInitialLink() {
    firebase.db
      .collection("links")
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
      });
  }

  function handleSearch(event) {
    event.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteresLinks(matchedLinks);
  }
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          Search <input onChange={(event) => setFilter(event.target.value)} />
          <button>ok</button>
        </div>
      </form>
      {filteredLinks.map((filteredLink, index) => (
        <LinkItem
          key={filteredLink.id}
          showCount={false}
          link={filteredLink}
          index={index}
        />
      ))}
    </div>
  );
}

export default SearchLinks;
