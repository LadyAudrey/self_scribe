export function VisibleBtn(props) {
  const { visible, setVisible } = props;
  return (
    <button
      className="h-6 w-6 bg-cover bg-[url('/Buttons/viewLists.svg')]"
      onClick={() => {
        setVisible(!visible);
      }}
    />
  );
}

//       className="h-6 w-6 bg-cover bg-[url('/Buttons/viewLists.svg')]"
