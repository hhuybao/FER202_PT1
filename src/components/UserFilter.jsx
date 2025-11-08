import { Form, Row, Col, Card } from "react-bootstrap";

const UserFilter = ({ filters, setFilters }) => {
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleRoleChange = (e) => {
    setFilters({ ...filters, role: e.target.value });
  };

  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value });
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by username or full name"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={filters.role} onChange={handleRoleChange}>
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={filters.status} onChange={handleStatusChange}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="locked">Locked</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Sort By</Form.Label>
              <Form.Select value={filters.sortBy} onChange={handleSortChange}>
                <option value="id">ID</option>
                <option value="username">Username</option>
                <option value="fullName">Full Name</option>
                <option value="role">Role</option>
                <option value="status">Status</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserFilter;
