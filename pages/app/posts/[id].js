import React from "react";
import { useRouter } from "next/router";
import Firebase from "../../../firebase";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import moment from "moment";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import ViewPost from "../../../components/post/view-post";

function ViewPostPage() {

  const router = useRouter();
  const { query } = router;

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

  const handleBack = () => { router.back() }

  return (
    <div className="flex bg-gray-300">
      <ArrowCircleLeftIcon className="flex  m-4 cursor-pointer w-10 h-10" onClick={handleBack}></ArrowCircleLeftIcon>
      <div className="flex align-middle justify-center w-full">
        <ViewPost id={post.id} title={post.title} description={post.description} scope={post.scope} publishedOn={post.publishedOn} expiresBy={post.expiresBy}
          onCancel={handleBack}>
        </ViewPost>
      </div>

    </div >
  );
}

export default ViewPostPage;
