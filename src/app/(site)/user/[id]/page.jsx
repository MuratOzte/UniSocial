const Page = async ({ params }) => {
    const slug = await params.id;
    return <div>{slug}</div>;
};

export default Page;
