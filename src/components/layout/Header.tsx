import { Box, Typography } from "@mui/material";
import {Navigate } from "react-router-dom";

interface AppHeaderProps {
  pageTitle: string;
  currentRole: string;
  onCurrentRoleChange: (role: string) => void;
}

interface StoredUser {
  username: string;
  role: string[];
}

const getStoredUser = (): StoredUser | null => {
  const userDetails = localStorage.getItem("userDetails");

  if (!userDetails) {
    return null;
  }

  try {
    return JSON.parse(userDetails) as StoredUser;
  } catch {
    return null;
  }
};

const handlelogout = () =>{
    localStorage.clear();
    return <Navigate to="/login" replace />;

}

const AppHeader = ({
  pageTitle,
  currentRole,
  onCurrentRoleChange,
}: AppHeaderProps) => {
  const user = getStoredUser();
  const username = user?.username ?? "User";
  const availableRoles = user?.role ?? [];
  const handleRoleChange = (role: string) => {
    // This demo stores the selected role locally. In a real app, update it via an API.
    localStorage.setItem("currentRole", role);
    onCurrentRoleChange(role);
  };

  return (
    <header>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        py={2}
      >
        {/* Page information */}
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {pageTitle}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Welcome back, {username}
          </Typography>
        </Box>

        {/* User information */}
        <Box display="flex" alignItems="center" gap={2}>
          <label htmlFor="role">Role:</label>

          <select
            id="role"
            value={currentRole}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <button type="button" onClick={handlelogout}>Logout</button>
        </Box>
      </Box>
    </header>
  );
};

export default AppHeader;
