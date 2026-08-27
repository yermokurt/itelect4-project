import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createClaim, fetchItemById, updateItemStatus } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { claimSchema, type ClaimFormValues } from "@/schemas/claimSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { ItemStatus, type ApiItem } from "@/types";

interface ClaimRequest {
  item: ApiItem;
  values: ClaimFormValues;
}

function ItemDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const { data, isPending, isError, error } = useQuery<ApiItem>({
    queryKey: ["items", id],
    queryFn: () => fetchItemById(id!),
    enabled: id !== undefined,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    mode: "onBlur",
    defaultValues: {
      claimerName: "",
      claimerEmail: "",
      ownershipDetails: "",
    },
  });

  const claimMutation = useMutation({
    mutationFn: async ({ item, values }: ClaimRequest): Promise<ApiItem> => {
      await createClaim({
        itemId: item.id,
        claimerUserId: user?.id ?? 1,
        claimerName: values.claimerName,
        claimerEmail: values.claimerEmail,
        ownershipDetails: values.ownershipDetails,
        dateClaimed: new Date().toISOString().slice(0, 10),
      });

      return updateItemStatus(item.id, ItemStatus.Claimed);
    },
    onSuccess: async (claimedItem, claimRequest) => {
      reset();
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      await queryClient.invalidateQueries({ queryKey: ["items", id] });
      await queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.setQueryData<ApiItem>(["items", claimRequest.item.id], claimedItem);
    },
  });

  const handleBackToItems = (): void => {
    navigate("/items");
  };

  const handleClaimSubmit = (values: ClaimFormValues): void => {
    if (data !== undefined) {
      claimMutation.mutate({ item: data, values });
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-1 animate-pulse flex-col gap-6">
        <div className="h-8 w-32 rounded-lg bg-stone-200 dark:bg-stone-800" />
        <div className="flex flex-col gap-5 rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-xl transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900">
          <div className="h-8 w-1/2 rounded-md bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 w-full rounded-md bg-stone-200 dark:bg-stone-800" />
          <div className="h-10 w-full rounded-lg bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    );
  }

  if (isError || data === undefined) {
    return (
      <div className="my-auto flex flex-1 flex-col items-center justify-center rounded-2xl border border-rose-300 bg-rose-100 p-8 text-center shadow-md transition-colors duration-300 ease-in-out dark:border-rose-800 dark:bg-rose-950/60">
        <h2 className="mb-2 text-xl font-bold text-rose-700 dark:text-rose-400">Item Not Found</h2>
        <p className="mb-6 max-w-sm text-xs text-stone-600 dark:text-stone-300">{error?.message ?? "The item ID is missing from the URL."}</p>
        <Button onClick={handleBackToItems} className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
          Back to Inventory
        </Button>
      </div>
    );
  }

  const statusStyles = {
    [ItemStatus.Lost]: "border-rose-300 bg-rose-100 text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-400",
    [ItemStatus.Found]: "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400",
    [ItemStatus.Claimed]: "border-stone-300 bg-stone-200 text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300",
  };
  const canClaimItem = data.status !== ItemStatus.Claimed;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6">
      <Button onClick={handleBackToItems} variant="outline" className="w-fit border-stone-300 bg-stone-200 text-stone-800 hover:bg-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-orange-50 dark:hover:bg-stone-700">
        ← Back to Inventory
      </Button>

      <article className="flex flex-col gap-6 rounded-2xl border border-stone-300 bg-stone-100 p-8 shadow-xl transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono tracking-wider text-teal-600 uppercase dark:text-teal-400">Item # {data.id}</span>
            <h1 className="mt-1 text-2xl font-bold text-stone-800 transition-colors duration-300 ease-in-out dark:text-orange-50">{data.title}</h1>
          </div>
          <span className={`rounded-md border px-3 py-1 text-xs font-semibold tracking-wider transition-colors duration-300 ease-in-out ${statusStyles[data.status]}`}>{data.status}</span>
        </div>

        <div className="flex flex-col gap-4 border-t border-stone-300 pt-4 transition-colors duration-300 ease-in-out dark:border-stone-800">
          <div>
            <h2 className="mb-1 text-xs font-semibold text-stone-500 uppercase dark:text-stone-400">Description</h2>
            <p className="text-sm leading-relaxed text-stone-700 transition-colors duration-300 ease-in-out dark:text-stone-300">{data.description}</p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-stone-300 bg-orange-50/60 px-3 py-1.5 text-xs text-stone-700 transition-colors duration-300 ease-in-out dark:border-stone-800 dark:bg-stone-950/60 dark:text-stone-300">
            <span>📍</span>
            <span>Location: <strong>{data.location}</strong></span>
          </div>
        </div>

        {canClaimItem ? (
          <form onSubmit={handleSubmit(handleClaimSubmit)} className="flex flex-col gap-4 border-t border-stone-300 pt-5 transition-colors duration-300 ease-in-out dark:border-stone-800">
            <div>
              <h2 className="text-base font-semibold text-stone-800 transition-colors duration-300 ease-in-out dark:text-orange-50">Submit a claim request</h2>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">Provide your DLSL email and details that can verify ownership.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="claimerName" className="text-foreground">Full name</Label>
              <Input id="claimerName" placeholder="e.g. Kurt Yermo" aria-invalid={errors.claimerName ? true : undefined} {...register("claimerName")} className="border-stone-300 bg-orange-50/50 text-stone-800 placeholder:text-stone-400 dark:border-stone-800 dark:bg-stone-950/60 dark:text-orange-50" />
              {errors.claimerName && <p className="text-xs text-rose-700 dark:text-rose-400">{errors.claimerName.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="claimerEmail" className="text-foreground">DLSL email</Label>
              <Input id="claimerEmail" type="email" placeholder="name@dlsl.edu.ph" aria-invalid={errors.claimerEmail ? true : undefined} {...register("claimerEmail")} className="border-stone-300 bg-orange-50/50 text-stone-800 placeholder:text-stone-400 dark:border-stone-800 dark:bg-stone-950/60 dark:text-orange-50" />
              {errors.claimerEmail && <p className="text-xs text-rose-700 dark:text-rose-400">{errors.claimerEmail.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ownershipDetails" className="text-foreground">Ownership details</Label>
              <Input id="ownershipDetails" placeholder="Describe a unique detail that identifies the item." aria-invalid={errors.ownershipDetails ? true : undefined} {...register("ownershipDetails")} className="border-stone-300 bg-orange-50/50 text-stone-800 placeholder:text-stone-400 dark:border-stone-800 dark:bg-stone-950/60 dark:text-orange-50" />
              {errors.ownershipDetails && <p className="text-xs text-rose-700 dark:text-rose-400">{errors.ownershipDetails.message}</p>}
            </div>

            {claimMutation.isError && <p className="rounded-lg border border-rose-300 bg-rose-100 p-3 text-xs text-rose-700 transition-colors duration-300 ease-in-out dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-400">{claimMutation.error.message}</p>}

            <Button type="submit" disabled={claimMutation.isPending} className="w-full bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
              {claimMutation.isPending ? "Saving Claim..." : "Submit Claim Request"}
            </Button>
          </form>
        ) : (
          <p className="rounded-lg border border-stone-300 bg-stone-200 p-3 text-center text-xs font-semibold text-stone-700 transition-colors duration-300 ease-in-out dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">This item has already been claimed.</p>
        )}
      </article>
    </div>
  );
}

export default ItemDetailsPage;
