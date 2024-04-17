import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

type ConfirmationDialog = {
  action: () => Promise<boolean>,
  isOpened: boolean,
  close: () => void
};

export const ConfirmationDialog: React.FC<ConfirmationDialog> = ({ action, isOpened, close }) => {
  const confirm = async () => {
    const resposne = await action();

    if (resposne) {
      close();
    }
  };

  return (
    <Dialog open={isOpened} onClose={close}>
      <DialogTitle>
        Are you sure you want to delete this post?
      </DialogTitle>
      <DialogActions>
        <Button onClick={close}>No</Button>
        <Button onClick={confirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};