export default function ReadView({ data }: { data: { _id: string }[] }) {
  // implementation for now

  return (
    <div className="text-white">
      {data.map((row) => (
        <ul
          className="cursor-pointer rounded-md bg-primary p-3 shadow-md transition hover:-translate-x-1 hover:-translate-y-1 hover:bg-primary-hover"
          key={row._id.toString()}
        >
          {Object.entries(row).map(([k, v]) => {
            return (
              k !== "_id" && (
                <li key={k}>
                  <span className="font-semibold capitalize">{k}</span>{" "}
                  <span className="mx-1">:</span> <span>{v}</span>
                </li>
              )
            );
          })}
        </ul>
      ))}
    </div>
  );
}
