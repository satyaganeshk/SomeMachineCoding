import { useEffect, useMemo, useState } from "react";
import type { User } from "../models/dashboard";
import { Table, TableBody } from "@mui/material";
import {TableContainer, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import { DialogActions, Dialog, DialogTitle, Button,TextField} from "@mui/material";
import {
  Avatar,
  Box,
  Chip,
  DialogContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
    Tooltip,
} from "@mui/material";

import AppHeader from '../layout/Header'

type SortOrder = "asc" | "desc";
type SortableUserKey = "id" | "firstName" | "lastName" | "email" | "bloodGroup" | "age" | "height" | "weight" | "eyeColor";

const columns: { id: SortableUserKey; label: string }[] = [
    { id: "id", label: "ID" },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "bloodGroup", label: "Blood Group" },
    { id: "age", label: "Age" },
    { id: "height", label: "Height" },
    { id: "weight", label: "Weight" },
    { id: "eyeColor", label: "Eye Color" },
];

const Dashboard = () => {
    const [order, setOrder] = useState<SortOrder>("asc");
    const [orderBy, setOrderBy] = useState<SortableUserKey>("id");
    const [loading, setLoading] = useState<boolean>(true);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [originalUsers, setOriginalUsers] = useState<User[]>([]); // Store the original users for filtering
    const [filterValue, setFilterValue] = useState<string>(""); // Store the filter value
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Store the filtered users
    const [page, setPage] = useState<number>(1); // Store the current page number
    const [totalPages, setTotalPages] = useState<number>(1); // Store the total number of pages

    const [currentRole, setCurrentRole] = useState(
        () => localStorage.getItem("currentRole") ?? ""
    );

useEffect(() => {
    const getData = async () => {
        setLoading(true);
        const skip  = (page-1) * 10
        try {
            const response = await fetch(`https://dummyjson.com/users?limit=10&skip=${skip}`);// limit=5&skip=10&select=firstName,age we can use this to limit the data but we want all the data we gonna use the Pagination
            const data = await response.json();
            setTotalPages(Math.ceil(data.total)); // Calculate total pages based on total users and limit
            const usersData = data.users.map((user: User) => ({
                ...user
            }));
            setOriginalUsers(usersData); // Store the original users for filtering
            setFilteredUsers(usersData); // Initialize filtered users with all users
            console.log("Fetched data:", data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }
    getData();


}, [page]); // Add page as a dependency to re-fetch data when the page changes

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
    
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            setPage(currentPage - 1); // Update the page state
        }
    };
    
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            setPage(currentPage + 1);
            console.log("Next page:", currentPage + 1); // Log the next page number
        }
    };

    // when we change these we need call the api again to get the new data and we need to use the useEffect to call the api again when the page changes
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
            }}
        >
            <Button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </Button>
            <Typography sx={{ mx: 2 }}>
                Page {currentPage} of {totalPages}
            </Typography>
            <Button onClick={handleNext} >
                Next
            </Button>
        </Box>
    );
}

const handleSort = (column: SortableUserKey) => {
    const isAscending = orderBy === column && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(column);
};

// Filter By all columns and if the filter value is empty then show all users and use the original users for filtering
const handleFilter = (filterValue: string) => {
    setFilterValue(filterValue);
    if (filterValue.trim() === "") {
        setFilteredUsers(originalUsers); // Show all users if filter value is empty
    } else {
        const filtered = originalUsers.filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(filterValue.toLowerCase())
            )
        );
        setFilteredUsers(filtered);
    }
}

const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((firstUser, secondUser) => {
        const firstValue = firstUser[orderBy];
        const secondValue = secondUser[orderBy];
        const comparison = typeof firstValue === "number" && typeof secondValue === "number"
            ? firstValue - secondValue
            : String(firstValue).localeCompare(String(secondValue));

        return order === "asc" ? comparison : -comparison;
    });
// Re-sort whenever the filter changes the displayed users. Without this
// dependency, useMemo keeps the initial (empty) result, so neither searching
// nor clearing the filter updates the table.
}, [filteredUsers, order, orderBy]);

const handleOpenDialog = (user: User) => {
    console.log(currentRole)
    if (currentRole === "admin"){
    setSelectedUser(user);
    setIsDialogOpen(true);
    }else{
        return null;
    }
};

const handleCloseDialog = () => {
    setIsDialogOpen(false);
};

const ellipsis = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + "...";
}

return (
    <div>
        <AppHeader
            pageTitle="Dashboard"
            currentRole={currentRole}
            onCurrentRoleChange={setCurrentRole}
        />
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Box sx={{ width: "90%", maxWidth: 1200, bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 3 }}>
                {loading ? (
                    <Typography variant="h6" align="center">
                        Loading...
                    </Typography>
                ) : (
                <>
                {/* filter  if empty then show all users */}
                <Box>
                    <TextField
                        label="Filter by First Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={filterValue}
                        onChange={(e) => handleFilter(e.target.value)}
                    />
                </Box>
                <TableContainer sx={{color: "white", backgroundColor: "#ffffff",}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        sortDirection={orderBy === column.id ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : "asc"}
                                            onClick={() => handleSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedUsers.map((user) => (
                                <TableRow key={user.id} onClick={() => handleOpenDialog(user)} style={{ cursor: "pointer" }}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.bloodGroup}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell>{user.height}</TableCell>
                                    <TableCell>{user.weight}</TableCell>
                                    <TableCell>{user.eyeColor}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination
                        currentPage={Math.floor(originalUsers.length / 10) + 1}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                            console.log("Page changed to:", page);
                            // You can implement any additional logic here if needed when the page changes
                        }}
                    />
                </TableContainer>
                </>
                )}
                </Box>
                </Box>
                <Dialog open={isDialogOpen} onClose={handleCloseDialog} style={{ cursor: "pointer" }} maxWidth="md" fullWidth>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogContent dividers>
                        {selectedUser && (
                            <Stack spacing={3}>
                            {/* Header */}
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Avatar
                                src={selectedUser.image}
                                sx={{ width: 100, height: 100 }}
                                />

                                <Box>
                                <Typography variant="h5" fontWeight={700}>
                                    {selectedUser.firstName} {selectedUser.lastName}
                                </Typography>

                                <Typography color="text.secondary">
                                    @{selectedUser.username}
                                </Typography>

                                <Typography color="text.secondary">
                                    {selectedUser.email}
                                </Typography>

                                <Stack direction="row" spacing={1} mt={1}>
                                    <Chip label={selectedUser.role} color="primary" />
                                    <Chip label={selectedUser.bloodGroup} color="error" />
                                    <Chip label={selectedUser.gender} variant="outlined" />
                                </Stack>
                                </Box>
                            </Stack>

                            <Divider />

                            <Grid container spacing={2}>
                                {/* Personal */}
                                <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                    Personal Information
                                    </Typography>

                                    <Typography><b>ID:</b> {selectedUser.id}</Typography>
                                    <Typography><b>Age:</b> {selectedUser.age}</Typography>
                                    <Typography><b>Birth Date:</b> {selectedUser.birthDate}</Typography>
                                    <Typography><b>Phone:</b> {selectedUser.phone}</Typography>
                                    <Typography><b>Eye Color:</b> {selectedUser.eyeColor}</Typography>
                                    <Typography>
                                    <b>Hair:</b> {selectedUser.hair.color} ({selectedUser.hair.type})
                                    </Typography>
                                    <Typography><b>Height:</b> {selectedUser.height} cm</Typography>
                                    <Typography><b>Weight:</b> {selectedUser.weight} kg</Typography>
                                </Paper>
                                </Grid>

                                {/* Address */}
                                <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                    Address
                                    </Typography>

                                    <Typography>{selectedUser.address.address}</Typography>
                                    <Typography>
                                    {selectedUser.address.city}, {selectedUser.address.state}
                                    </Typography>
                                    <Typography>
                                    {selectedUser.address.postalCode}
                                    </Typography>
                                    <Typography>{selectedUser.address.country}</Typography>

                                    <Typography mt={2}>
                                    <b>IP:</b> {selectedUser.ip}
                                    </Typography>
                                </Paper>
                                </Grid>

                                {/* Education */}
                                <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                    Education
                                    </Typography>

                                    <Typography>{selectedUser.university}</Typography>
                                </Paper>
                                </Grid>

                                {/* Company */}
                                <Grid item xs={12} md={6}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                    Company
                                    </Typography>

                                    <Typography>
                                    <b>{selectedUser.company.name}</b>
                                    </Typography>

                                    <Typography>
                                    {selectedUser.company.department}
                                    </Typography>

                                    <Typography>
                                    {selectedUser.company.title}
                                    </Typography>

                                    <Typography mt={2}>
                                    {selectedUser.company.address.address}
                                    </Typography>

                                    <Typography>
                                    {selectedUser.company.address.city},{" "}
                                    {selectedUser.company.address.state}
                                    </Typography>

                                    <Typography>
                                    {selectedUser.company.address.country}
                                    </Typography>
                                </Paper>
                                </Grid>

                                {/* Banking */}
                                <Grid item xs={12}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                    Banking
                                    </Typography>

                                    <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <Typography><b>Card</b></Typography>
                                        <Tooltip title={selectedUser.bank.cardNumber}>
                                            <Typography>{ellipsis(selectedUser.bank.cardNumber, 6)}</Typography>
                                        </Tooltip>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Typography><b>Type</b></Typography>
                                        <Tooltip title={selectedUser.bank.cardType}><Typography>{ellipsis(selectedUser.bank.cardType, 7)}</Typography></Tooltip>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Typography><b>Currency</b></Typography>
                                        <Typography>{selectedUser.bank.currency}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Typography><b>IBAN</b></Typography>
                                        <Tooltip title={selectedUser.bank.iban}><Typography>{ellipsis(selectedUser.bank.iban, 10)}</Typography></Tooltip>
                                    </Grid>
                                    </Grid>
                                </Paper>
                                </Grid>
                            </Grid>
                            </Stack>
                        )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                </Dialog>
    </div>
);
}

export default Dashboard;
