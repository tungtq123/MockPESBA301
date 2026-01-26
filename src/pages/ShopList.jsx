import axios from "axios";
import {
  Table,
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShopList() {
  const [shops, setShops] = useState([]);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [type, setType] = useState("");
  const [typeList, setTypeList] = useState([]);
  const [openTime, setOpenTime] = useState("");
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  /* ================= API ================= */

  // Load mặc định – chỉ gọi khi mới vào trang
  // const fetchShops = async () => {
  //   if (searchName.trim() === '') {
  //     await axios.get(`${url}/search?page=${page}&name=${name}`)
  //     .then(res => {
  //       setShops(res.data);
  //     })
  //   }
  //   if (page !== 0) {
  //     await axios.get(`${url}/search?page=${page}`)
  //     .then(res => {
  //       setShops(res.data);
  //     })
  //   }
  //   if (searchName !== ''){
  //     await axios.get(`${url}/search?name=${searchName}`)
  //     .then(res => {
  //       setShops(res.data);
  //     })
  //   }
  // };

  const fetchShops = async () => {
    const params = { page };
    params.name = '';

    if (searchName.trim() !== "") {
      params.name = searchName.trim();
    }

    const res = await axios.get(`${url}/search`, { params });
    setShops(res.data);
  };

  const fetchTypes = async () => {
    const res = await axios.get(`${url}/types`);
    setTypeList(res.data);
  };

  /* ================= EFFECTS ================= */

  // Lần đầu vào trang
  useEffect(() => {
    fetchShops();
    fetchTypes();
  }, [page, searchName]);

  /* ================= HANDLERS ================= */
  const handleAddNew = async (e) => {
    e.preventDefault();

    const newShop = { name, type, owner, openTime };
    await axios.post(url, newShop);

    // reset form
    setName("");
    setOwner("");
    setType("");
    setOpenTime("");

    // reload list
    fetchShops();
  };

  const handleDelete = async (shop) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${shop.name}"?`,
    );
    if (!confirmed) return;

    await axios.delete(`${url}/${shop.id}`);
    fetchShops();
  };

  /* ================= UI ================= */

  return (
    <Container fluid className="p-0">
      <Card
        style={{
          border: "3px solid black",
          borderRadius: 0,
          minHeight: "100vh",
        }}
      >
        <Card.Body style={{ padding: "40px 60px" }}>
          <h4 className="fw-bold mb-5">Book Shop Management</h4>

          {/* ===== FORM ===== */}
          <Form onSubmit={handleAddNew}>
            <Form.Group as={Row} className="mb-4 align-items-center">
              <Form.Label column sm={2} className="text-end">
                Shop name:
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 align-items-center">
              <Form.Label column sm={2} className="text-end">
                Open time:
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  style={{ width: "150px" }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 align-items-center">
              <Form.Label column sm={2} className="text-end">
                Owner:
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4 align-items-center">
              <Form.Label column sm={2} className="text-end">
                Type:
              </Form.Label>
              <Col sm={7}>
                <Form.Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{ width: "150px" }}
                >
                  {typeList.map((t) => (
                    <option key={t.type} value={t.type}>
                      {t.description}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Row className="mb-5">
              <Col sm={{ span: 7, offset: 2 }} className="text-center">
                <Button type="submit" variant="outline-dark">
                  Add New
                </Button>
              </Col>
            </Row>
          </Form>

          {/* ===== SEARCH ===== */}
          <Row className="mb-3">
            <Col sm={6} className="d-flex gap-2">
              <Form.Control
                placeholder="Nhập tên shop để tìm kiếm..."
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Button
                variant="outline-dark"
                // onClick={(e) => setSearchName(e.target.value)}
              >
                Search
              </Button>
            </Col>
          </Row>

          {/* ===== PAGINATION ===== */}
          <Row className="mb-3">
            <Col className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-dark"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
              >
                Trước
              </Button>
              <Button variant="outline-dark" onClick={() => setPage(page + 1)}>
                Sau
              </Button>
            </Col>
          </Row>

          {/* ===== TABLE ===== */}
          <Table bordered style={{ border: "2px solid black" }}>
            <thead style={{ backgroundColor: "#d9e8f5" }}>
              <tr>
                <th>#</th>
                <th>Shop Name</th>
                <th>Type</th>
                <th>Owner</th>
                <th>Open time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop, index) => (
                <tr key={shop.id}>
                  <td>{String(index + 1).padStart(2, "0")}</td>
                  <td>{shop.name}</td>
                  <td>{shop.type}</td>
                  <td>{shop.owner}</td>
                  <td>{shop.openTime}</td>
                  <td>
                    <Button variant="link" onClick={() => handleDelete(shop)}>
                      Delete
                    </Button>
                    |
                    <Button
                      variant="link"
                      onClick={() =>
                        navigate(`/shops/${shop.id}`, { state: shop })
                      }
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
