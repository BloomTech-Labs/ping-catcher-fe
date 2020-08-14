// this is just to show members of the channel

import React, { useState, useEffect } from "react";
import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MembersList = ({ slackState, setSlackState }) => {
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;

  const [members, setMembers] = useState([]);
  console.log(members);

  const token = slackState?.authed_user?.access_token;

  useEffect(() => {
    Axios.get(`https://slack.com/api/users.list?token=${token}`)
      .then((res) => setMembers(res.data.members))
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [token]);

  return (
    <div style={{}}>
      <h1>Ping Catcher Team Members</h1>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
          "@media (min-width: 800px)": {
            border: "1px solid white",
          },
        }}
      >
        {members.map((user) => (
          <Card
            className={classes.root}
            variant="outlined"
            key={user.id}
            style={{
              display: "flex",
              flexFlow: "column wrap",
              maxWidth: "25%",
              margin: "1ch",
            }}
          >
            <Typography className={classes.title}>Name: {user.name}</Typography>
            <Typography className={classes.pos} color="textSecondary">
              Team ID: {user.team_id}
            </Typography>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MembersList;