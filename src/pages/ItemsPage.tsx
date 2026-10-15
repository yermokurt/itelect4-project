import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemCard from "../components/ItemCard";
import { createItem, fetchItems } from "../api/items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePrevious from "../hooks/usePrevious";
import useToggle from "../hooks/useToggle";
import { useUIStore } from "../store/useUIStore";
import { useAuthStore } from "../store/useAuthStore";
import { itemSchema, type ItemFormValues } from "../schemas/itemSchema";
import { ItemStatus, type Item } from "../types";

function ItemsPage() {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isPending, isError, error } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: () => fetchItems(token!),
    enabled: token !== null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      status: ItemStatus.Lost,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: ItemFormValues): Promise<Item> => {
      return createItem(values, token!);
    },
    onSuccess: async () => {
      reset();
      setIsModalOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const [showOnlyLost, toggleShowOnlyLost] = useToggle(false);
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setSearchQuery = useUIStore((state) => state.setSearchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const items = data ?? [];
  const previousItemCount = usePrevious<number>(items.length);

  useEffect(() => {
    if (!isPending) {
      searchInputRef.current?.focus();
    }
  }, [isPending]);

  const filteredItems = items.filter((item) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.id.toLowerCase().includes(normalizedQuery);
    const matchesLostFilter = showOnlyLost ? item.status === ItemStatus.Lost : true;

    return matchesSearch && matchesLostFilter;
  });

  const handleSelectItem = (selectedItem: Item): void => {
    navigate(`/item/${selectedItem.id}`);
  };

  const handleCreateSubmit = (values: ItemFormValues): void => {
    createMutation.mutate(values);
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <section className="flex flex-col items-center gap-3 rounded-xl border border-stone-300 bg-stone-100 p-4 shadow-md transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900 sm:flex-row">
        <div className="relative w-full flex-1">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-stone-400">🔍</span>
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search items by item number or title..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            disabled={isPending}
            className="h-10 border-stone-300 bg-orange-50/50 py-2 pr-4 pl-9 text-stone-800 placeholder:text-stone-400 focus-visible:border-teal-600 focus-visible:ring-teal-600/30 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50 dark:focus-visible:border-teal-400 dark:focus-visible:ring-teal-400/30"
          />
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            onClick={toggleShowOnlyLost}
            disabled={isPending}
            className={`w-full whitespace-nowrap rounded-lg border px-4 py-2 text-xs font-semibold transition-colors duration-300 ease-in-out disabled:opacity-50 sm:w-auto ${
              showOnlyLost
                ? "border-rose-600 bg-rose-600 text-white hover:bg-rose-700"
                : "border-stone-300 bg-stone-200 text-stone-800 hover:bg-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-orange-50 dark:hover:bg-stone-700"
            }`}
          >
            {showOnlyLost ? "Show All Items" : "Show Only Lost"}
          </button>
          <Button
            onClick={() => setIsModalOpen(true)}
            disabled={isPending}
            className="w-full whitespace-nowrap bg-teal-600 text-xs font-semibold text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 sm:w-auto"
          >
            Report Item
          </Button>
        </div>
      </section>

      <section className="flex flex-1 flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wider text-stone-500 uppercase transition-colors duration-300 ease-in-out dark:text-stone-400">
            Reported Items {!isPending && `(${filteredItems.length})`}
          </h2>
          {!isPending && !isError && (
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Previous count: {previousItemCount ?? 0}
            </span>
          )}
        </div>

        {isPending && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((skeletonId) => (
              <div key={skeletonId} className="flex flex-col gap-4 rounded-xl border border-stone-300 bg-stone-100 p-5 shadow-md transition-colors duration-300 ease-in-out animate-pulse dark:border-stone-800 dark:bg-stone-900">
                <div className="h-5 w-1/2 rounded-md bg-stone-200 dark:bg-stone-800" />
                <div className="h-4 w-full rounded-md bg-stone-200 dark:bg-stone-800" />
                <div className="h-4 w-3/4 rounded-md bg-stone-200 dark:bg-stone-800" />
                <div className="h-8 w-full rounded-lg bg-stone-200 dark:bg-stone-800" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="my-auto flex flex-1 flex-col items-center justify-center rounded-xl border border-rose-300 bg-rose-100 p-12 text-center shadow-md transition-colors duration-300 ease-in-out dark:border-rose-800 dark:bg-rose-950/60">
            <h3 className="mb-1 text-base font-semibold text-rose-700 dark:text-rose-400">Unable to load items</h3>
            <p className="max-w-sm text-xs text-stone-600 dark:text-stone-300">{error.message}</p>
          </div>
        )}

        {!isPending && !isError && filteredItems.length === 0 && (
          <div className="my-auto flex flex-1 flex-col items-center justify-center rounded-xl border border-stone-300 bg-stone-100 p-12 text-center shadow-md transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900">
            <div className="mb-3 text-4xl">🔍</div>
            <h3 className="mb-1 text-base font-semibold text-stone-800 transition-colors duration-300 ease-in-out dark:text-orange-50">No Items Found</h3>
            <p className="max-w-sm text-xs text-stone-500 transition-colors duration-300 ease-in-out dark:text-stone-400">Try another title, location, or filter, or report a new item.</p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-teal-600 text-xs font-semibold text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
            >
              + Report Item
            </Button>
          </div>
        )}

        {!isPending && !isError && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onSelect={handleSelectItem} variant="default" />
            ))}
          </div>
        )}
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-stone-300 bg-stone-100 p-6 shadow-2xl transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-300 pb-4 dark:border-stone-800">
              <div>
                <h2 className="text-lg font-bold text-stone-800 dark:text-orange-50">
                  Report an Item
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Provide details about the lost or found item
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-stone-400 hover:bg-stone-200 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(handleCreateSubmit)} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <Label htmlFor="title" className="text-foreground">
                  Item Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Student ID, Tumbler, Scientific Calculator"
                  aria-invalid={errors.title ? true : undefined}
                  {...register("title")}
                  className="h-10 border-stone-300 bg-orange-50/50 px-4 text-stone-800 placeholder:text-stone-400 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50"
                />
                {errors.title && (
                  <p className="text-xs text-rose-700 dark:text-rose-400">{errors.title.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <Label htmlFor="status" className="text-foreground">
                  Status
                </Label>
                <select
                  id="status"
                  aria-invalid={errors.status ? true : undefined}
                  {...register("status")}
                  className="h-10 rounded-lg border border-stone-300 bg-orange-50/50 px-3 text-xs font-medium text-stone-800 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50"
                >
                  <option value={ItemStatus.Lost}>Lost (I lost this item)</option>
                  <option value={ItemStatus.Found}>Found (I found this item)</option>
                </select>
                {errors.status && (
                  <p className="text-xs text-rose-700 dark:text-rose-400">{errors.status.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <Label htmlFor="location" className="text-foreground">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Library, Student Center, Science Hall"
                  aria-invalid={errors.location ? true : undefined}
                  {...register("location")}
                  className="h-10 border-stone-300 bg-orange-50/50 px-4 text-stone-800 placeholder:text-stone-400 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50"
                />
                {errors.location && (
                  <p className="text-xs text-rose-700 dark:text-rose-400">{errors.location.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <Label htmlFor="description" className="text-foreground">
                  Description
                </Label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Describe appearance, markings, color, condition..."
                  aria-invalid={errors.description ? true : undefined}
                  {...register("description")}
                  className="w-full rounded-lg border border-stone-300 bg-orange-50/50 p-3 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:border-stone-800 dark:bg-stone-950 dark:text-orange-50 dark:focus:ring-teal-400"
                />
                {errors.description && (
                  <p className="text-xs text-rose-700 dark:text-rose-400">{errors.description.message}</p>
                )}
              </div>

              {createMutation.isError && (
                <p className="rounded-lg border border-rose-300 bg-rose-100 p-3 text-xs text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-400">
                  {createMutation.error.message}
                </p>
              )}

              <div className="mt-2 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={createMutation.isPending}
                  className="border-stone-300 bg-stone-200 text-stone-800 hover:bg-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-orange-50 dark:hover:bg-stone-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
                >
                  {createMutation.isPending ? "Submitting..." : "Report Item"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemsPage;
