import React from "react";
import { useRouter } from "next/router";
import Firebase from "../../../firebase";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import moment from "moment";

function ViewPost() {
  const { query } = useRouter();
  const id = query.id;

  const db = Firebase.default.firestore();
  let post = {};

  const { data, status, error } = useFirestoreQuery(
    db.collection("CommunityNews").doc(id)
  );

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "error") {
    return `Error: ${error.message}`;
  }

  if (data) {
    post = {
      id: data.id,
      title: data.title,
      description: data.description,
      scope: data.scope,
      publishedOn: moment(new Date(data.publishedOn.seconds), true).format(
        "DD/MM/YYYY"
      ),
      expiresBy: moment(new Date(data.expiresBy.seconds), true).format(
        "DD/MM/YYYY"
      ),
    };
  }

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.description}</div>
      <div>{post.publishedOn}</div>
      <div>{post.scope}</div>
    </div>
  );
}

export default ViewPost;
