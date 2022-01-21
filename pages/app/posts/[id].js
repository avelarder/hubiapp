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
    <div className="flex bg-gray-300">
      <ArrowCircleLeftIcon className="flex  m-4 cursor-pointer w-10 h-10" onClick={handleBack}></ArrowCircleLeftIcon>
      <div className="flex align-middle justify-center w-full">
        <ViewPost post={post}
          onCancel={handleBack}
          onDelete={handleDelete}>
        </ViewPost>
      </div>
      {showDeleteModal && (<DeleteModal onCancel={() => setShowDeleteModal(false)} onConfirm={handleDeleteConfirmation}></DeleteModal>)}

    </div >
  );
}

export default ViewPostPage;
