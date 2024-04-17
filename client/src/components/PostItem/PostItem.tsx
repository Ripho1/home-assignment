import { useState } from "react";
import { Card, CardHeader, CardMedia, CardContent, Typography, CardActions, IconButton, Badge } from "@mui/material";
import { Edit, Delete, ThumbUpAlt } from "@mui/icons-material";
import { UserAvatar } from "../UserAvatar";
import { PostData, UserData } from "../../types";
import { formatDate } from "../../util";
import { ConfirmationDialog } from "../ConfirmationDialog";
import { PostEditor } from "../PostEditor";
import "./styles.css";

type PostItemProps = {
  post: PostData,
  user: UserData,
  canModify?: boolean,
  confirmDelete: () => Promise<boolean>,
  updatePost: (post: PostData) => Promise<boolean>,
  likePost: () => Promise<boolean>
};

export const PostItem: React.FC<PostItemProps> = ({ user, post, canModify = false, confirmDelete, updatePost, likePost }) => {
  const [isConfirmataionOpen, setIsConfirmataionOpen] = useState(false);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);

  const openEditor = () => setIsPostEditorOpen(true);
  const closeEditor = () => setIsPostEditorOpen(false);
  const openConfirmation = () => setIsConfirmataionOpen(true);
  const closeConfirmation = () => setIsConfirmataionOpen(false);

  return (
    <>
      <Card className="post-item-container" sx={{ boxShadow: "none" }}>
        <CardHeader avatar={<UserAvatar user={user} />} title={user.name} subheader={formatDate(post.date)} />
        <CardMedia className="post-image" component="img" src={post.imageUrl} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {canModify &&
            <>
              <IconButton onClick={openEditor}>
                <Edit />
              </IconButton>
              <IconButton onClick={openConfirmation}>
                <Delete />
              </IconButton>
            </>
          }
          <IconButton sx={{ marginLeft: "auto" }} onClick={likePost}>
            <Badge badgeContent={post.likes || "0"} color="primary" className="post-like-icon-badge">
              <ThumbUpAlt color="primary" />
            </Badge>
          </IconButton>
        </CardActions>
      </Card>

      <ConfirmationDialog close={closeConfirmation} isOpened={isConfirmataionOpen} action={confirmDelete} />
      <PostEditor isOpened={isPostEditorOpen} close={closeEditor} submit={(post) => updatePost(post as PostData)} post={post} />
    </>
  );
};