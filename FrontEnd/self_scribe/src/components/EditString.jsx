import { useState, useContext } from "react";
import { ListsData } from "../Contexts/ListsData";

export default function EditString(props) {
  const { list, setEditingName } = props;
  const { lists, setLists } = useContext(ListsData);

  // console.log(lists);
  // const [editingName, setEditingName] = useState(false);
  const [listName, setListName] = useState(list.name);

  function handleNameChange() {
    // TODO: update to change the list name in the DB
    // first TODO: need to switch to a context hook
    console.log("handleNameChanging", listName);
    const newList = { ...list, name: listName };
    const oldListIndex = lists.indexOf((element) => {
      return element.name === list.name;
    });
    const newLists = [...lists];
    newLists[oldListIndex] = newList;
    setLists(newLists);
    setEditingName(false);
  }
  return (
    <div>
      <input
        autoFocus
        value={listName}
        className="bg-black"
        onChange={(event) => {
          setListName(event.target.value);
        }}
        onBlur={handleNameChange}
      />
    </div>
  );
}
