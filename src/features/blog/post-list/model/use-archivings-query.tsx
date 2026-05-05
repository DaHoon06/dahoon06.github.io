import { getArchiving, notionQueryKeys } from "@entities/notion";
import { useQuery } from "@tanstack/react-query";

const useArchivingsQuery = () => {
    const { data } = useQuery<any>({
        queryKey: notionQueryKeys.archivings(),
        queryFn: async () => await getArchiving(),
        initialData: [],
        enabled: false,
    });

    if (!data) throw new Error("Archiving data is not found");

    return data;
};

export default useArchivingsQuery;
