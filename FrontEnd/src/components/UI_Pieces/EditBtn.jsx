export function EditBtn(props) {
  const { editing, setEditing } = props;
  return (
    <button
      className="h-6 w-6 bg-cover bg-[url('/Buttons/Edit.svg')]"
      onClick={() => {
        setEditing(!editing);
      }}
    />
  );
}