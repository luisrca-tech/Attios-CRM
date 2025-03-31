"use client";

import { useAtom } from "jotai";
import { isOpenContentSidebar } from "~/common/atoms/content-sidebar.atom";
import { AddActionMenu } from "./AddActionMenu";
import { Button } from "./Button";
import { Icon } from "./Icons/_index";
import { useRef, type ReactNode } from "react";
import { isOpenSearchAtom } from "~/common/atoms/is-open-search";
import { Input } from "./Input";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

type PagesHeaderProps = {
  title: string;
  iconLeft?: ReactNode;
  onClickIconLeft?: () => void;
  children?: ReactNode;
};

export function PagesHeader({ title, children }: PagesHeaderProps) {
  const [, setIsShowingContentSidebar] = useAtom(isOpenContentSidebar);
  const [isOpenSearch, setIsOpenSearch] = useAtom(isOpenSearchAtom);

  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const handleSearch = async (value: string) => {
    await setPage(1);
    await setSearch(value);
  };

  const searchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsOpenSearch((prev) => !prev);
  };

  const toggleContentSidebar = () => {
    setIsShowingContentSidebar((prev) => !prev);
  };

  return (
    <header className="w-full border-white-200 border-b bg-white-100 p-4 lg:bg-white-300 lg:py-6">
      <div className="flex w-full items-center justify-between lg:hidden">
        {isOpenSearch ? (
          <Input.Root className="h-full w-64">
            <Input.Text
              value={search}
              ref={mobileSearchRef}
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Input.Root>
        ) : (
          <Button
            className="bg-white-500 p-3 hover:bg-white-200"
            color="secondary"
            onClick={toggleSearch}
          >
            <Icon.Search className="h-4 w-4" />
          </Button>
        )}
        {!isOpenSearch && (
          <strong className="text-black text-lg leading-7">{title}</strong>
        )}
        {children}
      </div>
      <div className="hidden lg:flex lg:w-full lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <Button
            onClick={toggleContentSidebar}
            className="bg-primary-200/10 p-[0.625rem] hover:bg-primary-200/50"
            color="secondary"
          >
            <Icon.Menu className="h-4 w-4" />
          </Button>
          <strong className="text-xl leading-8">{title}</strong>
        </div>
        <div className="flex gap-[0.375rem]">
          {isOpenSearch ? (
            <Input.Root className="h-full w-96">
              <Input.Text
                value={search}
                ref={searchRef}
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Input.Root>
          ) : (
            <Button
              className="bg-white-500 p-3 hover:bg-white-200"
              color="secondary"
              onClick={toggleSearch}
            >
              <Icon.Search className="h-4 w-4" />
            </Button>
          )}
          <AddActionMenu />
        </div>
      </div>
    </header>
  );
}
