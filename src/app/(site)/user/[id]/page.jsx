'use client';
import { use } from "react";
import { useProfileHeader } from "@/hooks/useProfile";

const Page = ({ params }) => {
    const { id: slug } = use(params); 

    useProfileHeader();

    return <div>{slug}</div>;
};

export default Page;
