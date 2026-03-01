"use client";

type DeleteDatasetAction = (formData: FormData) => Promise<void>;

export default function DeleteDatasetButton({
  datasetId,
  action,
}: {
  datasetId: string;
  action: DeleteDatasetAction;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this dataset? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="datasetId" value={datasetId} />
      <button
        type="submit"
        className="text-sm rounded-md border border-red-300 px-3 py-1 text-red-700 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}

