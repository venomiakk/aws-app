const clientID = import.meta.env.VITE_CLIENT_ID;

function TestPage() {
    console.log(clientID)
  return (
    <>
      <h1>Logowanie</h1>
    </>
  );
}

export default TestPage;
