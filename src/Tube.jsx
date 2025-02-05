import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function Tube({ setPenisPosition, setPenisRotation, state }) {
    const meshRef = useRef();
    const { camera } = useThree();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  
    const [points, setPoints] = useState([new THREE.Vector3(0, -5, 0)]);
    const targetPointRef = useRef(new THREE.Vector3());
  
    useEffect(() => {
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
  
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const newTarget = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, newTarget);
  
        targetPointRef.current.copy(newTarget);
      };
  
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [camera]);
  
    useFrame(() => {
      if (points.length > 0) {
        const lastPoint = points[points.length - 1];
        const firstPoint = points[0];
        const target = targetPointRef.current.clone();
        console.log(state)
        var mod = state*10 ?? 1;
        const newPoint = lastPoint.clone().lerp(target, 0.001*mod);
  
        const resamplePoints = (points, numPoints) => {
          if (points.length < 3) return points;
  
          let filteredPoints = [...points];
          if (filteredPoints.length > numPoints) {
            filteredPoints.shift();
          }
  
          const newPoints = [];
          const curve = new THREE.CatmullRomCurve3(filteredPoints, false, "centripetal", 0.9);
          for (let i = 0; i < numPoints; i++) {
            const t = 1 - Math.pow(1 - (i / (numPoints - 1)), 1.1);
            const point = curve.getPointAt(t);
            newPoints.push(point);
          }
  
          return newPoints;
        };
  
        setPoints((prev) => {
          const newPrev = [...prev];
          if (newPrev.length > 2) {
            for (let i = 1; i < newPrev.length - 1; i++) {
              const straightened = new THREE.Vector3().lerpVectors(newPrev[i - 1], newPrev[i + 1], 0.01);
              newPrev[i].lerp(straightened, 0.075);
            }
          }

          var blehd = [...resamplePoints(newPrev, 64)];

          blehd.forEach((fa, i) => {
            var mod = (i/blehd.length-1);
            fa.z = newPoint.z+mod
          })
  
          return [firstPoint, ...blehd, newPoint];
        });
  
        // Move Penis to the last point
        setPenisPosition([newPoint.x, newPoint.y, newPoint.z]);
  
        // Calculate Rotation for Penis (Corrected)
        if (points.length > 1) {
            const prevPoint = points[points.length - 2];
            const direction = new THREE.Vector3().subVectors(newPoint, prevPoint).normalize();
        
            // Create Quaternion to rotate Penis correctly
            const quaternion = new THREE.Quaternion();
            const up = new THREE.Vector3(0, 1, 0); // Default "up" direction
            quaternion.setFromUnitVectors(up, direction); // Aligns up vector to movement direction
        
            // Convert Quaternion to Euler angles
            const eulerRotation = new THREE.Euler().setFromQuaternion(quaternion);
        
            // Update Penis rotation
            setPenisRotation([eulerRotation.x, eulerRotation.y, eulerRotation.z]);
        }
      }
    });
  
    useFrame(() => {
      if (meshRef.current && points.length > 1) {
        meshRef.current.geometry.dispose();
        meshRef.current.geometry = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(points, false, "centripetal", 1),
          400,
          0.125,
          8,
          false
        );
      }
    });
  
    return (
      <mesh ref={meshRef}>
        <meshToonMaterial color="#ddba9b" gradientMap={null} />
      </mesh>
    );
  }
  