import Table from "@/components/Table";

export default function Diagnosis() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Jméno Příjmení</h1>
      <div className="flex justify-around px-4 pt-2">
        {/* <div className="border-3 min-h-48 min-w-24 rounded-md border-black bg-neutral-400 p-8">
            <h3 className="pb-2 text-xl font-medium">Výsledek Laboratoře</h3>
            <p className="text-sm">Hemofilie A</p>
          </div> */}
      </div>
      <Table />
    </div>
  );
}
