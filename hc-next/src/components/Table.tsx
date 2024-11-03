"use client";
import React, { type Key } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  type SharedSelection,
  type SortDescriptor,
} from "@nextui-org/react";

import { PlusIcon } from "@/assets/icons/PlusIcon";
import { VerticalDotsIcon } from "@/assets/icons/VerticalDotsIcon";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { ChevronDownIcon } from "@/assets/icons/ChevronDownIcon";
import { capitalize } from "@/lib/utils";

interface DataTableProps {
  data: Record<string, string>[];
  initialVisibleColumns: string[];
  columns: { uid: string; name: string; sortable?: boolean }[];
  pickOptions: { uid: string; name: string }[];
  pickFilterField: string;
  sortField?: string;
  idColumn: string;
  searchField: string;
  onRowAction?: (key: Key) => void;
}

export default function DataTable({
  data,
  initialVisibleColumns,
  columns,
  pickOptions,
  pickFilterField,
  sortField,
  idColumn,
  onRowAction,
  searchField,
}: DataTableProps) {
  const [filterValue, setFilterValue] = React.useState("");

  const [selectedKeys, setSelectedKeys] = React.useState<Set<string> | string>(
    new Set([]),
  );

  const [visibleColumns, setVisibleColumns] = React.useState<
    Set<string> | string
  >(new Set(initialVisibleColumns));

  const [pickFilter, setpickFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: sortField ?? idColumn,
    direction: "descending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((data) =>
        data[searchField]?.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    if (
      pickFilter !== "all" &&
      Array.from(pickFilter).length !== pickOptions.length
    ) {
      filteredData = filteredData.filter((data) =>
        Array.from(pickFilter).includes(data[pickFilterField] ?? ""),
      );
    }

    return filteredData;
  }, [data, filterValue, pickFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column] ?? "";
      const second = b[sortDescriptor.column] ?? "";
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  const renderCell = React.useCallback(
    (data: Record<string, string>, columnKey: string | number) => {
      const cellValue = data[columnKey];

      switch (columnKey) {
        case "status":
          return (
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  cellValue === "done" ? "bg-success" : "bg-warning"
                }`}
              />
              <p>{cellValue}</p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => console.log(data)}>
                    Zobrazit
                  </DropdownItem>
                  <DropdownItem>Upravit</DropdownItem>
                  <DropdownItem>Smazat</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <p className="max-w-24 truncate">{cellValue}</p>;
      }
    },
    [],
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: { target: { value: string } }) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback(
    (value: React.SetStateAction<string>) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    [],
  );

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder={
              "Vyhledávání ve sloupci: " +
              columns.find((column) => column.uid === searchField)?.name
            }
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  {
                    columns.find((column) => column.uid === pickFilterField)
                      ?.name
                  }
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={pickFilter}
                selectionMode="multiple"
                onSelectionChange={
                  setpickFilter as (keys: SharedSelection) => void
                }
              >
                {pickOptions.map(
                  (pick: {
                    uid: string | number | undefined;
                    name: string;
                  }) => (
                    <DropdownItem key={pick.uid} className="capitalize">
                      {capitalize(pick.name)}
                    </DropdownItem>
                  ),
                )}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Sloupce
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={
                  setVisibleColumns as (keys: SharedSelection) => void
                }
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" endContent={<PlusIcon />}>
                  Přidat záznam
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>PDF Dokument</DropdownItem>
                <DropdownItem>Záznam</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            Celkem {data.length} záznamů
          </span>
          <label className="text-default-400 text-small flex items-center">
            Záznamů na stránku
            <select
              className="text-default-400 text-small bg-transparent outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    pickFilter,
    visibleColumns,
    onRowsPerPageChange,
    data.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="text-small text-default-400 w-[30%]">
          {selectedKeys === "all" ||
          typeof selectedKeys == "string" ||
          selectedKeys.size === items.length
            ? "Všechny záznamy vybrány"
            : `Vybráno ${selectedKeys.size} z ${filteredItems.length} záznamů`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Předchozí
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Další
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Pacientovy záznamy"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor as SortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={
        setSelectedKeys as (selectedKeys: SharedSelection) => void
      }
      onSortChange={setSortDescriptor as (descriptor: SortDescriptor) => void}
      onRowAction={
        typeof onRowAction !== undefined
          ? onRowAction
          : (key) =>
              alert(
                data.find((data) => data?.[idColumn] === key)?.amb_zaz_text ??
                  "",
              )
      }
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "end" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Žádné záznamy nebyly nalezeny"} items={items}>
        {(item) => (
          <TableRow key={item[idColumn]}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
