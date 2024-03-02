import { useContext } from "react";
import { ListsContext } from "../Contexts/ListsContext";

export default function EditString(props) {
  const { id, setEditingName, listName, setListName, structure } = props;
  const { lists, setLists } = useContext(ListsContext);

  let list = lists.filter((list) => {
    return list.id === id;
  })[0];

  async function handleNameChange() {
    // line 16 is making a copy of OG list, replace the name with the new name
    const newList = { ...list, name: listName };
    // finding the index of the list we need to update
    const oldListIndex = lists.findIndex((element) => {
      return element.id === id;
    });
    // making a copy of the current list
    const newLists = [...lists];
    // replace the list at the index we found with the updated list
    newLists[oldListIndex] = newList;
    // update local state
    list = newLists;
    // updating global state with the edited string
    const response = await fetch(
      `http://localhost:3001/${structure}/edit/${id}/${listName}`,
      {
        method: "POST",
      }
    );
    console.log(newLists);
    if (response.ok) {
      setLists(newLists);
      setEditingName(false);
    }
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
