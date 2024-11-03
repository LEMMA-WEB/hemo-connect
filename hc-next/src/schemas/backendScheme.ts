import { z } from "zod";

export const schemaPatient = z.object({
  first_dat: z.string(),
  gen_mark: z.string(),
  ic_pac: z.string(),
  last_dat: z.string(),
  text_dg: z.array(z.string()),
});

export const schemaRecord = z.object({
  amb_zaz_text: z.string(),
  cas_zad: z.string(),
  dat_zad: z.string(),
  dg_kod: z.string(),
  i_dg_kod: z.string(),
  i_text_dg: z.string(),
  ic_amb_karta: z.string(),
  ic_amb_zad: z.string(),
  ic_pac: z.string(),
  poz_text: z.string(),
  prac_od: z.string(),
  text_dg: z.string(),
});

export const schemeDiagnostic = z.object({
  code: z.string(),
});

export const schemaAiData = z.object({
  id: z.string(),
  sentence: z.string(),
  sentence_from_start: z.number(),
  sentence_length: z.number(),
  value: z.string(),
});

export const schemaRecordVector = z.object({
  amb_zaz_text: z.string(),
  cas_zad: z.string(),
  confidence: z.string(),
  dat_zad: z.string(),
  dg_kod: z.string(),
  i_dg_kod: z.string(),
  i_text_dg: z.string(),
  ic_amb_karta: z.string(),
  ic_amb_zad: z.string(),
  ic_pac: z.string(),
  poz_text: z.string(),
  prac_od: z.string(),
  text_dg: z.string(),
});

export const schemaAiRecord = z.object({
  data: z.array(schemaAiData),
  original: z.array(schemaRecordVector),
});
