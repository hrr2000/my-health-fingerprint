interface IRow {
  [k: string]: string;
  _id: string;
}

const Record = ({ row }: { row: IRow }) => {
  return (
    <ul className="cursor-pointer rounded-md border-2 bg-white p-3 transition hover:-translate-x-1 hover:-translate-y-1 hover:bg-gray-100">
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
  );
};

export default function ReadView({
  data,
  fieldName,
  fieldValue,
}: {
  data: IRow[];
  fieldName?: string;
  fieldValue?: string;
}) {
  // implementation for now

  return (
    <div className="flex flex-col gap-3 text-primary">
      {data?.map((row) =>
        !fieldName || !fieldValue ? (
          <Record key={row._id.toString()} row={row} />
        ) : (
          row[fieldName]
            .toLowerCase()
            .includes(fieldValue.toLowerCase().trim()) && (
            <Record key={row._id.toString()} row={row} />
          )
        )
      )}
    </div>
  );
}
