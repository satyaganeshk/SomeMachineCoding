import { useEffect, useMemo, useState } from "react";
import type { User } from "../models/dashboard";
import { Table, TableBody } from "@mui/material";
import {TableContainer, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";

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
    const [users, setUsers] = useState<User[]>([]);
    const [order, setOrder] = useState<SortOrder>("asc");
    const [orderBy, setOrderBy] = useState<SortableUserKey>("id");

useEffect(() => {
    const getData = async () => {
        try {
            const response = await fetch("https://dummyjson.com/users");
            const data = await response.json();
            const usersData = data.users.map((user: User) => ({
                ...user
            }));
            setUsers(usersData);
            console.log("Fetched data:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    getData();
}, []);

const handleSort = (column: SortableUserKey) => {
    const isAscending = orderBy === column && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(column);
};

const sortedUsers = useMemo(() => {
    return [...users].sort((firstUser, secondUser) => {
        const firstValue = firstUser[orderBy];
        const secondValue = secondUser[orderBy];
        const comparison = typeof firstValue === "number" && typeof secondValue === "number"
            ? firstValue - secondValue
            : String(firstValue).localeCompare(String(secondValue));

        return order === "asc" ? comparison : -comparison;
    });
}, [users, order, orderBy]);

return (
    <div>
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard!</p>
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
                        <TableRow key={user.id}>
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
        </TableContainer>
    </div>
);
}

export default Dashboard;
