import { EditOutlined, MailOutlined, GlobalOutlined, PhoneOutlined, DeleteOutlined, HeartFilled } from '@ant-design/icons';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import Axios from "axios";

const { Meta } = Card;

const CardList = () => {
  const [user, setUser] = useState([]);
  const [modelData, setModelData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  // jhkhjk

  //kjhkjh

  //jhgjgjh

  const getUser = async () => {
    try {
      const response = await Axios.get("https://ankit-assignment-03-6.onrender.com/read");
      const usersWithLikeState = response.data.users.map(user => ({ ...user, liked: false }));
      setUser(usersWithLikeState);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const updateUser = async (id) => {
    try {
      await Axios.put(`http://localhost:3001/update/${id}`, modelData);
      getUser(); // Refresh user list
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/delete/${id}`);
      getUser(); // Refresh user list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const onChangeHandler = (e) => {
    setModelData({
      ...modelData,
      [e.target.name]: e.target.value,
    });
  };

  const onClickHandler = () => {
    updateUser(modelData.id);
  };

  const onEditClick = (items) => {
    setModelData({
      id: items._id,
      name: items.name,
      email: items.email,
      phone: items.phone,
      website: items.website,
    });
    console.log("Editing User:", items);
  };

  const onDeleteClick = (id) => {
    deleteUser(id);
  };

  const toggleLike = (id) => {
    setUser(prevUsers =>
      prevUsers.map(user =>
        user._id === id ? { ...user, liked: !user.liked } : user
      )
    );
  };

  return (
    <>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {user.map((items) => (
          <Card
            key={items._id}
            style={{
              width: 350,
              margin: 10,
            }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <HeartFilled
                key="heart"
                style={{ color: items.liked ? 'red' : 'grey' }}
                onClick={() => toggleLike(items._id)}
              />,
              <EditOutlined
                key="edit"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => onEditClick(items)}
              />,
              <DeleteOutlined key="delete" onClick={() => onDeleteClick(items._id)} />,
            ]}
          >
            <Meta title={items.name} />
            <div style={{ display: "flex", flexDirection: 'column', fontSize: 16, marginBottom: 0 }}>
              <p><MailOutlined style={{ margin: 15 }} />{items.email}</p>
              <p><PhoneOutlined style={{ margin: 15 }} />{items.phone}</p>
              <p><GlobalOutlined style={{ margin: 15 }} />{items.website}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 d-flex gap-2">
                  <label htmlFor="name" className="col-form-label">Name:</label>
                  <input type="text" className="form-control" id="recipient-name" name='name' value={modelData.name} onChange={onChangeHandler} />
                </div>
                <div className="mb-3 d-flex gap-2">
                  <label htmlFor="email" className="col-form-label">Email:</label>
                  <input type="email" className="form-control" id="recipient-email" name='email' value={modelData.email} onChange={onChangeHandler} />
                </div>
                <div className="mb-3 d-flex gap-2">
                  <label htmlFor="phone" className="col-form-label">Phone:</label>
                  <input type="number" className="form-control" id="recipient-phone" name='phone' value={modelData.phone} onChange={onChangeHandler} />
                </div>
                <div className="mb-3 d-flex gap-2">
                  <label htmlFor="website" className="col-form-label">Website:</label>
                  <input type="link" className="form-control" id="recipient-website" name='website' value={modelData.website} onChange={onChangeHandler} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={onClickHandler}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardList;
