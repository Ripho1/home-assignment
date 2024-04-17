import { NewPost, PostData, UserData } from "./types";

const _baseURL = "http://localhost:3000/api";

export const getUsers = async (): Promise<UserData[]> => {
  const result = await _fetch<UserData[]>("users", "GET");

  return result || [];
};

export const getPosts = async (): Promise<PostData[]> => {
  const result = await _fetch<PostData[]>("posts", "GET");

  return result || [];
};

export const createPost = async (data: NewPost): Promise<PostData | undefined> => {
  const newPost = await _fetch<PostData>("posts", "POST", data);

  return newPost;
};

export const deletePost = async (id: number): Promise<boolean | undefined> => {
  const response = await _fetch<boolean>("posts", "DELETE", { id });

  return response;
};

export const updatePost = async (data: PostData): Promise<boolean | undefined> => {
  const response = await _fetch<boolean>("posts", "PUT", data);

  return response;
};

export const likePost = async (id: number): Promise<boolean | undefined> => {
  const response = await _fetch<boolean>("posts/likes", "PUT", { id });

  return response;
};

/**
 * Private wrapper for Fetch
 * 
 * @param url Relative resource url
 * @param method REST method
 * @param body Optional body
 * @returns Result from the server
 */
const _fetch = async <T>(url: string, method: string, body?: any): Promise<T | undefined> => {
  try {
    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    }

    if (method !== "GET") {
      config.body = JSON.stringify(body || "");
    }

    const response = await fetch(`${_baseURL}/${url}`, config);

    if (response.ok) {
      const result = await response.json();

      return result;
    }

    // Error handling - Internal Problem

  } catch (error) { // Error handling - Network Problem
    console.log(error);
  }
};