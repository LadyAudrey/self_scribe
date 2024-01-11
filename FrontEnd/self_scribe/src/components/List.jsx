export function List(props) {
  const { list } = props;
  return (
    <div>
      <fieldset>
        <legend className="legend title">{list.title}</legend>
        {list?.todos &&
          list.todos.map((task, index) => (
            <div key={index}>
              <label htmlFor={task.name} className="legend-title">
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
