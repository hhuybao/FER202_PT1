import { Modal, Button, Badge, Image } from "react-bootstrap";

const UserDetailsModal = ({ show, handleClose, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-3">
          <Image 
            src={user.avatar} 
            roundedCircle 
            width={100} 
            height={100}
            alt={user.fullName}
          />
        </div>
        <div className="mb-2">
          <strong>ID:</strong> {user.id}
        </div>
        <div className="mb-2">
          <strong>Username:</strong> {user.username}
        </div>
        <div className="mb-2">
          <strong>Full Name:</strong> {user.fullName}
        </div>
        <div className="mb-2">
          <strong>Role:</strong>{" "}
          <Badge bg={user.role === "admin" ? "primary" : "secondary"}>
            {user.role}
          </Badge>
        </div>
        <div className="mb-2">
          <strong>Status:</strong>{" "}
          <Badge bg={user.status === "active" ? "success" : "danger"}>
            {user.status}
          </Badge>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
