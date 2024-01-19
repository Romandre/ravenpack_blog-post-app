import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type PostContextProps = {
  posts: Post[];
  activeUser: string;
  selectUser: (value: string) => void;
  comments: Comment[];
};

export const DataContext = createContext({} as PostContextProps);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeUser, setActiveUser] = useState<string>("");

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Something went wrong during posts fetching. ", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Something went wrong during posts fetching. ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  const selectUser = useCallback(
    (value: string) => {
      setActiveUser(value);
    },
    [setActiveUser]
  );

  const memoizedValue = useMemo(
    () => ({
      posts,
      activeUser,
      selectUser,
      comments,
    }),
    [posts, activeUser, selectUser, comments]
  );

  return (
    <DataContext.Provider value={memoizedValue}>
      {children}
    </DataContext.Provider>
  );
};
