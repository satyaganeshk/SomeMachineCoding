import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
  }>({
    open: false,
    message: "",
    severity: "info"
  });

  const showSnackbar = (message: string, severity: SnackbarSeverity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const hideSnackbar = () => {
    setSnackbar((current) => ({ ...current, open: false }));
  };

// This hook is to easily access the snackbar by import this component and 
// call the showSnackbar function with the message and severity you want to display. 
// The snackbar will automatically hide after 2 seconds or when the user clicks the close button.
// Example usage:
// const { showSnackbar } = useSnackbar();
// showSnackbar("This is a success message!", "success");
  const snackbarElement = (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={hideSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, snackbarElement };
};
