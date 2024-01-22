export function List(props) {
  const { list } = props;
  return (
    <div>
      <fieldset>
        <legend className="legend title">{list.name}</legend>
        {list?.todos &&
          list.todos.map((task) => (
            <div>
              <label htmlFor={task.name} className="legend-name">
                {task.name}
              </label>
              <input
                id={task.name}
                name={task.name}
                type="checkbox"
                onChange={() => {
                  console.log("clicked onChange");
                }}
                className="m-2"
                checked={task.completed}
              />
              <button>Edit</button>
            </div>
          ))}
      </fieldset>
    </div>
  );
}
