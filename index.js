const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const app = express();
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
// 群组列表
let groupList = [];
// 在线人数
let people = 0;
app.get("/create", (req, res) => {
  console.log(req.session.userName);
  const { userName, avatar } = req.query;
  req.session.userName = userName;
  req.session.avatar = avatar;
  req.session.save();
  res.send({
    code: 200,
    msg: "进入成功",
  });
});
const server = app.listen(8020);
const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.emit("success", socket.id)
  people++;
  socket.on("addRoom", (room) => {
    const { name, id } = room;
    groupList.push({
      name,
      room: io.connect(id),
    });
    scoket.join(id);
  });
  socket.on("requestJoinRoom", function (data) {
    let rooms = io.sockets.adapter.rooms;
    console.log(rooms);
  });
  socket.on("test", function (data) {
    console.log(1);
  });
});
app.listen("3000", () => {
  console.log("Server listening on port 3000");
});
