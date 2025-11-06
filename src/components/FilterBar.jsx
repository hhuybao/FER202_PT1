import { useEffect, useState } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import { getPayments } from "../services/api";
import { usePayment } from "../contexts/PaymentContext";

const initFormState = {
  txt_search: "",
  semester: undefined,
  course: undefined,
  sortby: "course_asc",
};

const FilterBar = ({ semesters, courses }) => {
  const [form, setForm] = useState(initFormState);
  const [debouncedSearch, setDebouncedSearch] = useState(form.txt_search);
  const { getListPayment } = usePayment();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(form.txt_search);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [form.txt_search]);

  useEffect(() => {
    let { sortby, txt_search: debouncedSearch, semester, course } = form;
    getListPayment(sortby, debouncedSearch, semester, course);
  }, [debouncedSearch, form.semester, form.course, form.sortby]);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={(e) => e.preventDefault()}>
          <Row className="g-3">
            {/* Search by semester or course name  */}
            <Col xs={12} lg={4}>
              <Form.Group controlId="txt_search">
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  name="txt_search"
                  value={form.txt_search}
                  onChange={handleChange}
                  placeholder="Search by semester or course name"
                />
              </Form.Group>
            </Col>

            {/* Filter by Semester  */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group controlId="semester">
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  value={form.semester}
                  name="semester"
                >
                  <option value="">All Semesters</option>
                  {semesters &&
                    semesters.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Filter by Course name */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group controlId="course">
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  value={form.course}
                  name="course"
                >
                  <option value="">All Courses</option>
                  {courses &&
                    courses.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Sorting */}
            <Col xs={12} md={4} lg={4}>
              <Form.Group controlId="sortby">
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  value={form.sortby}
                  name="sortby"
                >
                  <option value="course_asc">Course name asceding</option>
                  <option value="course_desc">Course name descending</option>
                  <option value="date_asc">Date ascending</option>
                  <option value="date_desc">Date descending</option>
                  <option value="amount_asc">Amount ascending</option>
                  <option value="amount_desc">Amount descending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
