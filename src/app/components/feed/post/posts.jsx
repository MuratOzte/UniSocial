import Post from "./post";

const posts = [
    {
        name: 'Surat Turat',
        role: 'Karadeniz Teknik Üniversitesinde Profesör',
        avatar: 'https://via.placeholder.com/40',
        time: '2 hours ago',
        text: "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
        image: 'https://via.placeholder.com/600x400',
        likes: 56,
        comments: 12,
        shares: 3,
    },
    {
        name: 'Surat Turat',
        role: 'Karadeniz Teknik Üniversitesinde Profesör',
        avatar: 'https://via.placeholder.com/40',
        time: '2 hours ago',
        text: "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
        image: 'https://via.placeholder.com/600x400',
        likes: 56,
        comments: 12,
        shares: 3,
    },
]

const Posts = () => {
    return posts.map((post) => (
        <Post key={post.name} post={post} />
    ))

}
 
export default Posts;