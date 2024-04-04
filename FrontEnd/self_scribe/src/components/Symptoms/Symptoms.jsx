export function Symptoms() {
  return (
    <>
      <div>
        <h2 className="text-2xl">Symptoms</h2>
        <label for="search-symptoms">
          <input
            type="search"
            placeholder="Search for symptoms"
            id="search-symptoms"
            name="search-symptoms"
            className="bg-black"
          ></input>
        </label>
        <fieldset>
          <legend className="text-2xl">Recent Symptoms</legend>
        </fieldset>
      </div>

      {/* Pieces:
        Symptoms Header (DONE!)
        Search Bar (DONE!)
        Recent Symptoms
        Today's Symptoms */}
    </>
  );
}
