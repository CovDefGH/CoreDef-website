type SpecTableProps = {
  caption: string;
  rows: { label: string; value: string }[];
};

// FR-EDIM-4 / FR-ENADOX-4: label/value rows with zebra striping.
export function SpecTable({ caption, rows }: SpecTableProps) {
  return (
    <table className="border-line w-full border text-left text-sm">
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {rows.map(({ label, value }) => (
          <tr key={label} className="even:bg-surface">
            <th
              scope="row"
              className="text-ink w-1/3 px-5 py-4 font-medium md:w-1/4"
            >
              {label}
            </th>
            <td className="text-ink-muted px-5 py-4">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
