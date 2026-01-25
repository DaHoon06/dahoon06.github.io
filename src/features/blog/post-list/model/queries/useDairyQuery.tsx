import { getDairy } from "@entities/notion/libs/getDairy";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { useQuery } from "@tanstack/react-query";

const useDairyQuery = () => {
    const { data } = useQuery({
        queryKey: notionQueryKeys.dairy(),
        queryFn: async () => await getDairy(),
        initialData: [],
        enabled: false,
    });

    if (!data) throw new Error("Dairy data is not found");

    return data;
};

export default useDairyQuery;
