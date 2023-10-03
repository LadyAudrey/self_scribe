export default function Card() {
  return (
    <>
      <div className="flex flex-col">
        <h4>Edit stored item name</h4>
        <div>Toggle Slider with Boolean/ Integer</div>
        <div className="flex flex-row">
          <button>Pause</button>
          <button>Delete</button>
        </div>
      </div>
    </>
  );
}
