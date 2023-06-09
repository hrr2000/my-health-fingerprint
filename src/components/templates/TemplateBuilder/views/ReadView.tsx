export default function ReadView({ data }: { data: { _id: string }[] }) {
  // implementation for now

  return (
    <div className="text-primary flex flex-col gap-3">
      {data?.map((row) => (
        <ul
          className="cursor-pointer rounded-md bg-white p-3 border-2 transition hover:-translate-x-1 hover:-translate-y-1 hover:bg-gray-100"
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
