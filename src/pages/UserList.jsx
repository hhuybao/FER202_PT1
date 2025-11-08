import { Container, Card, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationHeader";
import UserFilter from "../components/UserFilter";
import UserTable from "../components/UserTable";
import { getUsers } from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all",
    sortBy: "id"
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = [...users];

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (user) =>
          user.username.toLowerCase().includes(searchLower) ||
          user.fullName.toLowerCase().includes(searchLower)
      );
    }

    // Filter by role
    if (filters.role !== "all") {
      result = result.filter((user) => user.role === filters.role);
    }

    // Filter by status
    if (filters.status !== "all") {
      result = result.filter((user) => user.status === filters.status);
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });

    setFilteredUsers(result);
  }, [filters, users]);

  const handleUserUpdate = () => {
    fetchUsers();
  };

  return (
    <>
      <NavigationHeader />
      <Container>
        <h2 className="mb-4">User Management</h2>
        <UserFilter filters={filters} setFilters={setFilters} />
        
        <Card className="shadow-sm">
          <Card.Body>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <UserTable users={filteredUsers} onUserUpdate={handleUserUpdate} />
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserList;
