export default function Card() {
  return (
    <>
      <div className="flex flex-col bg-gradient-to-b from-yellow-500 to-rose-400 card border-slate-400">
        <h4 className="card_data">Edit stored item name</h4>
        <div className="card_data">Toggle Slider with Boolean/ Integer</div>
        <div className="flex flex-row justify-around text-yellow-200">
          <button className="bg-slate-900">Pause</button>
          <button className="bg-slate-900">Delete</button>
        </div>
      </div>
    </>
  );
}
