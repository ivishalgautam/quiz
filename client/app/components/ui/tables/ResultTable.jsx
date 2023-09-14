const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
  },
  {
    name: "Level",
    selector: (row) => row.name,
  },
  {
    name: "Created At",
    selector: (row) => new Date(row.created_at).toDateString(),
  },
  {
    name: "Actions",
    selector: (row) => (
      <button className="bg-rose-500 group p-1 rounded hover:bg-white transition-all border hover:border-rose-500">
        <AiOutlineDelete
          size={20}
          className="text-white group-hover:text-rose-500"
          onClick={() => handleDelete(row.id)}
        />
      </button>
    ),
  },
];
