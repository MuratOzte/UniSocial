import { useProfilePosts } from "@/hooks/useProfilePosts";
import Loading from "../common/Loading";
import Post from "./post";
import Panda from "../common/Panda";

const ProfilePosts = ({ error, isValidating, posts, refreshPosts }) => {
  return (
    <div>
      {error && <div className="error">Failed to fetch posts</div>}
      {posts.length === 0 && !isValidating && <Panda />}
      {!posts && <Loading />}
      {posts.map((post) => (
        <Post key={post.id} post={post} refreshPosts={refreshPosts} />
      ))}
    </div>
  );
};

export default ProfilePosts;
