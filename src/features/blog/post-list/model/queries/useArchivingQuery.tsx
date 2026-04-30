import { getArchiving } from "@entities/notion/libs/getArchiving";
import { getRecordMap } from "@entities/notion/libs/getRecordMap";
import { notionQueryKeys } from "@entities/notion/model/queries/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useArchivingQuery = () => {
    const router = useRouter();
    const { slug } = router.query;

    const { data } = useQuery<any>({
        queryKey: notionQueryKeys.archiving(`${slug}`),
        queryFn: async () => {
            const archivings = await getArchiving();
            const archiving = archivings.find((t) => t.slug === slug);
            const recordMap = await getRecordMap(archiving.id);

            return {
                ...archiving,
                recordMap,
            };
        },
        enabled: !!slug,
    });

    if (!data) throw new Error("Archiving data is not found");

    return data;
};

export default useArchivingQuery;
