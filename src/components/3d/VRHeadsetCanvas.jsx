'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

/**
 * 3D Lowpoly VR Glasses Canvas Component
 * Model: "Lowpoly VR glasses" (https://sketchfab.com/3d-models/lowpoly-vr-glasses-c37e201c0f4a49deb2415b4949e011e7)
 * Author: taigo (https://sketchfab.com/taigo)
 * License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
 */

const MODEL_PATH = '/models/lowpoly_vr_glasses/scene.gltf'
const BASE_SCALE = 2.2

function HeadsetMesh() {
  const { scene } = useGLTF(MODEL_PATH)

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.side = THREE.DoubleSide
          child.material.roughness = Math.min(child.material.roughness, 0.45)
          child.material.needsUpdate = true
        }
      }
    })
  }, [scene])

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
}

function VRHeadsetModel({ progress }) {
  const groupRef = useRef(null)

  useFrame(() => {
    if (!groupRef.current) return
    const raw = typeof progress === 'number' ? progress : (progress?.get ? progress.get() : 0)
    const n = Math.max(0, Math.min(1, raw))

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    // 3 well-proportioned phases across n in [0, 1]:
    // Phase 1 (0 to 0.28): Emergence & elevation into view
    const p1 = Math.min(Math.max(n / 0.28, 0), 1)
    // Phase 2 (0.22 to 0.72): Rich 3D inspection rotation
    const p2 = Math.min(Math.max((n - 0.22) / 0.50, 0), 1)
    // Phase 3 (0.70 to 1.0): Glide forward toward visor (putting on glasses)
    const p3 = Math.min(Math.max((n - 0.70) / 0.30, 0), 1)

    // Scale calculation
    const scale = BASE_SCALE * (0.8 + 0.35 * easeOutCubic(p1) + 2.0 * easeOutCubic(p3))
    groupRef.current.scale.setScalar(scale)

    // Smooth rotation around Y axis centered on the model
    // Starts at a three-quarters perspective angle and gracefully revolves
    const startAngle = 0.5
    const endAngle = Math.PI
    groupRef.current.rotation.y = startAngle + (endAngle - startAngle) * easeInOutQuad(p2)
    groupRef.current.rotation.x = 0.08 * (1 - easeInOutQuad(p2)) + 0.03 * easeOutCubic(p3)

    // Vertical elevation: rises from below into screen center, stays centered, then gentle eye alignment
    groupRef.current.position.y = -0.55 * (1 - easeOutCubic(p1)) + 0.12 * easeOutCubic(p3)
    groupRef.current.position.z = easeOutCubic(p3) * 1.5
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <HeadsetMesh />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)

export default function VRHeadsetCanvas({ progress = 0 }) {
  return (
    <div className="relative w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 34 }}
        dpr={[1, 2]}
        frameloop="always"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.8} color="#ffffff" />
          <directionalLight position={[4, 5, 5]} intensity={2.4} color="#ffffff" castShadow />
          <directionalLight position={[-4, 2, -2]} intensity={1.0} color="#0066ff" />
          <directionalLight position={[0, -3, 3]} intensity={0.7} color="#ffffff" />
          <VRHeadsetModel progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
