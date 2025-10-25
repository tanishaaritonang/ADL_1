import { QueryConfig } from '@/config/query-config';
import { api } from '@/core/api/client';
import { BlogPost } from '@/shared/types/blog';
import { useQuery, queryOptions } from '@tanstack/react-query';

export const getBlog = ({
    blogId,
}: {
    blogId: string;
}): Promise<{ data: BlogPost }> => {
    return api.get(`/blog/${blogId}`);
};

export const getBlogQueryOptions = (blogId: string) => {
    return queryOptions({
        queryKey: ['blog', blogId],
        queryFn: () => getBlog({ blogId }),
    });
};

type UseBlogOptions = {
    blogId: string;
    queryConfig?: QueryConfig<typeof getBlogQueryOptions>;
};

export const useBlog = ({
    blogId,
    queryConfig,
}: UseBlogOptions) => {
    const { data } = useQuery({
        ...getBlogQueryOptions(blogId),
        ...queryConfig,
    });
    return useQuery({
        ...getBlogQueryOptions(blogId),
        ...queryConfig,
    });
};
