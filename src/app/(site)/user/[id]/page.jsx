'use client';

import { use } from "react";
import { useProfileHeader } from "@/hooks/useProfile";

const Page = ({ params }) => {
    const { id: userId } = use(params);

    const { data, isLoading, error } = useProfileHeader(userId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>User ID: {userId}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Page;
