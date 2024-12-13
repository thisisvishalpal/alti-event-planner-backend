const users = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "alicej",
    profilePicture: "https://via.placeholder.com/50",
    mutualConnections: 10,
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bobsmith",
    profilePicture: "https://via.placeholder.com/50",
    mutualConnections: 5,
  },
  {
    id: 3,
    name: "Rahul Singh Baghel",
    username: "rahulsinghbaghel",
    profilePicture: "https://via.placeholder.com/50",
    mutualConnections: 99,
  },
  {
    id: 4,
    name: "Sagar Sahu",
    username: "sagarsahu",
    profilePicture: "https://via.placeholder.com/50",
    mutualConnections: 33,
  },
  {
    id: 5,
    name: "Veena Pal",
    username: "veenapal",
    profilePicture: "https://via.placeholder.com/50",
    mutualConnections: 44,
  },
  {
    id: 6,
    name: "Prerna Srivastava",
    username: "perusrivastava",
    profilePicture: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
    mutualConnections: 0,
  },
];

exports.search = (req, res) => {
  const { query } = req.query;

  const results = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
  );

  res.json(results);
};
