export function ExitBtn(props) {
  const { setterFx } = props;
  return <img onClick={setterFx} src="/Buttons/exit.svg" className="w-1/12" />;
}
