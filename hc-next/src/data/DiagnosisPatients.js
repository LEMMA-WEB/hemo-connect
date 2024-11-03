/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { capitalize } from "@/lib/utils";
import diagnosisPatients from "./diagnosisPatients.json";

// {
//     "first_dat": "2023-12-05",
//     "gen_mark": "GHV",
//     "ic_pac": "1091",
//     "last_dat": "2023-12-05",
//     "text_dg": ["CLL, KONTROLA"]
//   },

const columns = [
  { name: "ID Pacienta", uid: "ic_pac", sortable: true },
  { name: "První návštěva", uid: "first_dat", sortable: true },
  { name: "Poslední návštěva", uid: "last_dat", sortable: true },
  { name: "Terapie", uid: "text_dg" },
  { name: "Genetické markery", uid: "gen_mark" },
  { name: "Možnosti", uid: "actions" },
];

const patients = diagnosisPatients.map((record) => ({
  ...record,
  text_dg: record.text_dg.join(", "),
}));

const genOptions = Array.from(
  new Set(patients.map((patient) => patient.gen_mark)).values(),
).map((gen) => ({
  uid: gen,
  name: gen.length == 0 ? "Prázdný" : capitalize(gen),
}));

export { columns, patients, genOptions };
