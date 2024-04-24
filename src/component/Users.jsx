import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const Users = () => {
  const loadedUser = useLoaderData();
  const [users, setUsers] = useState(loadedUser);

  const handleDalete = _id =>{
    console.log(('delete'),_id);
    fetch(`http://localhost:5000/users/${_id}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.deletedCount>0) {
        alert("delete successfully");
        const remaining = users.filter(user => user._id !== _id);
        setUsers(remaining);
      }
    })
  }
  return (
    <div>
      <h1>{users.length}</h1>
      <div>
        {
          users.map(user => <p key={user._id}>{user.name} : {user.email} : {user._id} <Link to={`/update/${user._id}`}><button>Update</button></Link> <button onClick={()=> handleDalete(user._id)}>delete</button></p>)
        }
      </div>
    </div>
  );
};

export default Users;