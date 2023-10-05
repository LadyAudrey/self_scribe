export default function page() {
  return (
    <>
      <div className="editing">
        <h2 className="text-green-400">Your Lists</h2>
        {/* contains a list of stored Lists, with a button to add and edit each one*/}
        <div className="flex flex-row data">
          <img src="/Buttons/add.svg" className="btn-fx" />
          <h3>Name of Data List</h3>
          <img src="/Buttons/Edit.svg" className="btn-fx" />
        </div>
      </div>
    </>
  );
}
