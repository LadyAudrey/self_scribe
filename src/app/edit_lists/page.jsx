import Card from "../components/Card";
export default function page() {
  return (
    <>
      <div className="editing">
        <h2 className="text-green-400">Name of List</h2>
        {/* contains a list of stored Lists, with a button to add and edit each one*/}
        <div className="flex flex-row data">
          <h3>Item Name</h3>
          {/* button listener to access card component */}
          <img src="/Buttons/Edit.svg" className="btn-fx" alt="edit" />
          <Card/>
        </div>
      </div>
    </>
  );
}
