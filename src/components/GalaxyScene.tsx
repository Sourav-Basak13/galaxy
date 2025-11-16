import React, { useRef, useState } from "react";
import {
  Euler,
  EventHandlers,
  InstanceProps,
  MathProps,
  ReactProps,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import { TextureLoader, MathUtils, BackSide } from "three";
import type { Group, Object3DEventMap } from "three";
import { OrbitControls } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Overwrite } from "@react-three/drei/helpers/ts-utils";
import { EulerOrder } from "three";

const planets = [
  { name: "Venus", size: 6, dist: 30, map: "/textures/planets/venus.jpg" },
  { name: "Earth", size: 6.5, dist: 35, map: "/textures/planets/earth.jpg" },
  { name: "Mars", size: 5.5, dist: 40, map: "/textures/planets/mars.jpg" },
  { name: "Jupiter", size: 12, dist: 48, map: "/textures/planets/jupiter.jpg" },
  { name: "Saturn", size: 11, dist: 56, map: "/textures/planets/saturn.jpg" },
  { name: "Uranus", size: 9, dist: 64, map: "/textures/planets/uranus.jpg" },
  { name: "Neptune", size: 9, dist: 72, map: "/textures/planets/neptune.jpg" },
];

type TGroupRef = Overwrite<
  Partial<
    Overwrite<
      Group<Object3DEventMap>,
      MathProps<Group<Object3DEventMap>> &
        ReactProps<Group<Object3DEventMap>> &
        Partial<EventHandlers>
    >
  >,
  Omit<InstanceProps<Group<Object3DEventMap>, typeof Group>, "object">
>;

type TRotation =
  | [x: number, y: number, z: number, order?: EulerOrder | undefined];

export default function GalaxyScene() {
  const groupRef = useRef<TGroupRef | null>(null);

  // Load planet textures
  const textures = useLoader(
    TextureLoader,
    planets.map((p) => p.map)
  );

  // Load galaxy background texture
  const galaxyTexture = useLoader(TextureLoader, "/textures/planets/space.png");

  // Drag rotation
  const [dragging, setDragging] = useState(false);
  const lastX = useRef<number | null>(null);
  const [rotationOffset, setRotationOffset] = useState(0);

  const radius = 30; // circle radius

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    setDragging(true);
    lastX.current = e.clientX;
  };

  const handlePointerUp = () => {
    setDragging(false);
    lastX.current = null;
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging || lastX.current === null) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;

    setRotationOffset((prev) => prev + dx * 0.005);
  };

  useFrame(() => {
    if (groupRef.current) {
      (groupRef.current.rotation as TRotation)[1] = MathUtils.lerp(
        (groupRef.current.rotation as TRotation)[1],
        rotationOffset,
        0.08
      );
    }
  });

  return (
    <>
      {/* 🌌 Galaxy Background */}
      <mesh scale={200}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={galaxyTexture} side={BackSide} />
      </mesh>

      <ambientLight intensity={1} />
      <directionalLight position={[20, 20, 20]} intensity={1.2} />

      {/* Camera Controls (optional) */}
      <OrbitControls enableZoom={true} maxDistance={150} minDistance={20} />

      {/* 🌍 Planet Carousel */}
      <group
        ref={groupRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        {planets.map((p, i) => {
          const angle = (i / planets.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <mesh key={i} position={[x, 0, z]}>
              <sphereGeometry args={[p.size, 32, 32]} />
              <meshStandardMaterial map={textures[i]} />
            </mesh>
          );
        })}
      </group>
    </>
  );
}
