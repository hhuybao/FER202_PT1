import { Table, Button, Badge, Image } from "react-bootstrap";
import { useState } from "react";
import UserDetailsModal from "./UserDetailsModal";
import ConfirmModal from "./ConfirmModal";
import { updateUser } from "../services/api";

const UserTable = ({ users, onUserUpdate }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState("");

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleToggleStatus = (user) => {
    setSelectedUser(user);
    setActionType(user.status === "active" ? "ban" : "unban");
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    try {
      const newStatus = selectedUser.status === "active" ? "locked" : "active";
      await updateUser(selectedUser.id, { status: newStatus });
      setShowConfirmModal(false);
      setSelectedUser(null);
      onUserUpdate();
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Failed to update user status");
    }
  };

  const handleCloseConfirm = () => {
    setShowConfirmModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Image 
                    src={user.avatar} 
                    roundedCircle 
                    width={40} 
                    height={40}
                    alt={user.username}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>
                  <Badge bg={user.role === "admin" ? "primary" : "secondary"}>
                    {user.role}
                  </Badge>
                </td>
                <td>
                  <Badge bg={user.status === "active" ? "success" : "danger"}>
                    {user.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetails(user)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant={user.status === "active" ? "danger" : "success"}
                    size="sm"
                    onClick={() => handleToggleStatus(user)}
                  >
                    {user.status === "active" ? "Ban Account" : "Unban Account"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <UserDetailsModal
        show={showDetailsModal}
        handleClose={() => setShowDetailsModal(false)}
        user={selectedUser}
      />

      <ConfirmModal
        show={showConfirmModal}
        handleClose={handleCloseConfirm}
        handleConfirm={handleConfirmAction}
        title={actionType === "ban" ? "Ban Account" : "Unban Account"}
        message={
          actionType === "ban"
            ? `Are you sure you want to ban ${selectedUser?.username}?`
            : `Are you sure you want to unban ${selectedUser?.username}?`
        }
      />
    </>
  );
};

export default UserTable;
