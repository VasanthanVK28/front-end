import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Box() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function ThreeDAnimation() {
  return (
    <div style={{ width: "100%", height: "300px", background: "black" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
    </div>
  );
}
