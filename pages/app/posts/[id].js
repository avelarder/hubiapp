import React, { useState } from "react";
import { useRouter } from "next/router";
import Firebase from "../../../firebase";
import useFirestoreQuery from "../../../hooks/useFirestoreQuery";
import ViewPost from "../../../components/post/view-post";
import Layout from "../../../components/layout";
import MainSection from "../../../components/dashboard/mainSection";
import DeleteModal from "../../../components/common/delete-modal";


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
      allowAddOption: data.allowAddOption,
      options: data.options,
      schedule: data.schedule,
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
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        <MainSection>
          <div className="flex flex-col h-screen w-2/4">

            <ViewPost post={post}
              onCancel={handleBack}
              onDelete={handleDelete}>
            </ViewPost>
          </div>
          {showDeleteModal && (<DeleteModal onCancel={() => setShowDeleteModal(false)} onConfirm={handleDeleteConfirmation}></DeleteModal>)}

        </MainSection>
      </div>
    </Layout>
  );
}

export default ViewPostPage;
