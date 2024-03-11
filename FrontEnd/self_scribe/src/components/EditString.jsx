export default function EditString(props) {
  const {
    id,
    setEditingName,
    state,
    setState,
    inputName,
    setInputName,
    structure,
  } = props;

  async function handleNameChange() {
    const newState = state.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          name: inputName,
        };
      }
      return element;
    });
    // updating global state with the edited string
    const response = await fetch(
      `http://localhost:3001/${structure}/edit/${id}/${inputName}`,
      {
        method: "POST",
      }
    );
    if (response.ok) {
      setState(newState);
      setEditingName(false);
    }
  }
  return (
    <div>
      <input
        autoFocus
        value={inputName}
        className="bg-black"
        onChange={(event) => {
          setInputName(event.target.value);
        }}
        onBlur={handleNameChange}
      />
    </div>
  );
}
