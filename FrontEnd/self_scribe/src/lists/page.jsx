import EditList from "../components/EditList";
import Link from "next/link";
import Image from "next/image";

// creating mockData to fill props Fx
const mockData = {
  listName: "Morning Routine",
  activities: ["hygiene", "meditate", "exercise"],
};

export default function page(props) {
  const listName = props.list;
  return (
    <>
      <div className="editing">
        <Link href="/">
          <Image
            src="/Buttons/Home.svg"
            height={200}
            width={200}
            className="fixed right-0 top-0 sm:m-5 btn-fx"
            alt="hamburger menu"
          />
        </Link>
        <h2 className="text-green-400">Your Lists</h2>
        {/* contains a list of stored Lists, with a button to add and edit each one*/}
        <div className="flex flex-row data items-start">
          {/* needs a function to add this list to TDL via onClick*/}
          <Image
            src="/Buttons/add.svg"
            height={200}
            width={200}
            className="btn-fx"
            alt="add"
          />
          <h2>listName</h2>
          {/* needs onClick to show card component */}
          <Image
            src="/Buttons/Edit.svg"
            height={200}
            width={200}
            className="btn-fx"
            alt="edit"
          />
          <EditList
            listName={mockData.listName}
            activities={mockData.activities}
          />
        </div>
      </div>
    </>
  );
}
