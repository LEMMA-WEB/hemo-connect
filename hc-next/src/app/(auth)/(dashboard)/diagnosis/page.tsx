import Table from "@/components/Table";

export default function Diagnosis() {
  return (
    <div className="w-1/2">
      <div className="mx-12 mt-20">
        <h1 className="text-4xl font-bold">Jméno Příjmení</h1>
        <div className="flex justify-around px-4 pt-2">
          <p className="text-lg text-neutral-500">1. 1. 1999</p>
          <div className="border-3 min-h-48 min-w-24 rounded-md border-black bg-red-700 p-8 text-white">
            <h3 className="pb-2 text-xl font-medium">Výsledek Laboratoře</h3>
            <p className="text-sm">Hemofilie A</p>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
}
