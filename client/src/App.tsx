import { useEffect, useMemo, useState } from "react";
import { Header, PostEditor, PostItem } from "./components";
import { NewPost, PostData, UserData } from "./types";
import { createPost, deletePost, getPosts, getUsers, likePost, updatePost } from "./accessServer";
import { chooseRandomUser } from "./util";

// This compoenent is large since it is handling the entire logic + state management of the project because there is no proper state manager
function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<UserData>();

  const openEditor = () => setIsPostEditorOpen(true);
  const closeEditor = () => setIsPostEditorOpen(false);

  // Fetching the data
  useEffect(() => {
    getUsers().then(users => {
      setUsers(users);
      setActiveUser(chooseRandomUser(users));
    });

    getPosts().then(setPosts);
  }, []);

  // Storing the users in an id-based dictionary for the posts-wrapper
  const usersById = useMemo(() => {
    const data: { [key: number]: UserData } = {};

    users.forEach(user => data[user.id] = user);

    return data;
  }, [users]);

  const changeUser = () => {
    setActiveUser(chooseRandomUser(users));
  };

  // New post creation
  const submitNewPost = async (newPost: NewPost) => {
    newPost.date = (new Date()).toISOString();
    newPost.userId = activeUser?.id;

    const saved = await createPost(newPost);

    // No error handling
    if (saved === undefined) {
      return false;
    }

    setPosts([saved, ...posts]);

    return true;
  };

  // Post deletion
  const confirmDelete = async (postId: number) => {
    const response = await deletePost(postId);

    // No error handling
    if (!response) {
      return false;
    }

    const indexToRemove = posts.findIndex(post => post.id === postId);

    if (indexToRemove !== -1) {
      posts.splice(indexToRemove, 1);
      setPosts([...posts]);
    }

    return true;
  }

  // Post update
  const updateExistingPost = async (updatedPost: PostData) => {
    const response = await updatePost(updatedPost);

    // No error handling
    if (!response) {
      return false;
    }

    const postToUpdate = posts.find(post => post.id === updatedPost.id);

    if (postToUpdate !== undefined) {
      Object.assign(postToUpdate, updatedPost);
      setPosts([...posts]);
    }

    return true;
  }

  // Post like
  const likeExistingPost = async (postId: number) => {
    const response = await likePost(postId);

    // No error handling
    if (!response) {
      return false;
    }

    const postToUpdate = posts.find(post => post.id === postId);

    if (postToUpdate !== undefined) {
      postToUpdate.likes = 1 + (postToUpdate.likes || 0);
      setPosts([...posts]);
    }

    return true;
  }

  return (
    <>
      <Header activeUser={activeUser} changeUser={changeUser} openPostEditor={openEditor} />
      <div className="posts-wrapper">
        {posts.map(post => {
          const postsUser = usersById[post.userId];

          return (
            postsUser &&
            <PostItem
              key={post.id}
              user={postsUser}
              post={post}
              canModify={activeUser?.id === postsUser.id}
              confirmDelete={() => confirmDelete(post.id)}
              updatePost={updateExistingPost}
              likePost={() => likeExistingPost(post.id)}
            />
          );
        })}
      </div>
      <PostEditor isOpened={isPostEditorOpen} close={closeEditor} submit={submitNewPost} />
    </>
  );
}

export default App;
