/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { capitalize } from "@/lib/utils";
import patientRecords from "./patientRecords.json";

const columns = [
  { name: "ID Záznamu", uid: "ic_amb_zad", sortable: true },
  { name: "ID Karty", uid: "ic_amb_karta", sortable: true },
  { name: "ID Pacienta", uid: "ic_pac", sortable: true },
  { name: "Datum zadání", uid: "dat_zad", sortable: true },
  { name: "Čas zadání", uid: "cas_zad", sortable: true },
  { name: "ID Doktora", uid: "prac_od" },
  { name: "Typ", uid: "type" },
  { name: "DG_KOD", uid: "dg_kod" },
  { name: "Terapie", uid: "text_dg" },
  { name: "Kód diagnózy", uid: "i_dg_kod" },
  { name: "Název diagnozy", uid: "i_text_dg" },
  { name: "Poznámka", uid: "poz_text" },
  { name: "Text záznamu", uid: "amb_zaz_text" },
  { name: "Možnosti", uid: "actions" },
];

const records = patientRecords.map((record) => ({
  ...record,
  type: "Ambulatní zpráva",
}));

const descOptions = Array.from(
  new Set(records.map((record) => record.text_dg)).values(),
).map((dg) => ({ uid: dg, name: dg.length == 0 ? "Prázdný" : capitalize(dg) }));

export { columns, records, descOptions };
