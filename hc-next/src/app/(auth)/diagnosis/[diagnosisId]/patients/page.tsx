import Table from "@/components/Table";
import {
  columns,
  records as data,
  descOptions as pickOptions,
} from "@/data/data";

export default function Diagnosis() {
  return (
    <div className="p-8 px-12">
      <h1 className="text-4xl font-bold">DATA z NISu</h1>
      <Table
        {...{
          columns,
          data,
          pickOptions,
          initialVisibleColumns: [
            "ic_amb_zad",
            "dat_zad",
            "cas_zad",
            "prac_od",
            "text_dg",
            "actions",
          ],
          pickFilterField: "text_dg",
          idColumn: "ic_amb_zad",
          searchField: "amb_zaz_text",
        }}
      />
    </div>
  );
}
