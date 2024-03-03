import { userRole } from "./constant";
import MainLayout from "./layout/mainLayout/MainLayout";
import Protected from "./layout/mainLayout/Protected";

function App() {
  return (
    <Protected roles={[userRole.superAdmin, userRole.manager, userRole.seller]}>
      <MainLayout />
    </Protected>
  );
}

export default App;
