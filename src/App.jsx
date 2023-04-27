import MainHeader from "./components/MainHeader";

function App() {
  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        <h1>Hello, there!</h1>
      </main>
    </>
  );
}

export default App;
