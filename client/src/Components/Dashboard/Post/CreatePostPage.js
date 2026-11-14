import { useRequireLogin } from "../../../hooks/useRequireLogin";
import DashboardNavBar from "../DashboardNavBar";
import CreatePostForm from "./CreatePostForm";
export default function CreatePostPage() {
  const isLoggedIn = useRequireLogin();
  return (
    <div>
      {isLoggedIn && (
        <div className="dashboard">
          <DashboardNavBar />
          <CreatePostForm />
        </div>
      )}
    </div>
  );
}
