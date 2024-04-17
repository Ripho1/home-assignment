import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import { NewPost, PostData } from "../../types";
import "./styles.css";

type PostEditorProps = {
  isOpened: boolean,
  close: () => void,
  submit: (data: NewPost) => Promise<boolean>,
  post?: PostData,
};

/**
 * Used both for post creation and post update
 */
export const PostEditor: React.FC<PostEditorProps> = ({ close, isOpened, submit, post }) => {
  const [content, setContent] = useState<string>(post?.content || "");
  const [imageUrl, setImageUrl] = useState<string>(post?.imageUrl || "");

  const reset = () => {
    setContent(post?.content || "");
    setImageUrl(post?.imageUrl || "");
  };

  const onSubmit = async () => {
    const result = await submit({ content, imageUrl, id: post?.id });

    if (result) {
      close();
      reset();
    }
  };

  const onCancel = () => {
    close();
    reset();
  };

  return (
    <Dialog open={isOpened} onClose={onCancel}>
      <DialogTitle>New Post</DialogTitle>
      <DialogContent className="post-editor-content">
        <DialogContentText>
          Please note that both fields are optional.
        </DialogContentText>
        <TextField
          autoFocus
          label="Post content"
          variant="standard"
          value={content}
          multiline={true}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          label="Image url"
          variant="standard"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSubmit()}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};