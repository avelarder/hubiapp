import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Firebase from "../../../../firebase";
import useFirestoreQuery from "../../../../hooks/useFirestoreQuery";
import Layout from "../../../../components/layout";
import MainSection from "../../../../components/dashboard/mainSection";
import DeleteModal from "../../../../components/common/delete-modal";
import EditPost from "../../../../components/post/edit-post";
import Loader from "../../../../components/common/loader";

function EditPostPage() {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const router = useRouter();
    const { query } = router;

    const id = query.id;

    const db = Firebase.default.firestore();

    const { data, status, error } = useFirestoreQuery(
        db.collection("CommunityNews").doc(id)
    );

    if (status === "loading") {
        return <Loader></Loader>;
    }
    if (status === "error") {
        return `Error: ${error.message}`;
    }
    if (data === null) {
        return <Loader></Loader>;
    }
    const handleSave = async (post) => {
        await db.collection('CommunityNews').doc(id).update(post);
        router.push('/app/comunidad');
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

                        <EditPost post={data}
                            onCancel={handleBack}
                            onDelete={handleDelete}
                            onSave={handleSave}>
                        </EditPost>
                    </div>
                    {showDeleteModal && (<DeleteModal onCancel={() => setShowDeleteModal(false)} onConfirm={handleDeleteConfirmation}></DeleteModal>)}

                </MainSection>
            </div>
        </Layout>
    );
}

export default EditPostPage;
