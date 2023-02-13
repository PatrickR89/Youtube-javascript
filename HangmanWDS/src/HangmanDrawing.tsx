const head = (
  <div
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "100%",
      border: "10px solid black",
      position: "absolute",
      top: "50px",
      right: "-30px"
    }}
  />
);

const body = (
  <div
    style={{
      width: "10px",
      height: "100px",
      background: "black",
      position: "absolute",
      top: "120px",
      right: 0
    }}
  />
);
const rightArm = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "150px",
      right: "-100px",
      rotate: "-30deg",
      transformOrigin: "left bottom"
    }}
  />
);
const leftArm = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "150px",
      right: "10px",
      rotate: "30deg",
      transformOrigin: "right bottom"
    }}
  />
);
const rightLeg = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "290px",
      right: "-50px",
      rotate: "-60deg",
      transformOrigin: "left bottom"
    }}
  />
);
const leftLeg = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "290px",
      right: "-40px",
      rotate: "60deg",
      transformOrigin: "right bottom"
    }}
  />
);

export function HangmanDrawing() {
  return (
    <div style={{ position: "relative" }}>
      {head}
      {body}
      {leftArm}
      {rightArm}
      {leftLeg}
      {rightLeg}
      <div
        style={{
          height: "50px",
          width: "10px",
          background: "black",
          top: 0,
          right: 0,
          position: "absolute"
        }}
      />
      <div
        style={{
          height: "10px",
          width: "200px",
          background: "black",
          marginLeft: "120px"
        }}
      />
      <div
        style={{
          height: "400px",
          width: "10px",
          background: "black",
          marginLeft: "120px"
        }}
      />
      <div
        style={{
          height: "10px",
          width: "250px",
          background: "black"
        }}
      />
    </div>
  );
}
