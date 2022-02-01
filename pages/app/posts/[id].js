import React, { useState } from "react";
import { useRouter } from "next/router";
import Firebase from "../../../firebase";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import DeleteModal from "../../../components/common/delete-modal";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import ViewPost from "../../../components/post/view-post";

function ViewPostPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      postType: data.postType,
      answerType: data.answerType,
      options: data.options,
      publishedOn: data.publishedOn,
      expiresBy: data.expiresBy
    };
  }

  const handleBack = () => { router.back() }
  const handleDelete = () => {
    setShowDeleteModal(true);
  }
  const handleDeleteConfirmation = async () => {
    await db.collection('CommunityNews').doc(id).delete();
    setShowDeleteModal(false);
    router.push('/app/comunidad');
  }
  return (
    <div className="bg-gray-200 flex flex-col h-screen">
      <ArrowCircleLeftIcon className="absolute text-purple-600 z-10 ml-2 mt-2 cursor-pointer w-7 h-7" onClick={handleBack}></ArrowCircleLeftIcon>
      <div className="flex-1 mt-4 mb-4 w-11/12  mx-4 p-4 text-lg h-full shadow-lg drop-shadow-lg bg-gray-100 rounded-md">
        <ViewPost post={post}
          onCancel={handleBack}
          onDelete={handleDelete}>
        </ViewPost>
      </div>
    </div>

  );
}

export default ViewPostPage;
