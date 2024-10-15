import Hello from "./Hello";
import Wrapper from "./Wrapper";

function App() {
  const name = "react";
  const style = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: 24,
    padding: "1rem",
  };
  return (
    <Wrapper>
      <Hello name="react" color="red"/>
      <div style={style}>{name}asdf</div>
    </Wrapper>
  );
}
export default App;
