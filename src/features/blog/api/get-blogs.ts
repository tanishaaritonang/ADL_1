import { QueryConfig } from '@/config/query-config';
import { api } from '@/core/api/client';
import { Meta } from '@/shared/types/api';
import { BlogPost } from '@/shared/types/blog';
import { useQuery, queryOptions } from '@tanstack/react-query';

export const getBlogs = (
    { page }: { page?: number } = { page: 1 },
): Promise<{
    data: BlogPost[];
    meta: Meta;
}> => {
    return api.get(`/blog`, {
        params: {
            page,
        },
    });
};

export const getBlogQueryOptions = ({
    page = 1,
}: { page?: number } = {}) => {
    return queryOptions({
        queryKey: ['blogs', { page }],
        queryFn: () => getBlogs({ page }),
    });
};

type UseBlogOptions = {
    page?: number;
    queryConfig?: QueryConfig<typeof getBlogQueryOptions>;
};

export const useBlogs = ({
    page,
    queryConfig,
}: UseBlogOptions) => {
    return useQuery({
        ...getBlogQueryOptions({ page }),
        ...queryConfig,
    });
};
