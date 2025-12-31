import ProtectedRoute from "../../../components/ProtectedRoute";
import UsersTable from "../../../components/UsersTable";

export default function UsersPage() {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <UsersTable />
    </ProtectedRoute>
  );
}
