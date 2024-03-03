import MainLayout from "./layout/mainLayout/MainLayout";
import Protected from "./layout/mainLayout/Protected";

function App() {
  return (
    <Protected>
      <MainLayout />
    </Protected>
  );
}

export default App;
