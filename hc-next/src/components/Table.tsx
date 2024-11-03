"use client";
import React from "react";
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
} from "@nextui-org/react";

import { PlusIcon } from "@/assets/icons/PlusIcon";
import { VerticalDotsIcon } from "@/assets/icons/VerticalDotsIcon";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { ChevronDownIcon } from "@/assets/icons/ChevronDownIcon";
import { columns, records, descOptions } from "../data/data";
import { capitalize } from "@/lib/utils";
import { FileUpload } from "./ui/file-upload";

const INITIAL_VISIBLE_COLUMNS = [
  "ic_amb_zad",
  "dat_zad",
  "cas_zad",
  "prac_od",
  "text_dg",
  "actions",
];

export default function RecordsTable() {
  const [filterValue, setFilterValue] = React.useState("");

  const filterField = "text_dg";

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [descFilter, setdescFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "ic_amb_zad",
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
    let filteredrecords = [...records];

    if (hasSearchFilter) {
      filteredrecords = filteredrecords.filter((record) =>
        record.amb_zaz_text.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    if (
      descFilter !== "all" &&
      Array.from(descFilter).length !== descOptions.length
    ) {
      filteredrecords = filteredrecords.filter((record) =>
        Array.from(descFilter).includes(record[filterField]),
      );
    }

    return filteredrecords;
  }, [records, filterValue, descFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end);
  }, [page, sortedItems, rowsPerPage]);

  const renderCell = React.useCallback((record, columnKey) => {
    const cellValue = record[columnKey];

    switch (columnKey) {
      //   case "name":
      //     return (
      //       <record
      //         avatarProps={{ radius: "lg", src: record.avatar }}
      //         description={record.email}
      //         name={cellValue}
      //       >
      //         {record.email}
      //       </record>
      //     );
      //   case "role":
      //     return (
      //       <div className="flex flex-col">
      //         <p className="text-bold text-small capitalize">{cellValue}</p>
      //         <p className="text-bold text-tiny text-default-400 capitalize">
      //           {record.team}
      //         </p>
      //       </div>
      //     );
      //   case "desc":
      //     return (
      //       <Chip
      //         className="capitalize"
      //         color={"success"}
      //         size="sm"
      //         variant="flat"
      //       >
      //         {cellValue}
      //       </Chip>
      //     );
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
                <DropdownItem onClick={() => console.log(record)}>
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
  }, []);

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

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

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
            placeholder="Search by name..."
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
                  {columns.find((column) => column.uid === filterField)?.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={descFilter}
                selectionMode="multiple"
                onSelectionChange={setdescFilter}
              >
                {descOptions.map(
                  (desc: {
                    uid: string | number | undefined;
                    name: string;
                  }) => (
                    <DropdownItem key={desc.uid} className="capitalize">
                      {capitalize(desc.name)}
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
                onSelectionChange={setVisibleColumns}
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
            Celkem {records.length} záznamů
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
    descFilter,
    visibleColumns,
    onRowsPerPageChange,
    records.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="text-small text-default-400 w-[30%]">
          {selectedKeys === "all"
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
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      onRowAction={(key) =>
        alert(
          records.find((record) => record.ic_amb_zad === key)?.amb_zaz_text ??
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
          <TableRow key={item.ic_amb_zad}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
