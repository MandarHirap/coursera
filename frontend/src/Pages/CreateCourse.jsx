function CreateCourse() {
  return (
    <div>
      <h2>Create Course (Admin)</h2>
      <form>
        <input type="text" placeholder="Title" />
        <br />
        <br />
        <input type="text" placeholder="Description" />
        <br />
        <br />
        <input type="text" placeholder="Image URL" />
        <br />
        <br />
        <input type="number" placeholder="Price" />
        <br />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCourse;
