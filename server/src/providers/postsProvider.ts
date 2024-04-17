import posts from "../../db/posts.json";

// Utilized in creation of new posts
let _highestID = Math.max(...posts.map(post => post.id));

/**
 * @param sort Indication whether to sort or not
 * @returns All the posts
 */
export const getPosts = (sort = true) => {
  const result = [...posts];

  if (sort) {
    result.sort((item1, item2) => {
      const date1 = new Date(item1.date);
      const date2 = new Date(item2.date);

      return date2.getTime() - date1.getTime();
    });
  }

  return result;
};

/**
 * Creates and adds a new post to the db
 * @param content Post's content
 * @param date Creation date of the post
 * @param userId The creator of the post
 * @param imageUrl Optional image for the post
 * @returns Newly created post
 */
export const createPost = (content: string, date: string, userId: number, imageUrl: string | undefined) => {
  const newID = ++_highestID;
  const newPost = {
    id: newID,
    content,
    date,
    userId,
    imageUrl,
    likes: 0
  };

  posts.push(newPost);

  return newPost;
};

/**
 * @param postId Post's id to remove
 * @returns Indication whether a matching post was found to remove
 */
export const deletePost = (postId: number) => {
  const indexToRemove = posts.findIndex(post => post.id === postId);

  if (indexToRemove === -1) {
    return false;
  }

  posts.splice(indexToRemove, 1);

  return true;
}

/**
 * Updates an existing post based on the PostId
 * 
 * @param postId Post's id
 * @param content Updated content
 * @param imageUrl Updated image
 * @returns Indication whether a matching post was found to update
 */
export const updatePost = (postId: number, content: string, imageUrl: string | undefined) => {
  const postToUpdate = posts.find(post => post.id === postId);

  if (postToUpdate === undefined) {
    return false;
  }

  postToUpdate.content = content;
  postToUpdate.imageUrl = imageUrl;

  return true;
}

/**
 * Like an existing post - Bonus for User-Based like button not implemented
 * 
 * @param postId Post's id for the post to like
 * @param userId Needed for the future to allow to remove the like
 * @returns Indication whether a post was found to like
 */
export const likePost = (postId: number, userId?: number) => {
  const post = posts.find(post => post.id === postId);

  if (post === undefined) {
    return false;
  }

  if (post.likes) {
    post.likes++;
  } else {
    post.likes = 1;
  }

  return true;
}